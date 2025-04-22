import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { IdeaDetail } from "@/components/idea-detail";

export default async function IdeaPage({
  params,
}: {
  params: { id: string };
}) {
  const idea = await prisma.idea.findUnique({
    where: { id: params.id },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      votes: {
        select: {
          value: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      aiAnalysis: true,
    },
  });

  if (!idea) {
    notFound();
  }

  return <IdeaDetail idea={idea} />;
} 