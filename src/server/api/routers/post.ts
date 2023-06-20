import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  createPost: protectedProcedure
    .input(
      z.object({
        content: z.string().min(1).max(255),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.post.create({
        data: {
          content: input.content,
          authorId: ctx.session.user.id,
        },

        include: {
          author: true,
        },
      });
    }),

  getInfinitePosts: publicProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        cursor: z
          .object({
            id: z.string(),
            createdAt: z.date(),
          })
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const posts = await ctx.prisma.post.findMany({
        cursor: input.cursor ? { createdAt_id: input.cursor } : undefined,
        take: input.limit + 1,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          author: true,
        },
      });

      let nextCursor: typeof input.cursor | undefined = undefined;
      if (posts.length > input.limit) {
        const lastPost = posts.pop();

        if (lastPost) {
          nextCursor = {
            id: lastPost.id,
            createdAt: lastPost.createdAt,
          };
        }
      }

      return {
        posts,
        nextCursor,
      };
    }),
});
