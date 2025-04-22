import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
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
    const { value } = await request.json();
    const ideaId = params.id;

    // Check if user has already voted
    const existingVote = await prisma.vote.findUnique({
      where: {
        userId_ideaId: {
          userId: session.user.id,
          ideaId,
        },
      },
    });

    if (existingVote) {
      // Update existing vote
      await prisma.vote.update({
        where: {
          userId_ideaId: {
            userId: session.user.id,
            ideaId,
          },
        },
        data: {
          value,
        },
      });
    } else {
      // Create new vote
      await prisma.vote.create({
        data: {
          userId: session.user.id,
          ideaId,
          value,
        },
      });
    }

    // Get updated vote count
    const votes = await prisma.vote.aggregate({
      where: { ideaId },
      _sum: { value: true },
    });

    // Get user's current vote
    const userVote = await prisma.vote.findUnique({
      where: {
        userId_ideaId: {
          userId: session.user.id,
          ideaId,
        },
      },
      select: {
        value: true,
      },
    });

    return NextResponse.json({
      votes: votes._sum.value || 0,
      userVote: userVote?.value || null,
    });
  } catch (error) {
    console.error("Error voting:", error);
    return NextResponse.json(
      { error: "Failed to process vote" },
      { status: 500 }
    );
  }
} 