import React from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

import { api } from "~/utils/api";

import { type FormData, formSchema } from "~/types";

export const CreatePost: React.FC = ({}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postContent: "",
    },
  });

  const utils = api.useContext();
  const { mutate: createPost } = api.post.createPost.useMutation({
    onSettled: async () => {
      await utils.post.invalidate()
      reset();
    }
  })

  const onSubmit = (data: FormData) => {
    createPost({ content: data.postContent })
  };

  return (
    <div className="mx-auto max-w-xl space-y-8">
      {/* eslint-disable-next-line */}
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <Label htmlFor="name">post content</Label>
          <Textarea id="name" placeholder="hello" {...register("postContent")} />
          <p className="text-red-500 text-sm">{errors?.postContent?.message}</p>

          <div className="pt-2">
            <Button type="submit" disabled={isSubmitting}>
              create post
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
