import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import type { ITunesPodcastSearchResponse } from "@/types/itunes";

export const searchQueries = pgTable("search_queries", {
  id: uuid("id").defaultRandom().primaryKey(),
  query: text("query").notNull().unique(),
  results: jsonb("results").$type<ITunesPodcastSearchResponse>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
