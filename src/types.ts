import type { Post, User } from "@prisma/client";
import { z } from "zod";

export type IPost = Post & {
  author: User;
}

export const formSchema = z
  .object({
    postContent: z
      .string()
      .min(1, { message: "Post content is required" })
      .max(75, { message: "Post content must be less than 75 characters" }),
  })
  .required();

export type FormData = z.infer<typeof formSchema>;
