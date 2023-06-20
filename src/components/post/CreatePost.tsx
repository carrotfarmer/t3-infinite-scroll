import React from "react";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

const formSchema = z
  .object({
    postContent: z
      .string()
      .min(1, { message: "Post content is required" })
      .max(75, { message: "Post content must be less than 75 characters" }),
  })
  .required();

type FormData = z.infer<typeof formSchema>;

// eslint-disable-next-line
interface CreatePostProps {}

export const CreatePost: React.FC<CreatePostProps> = ({}) => {
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

  const onSubmit = (data: FormData) => {
    console.log(data.postContent);
    reset();
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
