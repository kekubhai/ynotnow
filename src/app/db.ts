'use server'
import { drizzle, NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/lib/db/schema";

import { stackServerApp } from "@/stack";

export async function fetchWithDrizzle<T>(
  callback: (
    db: NeonHttpDatabase<typeof schema>,
    { userId, authToken }: { userId: string; authToken: string },
  ) => Promise<T>
) {
  const user = await stackServerApp.getUser();
  const authToken = (await user?.getAuthJson())?.accessToken;
  
  if (!authToken || !user?.id) {
    throw new Error("User not authenticated.");
  }

  const db = drizzle(
    neon(process.env.DATABASE_URL_PRODURL!, {
      authToken: async () => authToken,
      connectionOptions: {
        // Add JWKS URL configuration
        jwksUrl: process.env.DATABASE_JWKS_URL
      }
    }),
    { schema }
  );

  return callback(db, { userId: user.id, authToken });
}
