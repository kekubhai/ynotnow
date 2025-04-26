'use server';
import { neon } from '@neondatabase/serverless';
import { stackServerApp } from "@/stack";
import { NextResponse } from 'next/server';

// API routes should export HTTP method handlers, not React components
export async function GET() {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const authToken = (await user?.getAuthJson())?.accessToken; 
    if (!authToken) {
      return NextResponse.json({ error: "No auth token" }, { status: 401 });
    }

    const neonClient = neon(process.env.DATABASE_URL_DEVURL!, {
      authToken: async () => authToken,
    });

    // WHERE filter is optional because of RLS.
    // But we send it anyway for performance reasons.
    const todoItems = await
      neonClient('select * from todos where user_id = auth.user_id()'); 

    return NextResponse.json(todoItems);
  } catch (error) {
    console.error("Failed to fetch todos:", error);
    return NextResponse.json({ error: "Failed to fetch todos" }, { status: 500 });
  }
}