import React from "react";
import type { IPost } from "~/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { api } from "~/utils/api";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

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

  const { data: sessionData } = useSession();

  return (
    <div className="pt-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Avatar className="w-8 h-8">
                <AvatarImage src={post.author.image as string} />
                <AvatarFallback>CN</AvatarFallback>
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
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};
