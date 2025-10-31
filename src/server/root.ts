import type { inferRouterOutputs } from "@trpc/server";
import { searchRouter } from "./router/search";
import { createCallerFactory, createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  search: searchRouter,
});
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.search.get({ query: "test" });
 *       ^? string
 */
export const createCaller = createCallerFactory(appRouter);

export type RouterOutput = inferRouterOutputs<AppRouter>;
