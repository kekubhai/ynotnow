import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: ['./src/lib/db/schema.ts', './src/app/schema.ts'], // ✅ Fixed here
   // Changed from 'pg' to 'pglite' to match the expected type
 
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL_DEVURL!,
  },
});
