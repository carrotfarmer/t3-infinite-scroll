import React from "react";

import { api } from "~/utils/api";
import { useSession } from "next-auth/react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Label } from "../ui/label"

import { Edit, Trash2 } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { type IPost, type FormData, formSchema } from "~/types";
import { Textarea } from "../ui/textarea";

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  const utils = api.useContext();
  const { mutate: deletePost } = api.post.deletePost.useMutation({
    onSettled: async () => {
      await utils.invalidate();
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postContent: post.content as string,
    },
  });

  const [open, setOpen] = React.useState(false);

  const { mutate: editPost } = api.post.editPost.useMutation({
    onSettled: async () => {
      await utils.invalidate();
      setOpen(false);
      reset();
    },
  });

  const { data: sessionData } = useSession();

  const onSubmit = (data: FormData) => {
    editPost({ postId: post.id, newContent: data.postContent });
  };

  return (
    <div className="pt-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Avatar className="w-8 h-8">
                <AvatarImage src={post.author.image as string} />
                <AvatarFallback>WUT</AvatarFallback>
              </Avatar>
              <p className="text-sm font-semibold">{post.author.name}</p>
            </div>
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>{post.content}</CardContent>
        {post.authorId === sessionData?.user?.id && (
          <CardFooter>
            <div className="flex items-center space-x-2">
              <Button
                variant="destructiveOutline"
                size="sm"
                onClick={() => {
                  deletePost({ postId: post.id });
                }}
              >
                <Trash2 size={16} />
              </Button>

              <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger>
                  <Button variant="primaryOutline" size="sm">
                    <Edit size={16} />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  {/* eslint-disable-next-line */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <AlertDialogHeader>edit post</AlertDialogHeader>

                    <AlertDialogDescription>
                      <div className="mx-auto max-w-xl space-y-8">
                        <div className="space-y-1">
                          <Label htmlFor="name">post content</Label>
                          <Textarea
                            id="name"
                            defaultValue={post.content as string}
                            {...register("postContent")}
                          />
                          <p className="text-red-500 text-sm">{errors?.postContent?.message}</p>
                        </div>
                      </div>
                    </AlertDialogDescription>

                    <AlertDialogFooter className="pt-2">
                      <AlertDialogCancel type="button">cancel</AlertDialogCancel>
                      <Button type="submit" disabled={isSubmitting}>edit</Button>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
