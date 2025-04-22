"use client";

import { useEffect, useState } from "react";
import { IdeaCard } from "./idea-card";
import { prisma } from "@/lib/prisma";

type Idea = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: {
    name: string | null;
    image: string | null;
  };
  votes: {
    value: number;
  }[];
  comments: {
    id: string;
  }[];
  createdAt: Date;
};

export function IdeaFeed() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"newest" | "trending">("newest");

  useEffect(() => {
    async function fetchIdeas() {
      try {
        const response = await fetch(`/api/ideas?sort=${sortBy}`);
        const data = await response.json();
        setIdeas(data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchIdeas();
  }, [sortBy]);

  if (loading) {
    return <div className="text-center py-8">Loading ideas...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Startup Ideas</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setSortBy("newest")}
            className={`px-4 py-2 rounded-lg ${
              sortBy === "newest"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSortBy("trending")}
            className={`px-4 py-2 rounded-lg ${
              sortBy === "trending"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
          >
            Trending
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      {ideas.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No ideas yet. Be the first to share your startup idea!
        </div>
      )}
    </div>
  );
} 