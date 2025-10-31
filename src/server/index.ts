import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";

import type { AppRouter } from "./root";
import { appRouter, createCaller } from "./root";
import { createTRPCContext } from "./trpc";

/**
 * Inference helpers for input types
 * @example
 * type SearchInput = RouterInputs['search']['get']
 *      ^? { query: string }
 **/
type RouterInputs = inferRouterInputs<AppRouter>;

/**
 * Inference helpers for output types
 * @example
 * type SearchOutput = RouterOutputs['search']['get']
 *
 **/
type RouterOutputs = inferRouterOutputs<AppRouter>;

export { createTRPCContext, appRouter, createCaller };
export type { AppRouter, RouterInputs, RouterOutputs };
