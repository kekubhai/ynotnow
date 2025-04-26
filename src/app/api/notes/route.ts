import { fetchWithDrizzle } from "@/app/db";
import { notes } from "@/lib/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allNotes = await fetchWithDrizzle(async (db, { userId }) => {
      // Using explicit user_id filter for performance, even though RLS handles this
      return db.select().from(notes).where(eq(notes.userId, userId));
    });

    return NextResponse.json(allNotes);
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const newNote = await fetchWithDrizzle(async (db, { userId }) => {
      // Include userId in the values being inserted
      return db
        .insert(notes)
        .values({
          title,
          content,
          userId // Use the userId from the authenticated user
        })
        .returning();
    });

    return NextResponse.json(newNote[0]);
  } catch (error) {
    console.error("Failed to create note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}