import type { Post, User } from "@prisma/client";

export type IPost = Post & {
  author: User;
}
