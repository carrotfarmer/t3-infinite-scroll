import React from "react";
import type { IPost } from "~/types";
import { Card, CardContent, CardFooter } from "../ui/card";

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <Card>
      <CardContent>{post.content}</CardContent>

      <CardFooter>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <div className="w-4 h-4 rounded-full bg-gray-500">
              <img src={post.author.image as string} alt="" />
            </div>
            <p className="text-sm font-semibold">{post.author.name}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
