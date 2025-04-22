"use client";

import { useState } from "react";
import Image from "next/image";
import { VoteButtons } from "./vote-buttons";
import { formatDistanceToNow } from "date-fns";
import { CommentSection } from "./comment-section";
import { AiAnalysisSection } from "./ai-analysis-section";

type IdeaDetailProps = {
  idea: {
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
      content: string;
      author: {
        name: string | null;
        image: string | null;
      };
      createdAt: Date;
    }[];
    aiAnalysis: {
      feasibility: string;
      monetization: string;
      marketGap: string;
      swot: string;
      elevatorPitch: string;
    } | null;
    createdAt: Date;
  };
};

export function IdeaDetail({ idea }: IdeaDetailProps) {
  const voteCount = idea.votes.reduce((sum, vote) => sum + vote.value, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              {idea.author.image ? (
                <Image
                  src={idea.author.image}
                  alt={idea.author.name || "User"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-500 dark:text-gray-400">
                    {idea.author.name?.[0] || "U"}
                  </span>
                </div>
              )}
              <div>
                <p className="font-medium">{idea.author.name || "Anonymous"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(idea.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <VoteButtons ideaId={idea.id} initialVotes={voteCount} />
          </div>

          <h1 className="text-3xl font-bold mb-4">{idea.title}</h1>

          <div className="prose dark:prose-invert max-w-none mb-6">
            <div dangerouslySetInnerHTML={{ __html: idea.description }} />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {idea.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {idea.aiAnalysis && (
          <AiAnalysisSection
            ideaId={idea.id}
            analysis={idea.aiAnalysis}
            title={idea.title}
            description={idea.description}
          />
        )}

        <CommentSection ideaId={idea.id} comments={idea.comments} />
      </div>
    </div>
  );
} 