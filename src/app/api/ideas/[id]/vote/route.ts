import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { ideas, upvotes } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { useUser } from "@stackframe/stack";

export default function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user=useUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const ideaId = params.id;
    const userId = user.id;
    
    // Check if the user already voted for this idea
    const existingVote =   db.query.upvotes.findFirst({
      where: and(
        eq(upvotes.userId, userId),
        eq(upvotes.ideaId, ideaId)
      ),
    });

    if (existingVote) {
      return NextResponse.json(
        { error: "You have already voted for this idea" },
        { status: 400 }
      );
    }
    
    // Begin a transaction to ensure data consistency
     db.transaction(async (tx) => {
      // Add entry to upvotes table
      await tx.insert(upvotes).values({
        userId,
        ideaId,
      });
      
      // Get current idea
      const idea =  tx.query.ideas.findFirst({
        where: eq(ideas.id, ideaId),
      });

      if (!idea) {
        throw new Error("Idea not found");
      }
      
      // Increment upvotes count
      await tx.update(ideas)
        .set({ 
          upvotes: (idea.upvotes || 0) + 1 
        })
        .where(eq(ideas.id, ideaId));
    });

    // Revalidate the ideas pages
    revalidatePath('/ideas');
    revalidatePath(`/ideas/${ideaId}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error upvoting idea:", error);
    return NextResponse.json(
      { error: "Failed to upvote idea" },
      { status: 500 }
    );
  }
}