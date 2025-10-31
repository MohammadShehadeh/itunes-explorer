import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string(),
    ITUNES_SEARCH_API: z.string(),
  },
  shared: {
    NODE_ENV: z.enum(["development", "production"]),
    NEXT_PUBLIC_VERCEL_URL: z.string(),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_VERCEL_URL: process.env.NEXT_PUBLIC_VERCEL_URL,
  },
});
