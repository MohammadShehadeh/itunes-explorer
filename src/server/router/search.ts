import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod";
import { publicProcedure } from "../trpc";

export const searchRouter = {
  get: publicProcedure
    .input(
      z.object({
        query: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return "test";
    }),
} satisfies TRPCRouterRecord;
