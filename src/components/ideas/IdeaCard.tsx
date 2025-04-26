"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { VoteButtons } from "@/components/vote-buttons";
import { formatDistanceToNow } from "date-fns";

type IdeaCardProps = {
  idea: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    user: {
      name: string | null;
      image: string | null;
    };
    upvotes: number;
    comments?: { id: string }[];
    createdAt: string | Date;
  };
};

export function IdeaCard({ idea }: IdeaCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const commentCount = idea.comments?.length || 0;
  
  // Format createdAt date
  const formattedDate = typeof idea.createdAt === 'string' 
    ? formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true })
    : formatDistanceToNow(idea.createdAt, { addSuffix: true });

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-[1.02]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/ideas/${idea.id}`}>
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              {idea.user?.image ? (
                <Image
                  src={idea.user.image}
                  alt={idea.user.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">
                    {idea.user?.name?.[0] || "U"}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium">{idea.user?.name || "Anonymous"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formattedDate}
                </p>
              </div>
            </div>
            <VoteButtons ideaId={idea.id} initialVotes={idea.upvotes} />
          </div>

          <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {idea.description.replace(/<[^>]*>?/gm, '')}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {idea.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-4">
              <span>{idea.upvotes} votes</span>
              <span>{commentCount} comments</span>
            </div>
            {isHovered && (
              <span className="text-blue-500 hover:text-blue-600 transition-colors">
                Read more →
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}