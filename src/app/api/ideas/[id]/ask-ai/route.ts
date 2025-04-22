import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { generateFollowUpResponse } from "@/lib/gemini";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { question } = await request.json();
    const ideaId = params.id;

    // Get the idea
    const idea = await prisma.idea.findUnique({
      where: { id: ideaId },
      select: {
        title: true,
        description: true,
      },
    });

    if (!idea) {
      return NextResponse.json(
        { error: "Idea not found" },
        { status: 404 }
      );
    }

    // Generate AI response
    const response = await generateFollowUpResponse(idea, question);

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error generating AI response:", error);
    return NextResponse.json(
      { error: "Failed to generate AI response" },
      { status: 500 }
    );
  }
} 