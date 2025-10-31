import { defineConfig } from 'drizzle-kit';
import { env } from '@/env';

export default defineConfig({
	dialect: 'postgresql',
	out: './db/migrations',
	schema: './db/schema.ts',
	strict: true,
	verbose: true,
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
