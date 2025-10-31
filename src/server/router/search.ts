import type { TRPCRouterRecord } from "@trpc/server";
import { and, eq, gt } from "drizzle-orm";
import z from "zod";
import { db } from "@/db";
import { searchQueries } from "@/db/schema";
import { env } from "@/env";
import type { ITunesPodcastSearchResponse } from "@/types/itunes";
import { publicProcedure } from "../trpc";

const REVALIDATE_TIME_MS = 60 * 60 * 24 * 1000; // 24 hours in milliseconds

export const searchRouter = {
  get: publicProcedure
    .input(z.object({ query: z.string().min(2).trim().catch("") }))
    .query(async ({ input }) => {
      const fallback = {
        resultCount: 0,
        results: [],
      } satisfies ITunesPodcastSearchResponse;

      if (!input.query) {
        return fallback;
      }

      try {
        const cutoffTime = new Date(Date.now() - REVALIDATE_TIME_MS);
        const existingSearchQuery = await db.query.searchQueries.findFirst({
          where: and(eq(searchQueries.query, input.query), gt(searchQueries.updatedAt, cutoffTime)),
        });

        if (existingSearchQuery) {
          return existingSearchQuery.results;
        }

        const response = await fetch(`${env.ITUNES_SEARCH_API}?media=podcast&term=${input.query}`);

        if (!response.ok) {
          console.error("Error in searchRouter.get::", response);
          return fallback;
        }

        const results = (await response.json()) as ITunesPodcastSearchResponse;

        await db
          .insert(searchQueries)
          .values({
            query: input.query,
            results,
          })
          .onConflictDoUpdate({
            target: searchQueries.query,
            set: {
              results,
            },
          });

        return results;
      } catch (error) {
        console.error("Error in searchRouter.get::", error);
        return fallback;
      }
    }),
} satisfies TRPCRouterRecord;
