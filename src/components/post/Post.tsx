import React from "react";
import type { IPost } from "~/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface PostProps {
  post: IPost;
}

export const Post: React.FC<PostProps> = ({ post }) => {
  return (
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
          <p className="text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>
      </CardHeader>
      <CardContent>{post.content}</CardContent>
    </Card>
  );
};
