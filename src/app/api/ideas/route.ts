import { db } from '@/lib/db';
import { ideas, users } from '@/lib/db/schema';
import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { stackServerApp } from '@/stack';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    // Query all public ideas ordered by creation date (newest first)
    const allIdeas = await db.query.ideas.findMany({
      where: eq(ideas.isPublic, true),
      orderBy: (ideas   , { desc }) => [desc(ideas.createdAt)],
      with: {
        user: {
          columns: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    });

    // If no ideas are found, return an empty array
    // The frontend will handle showing "No ideas found"
    return NextResponse.json(allIdeas);
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ideas' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const user = await stackServerApp.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const {
      title,
      description,
      problem,
      solution,
      targetMarket,
      businessModel,
      tags,
      isPublic = true,
    } = await req.json();

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const newIdea = await db
      .insert(ideas)
      .values({
        title,
        description,
        problem: problem || description,
        solution: solution || 'TBD',
        targetMarket: targetMarket || 'General audience',
        businessModel: businessModel || '',
        isPublic,
        status: 'published',
        upvotes: 0,
        userId: user.id, // Ensure this matches your schema
        tags: tags || [],
      })
      .returning();

    revalidatePath('/ideas');

    const ideaWithUser = {
      ...newIdea[0],
      user: {
        id: user.id,
        name: user.displayName || '',
        image: user.profileImageUrl || '',
      },
      tags: tags || [],
    };

    return NextResponse.json(ideaWithUser);
  } catch (error) {
    console.error('Error creating idea:', error);
    return NextResponse.json(
      { error: 'Failed to create idea' },
      { status: 500 }
    );
  }
}
