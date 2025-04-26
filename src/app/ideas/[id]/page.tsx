'use client';

import { CommentList } from "@/components/ideas/CommentList";
import { VoteButtons } from "@/components/vote-buttons";
import { Button } from "@/components/ui/button";
import { Edit, Share2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@stackframe/stack";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";

// This would be fetched from the API in a real app
const MOCK_IDEA = {
  id: "1",
  title: "AI-Powered Content Generator for Small Businesses",
  description: "A tool that helps small businesses generate high-quality marketing content using AI. The platform would understand the business's brand voice and target audience to create engaging blog posts, social media content, and email campaigns.",
  problem: "Small businesses struggle to consistently create high-quality content for marketing purposes due to limited time, resources, and sometimes writing skills.",
  solution: "An AI platform that learns a business's brand voice and generates custom marketing content, saving time and ensuring consistent quality.",
  targetMarket: "Small to medium-sized businesses across various industries that maintain regular content marketing efforts.",
  businessModel: "SaaS subscription model with tiered pricing based on content volume and features.",
  tags: ["AI", "SaaS", "Marketing"],
  user: {
    id: "user-1",
    name: "Jane Smith",
    image: null
  },
  upvotes: 42,
  createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
};

// Mock comments
const MOCK_COMMENTS = [
  {
    id: "comment-1",
    content: "This is a brilliant idea! Have you considered partnerships with existing marketing platforms?",
    author: {
      id: "user-2",
      name: "Alex Johnson",
      image: null,
    },
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: "comment-2",
    content: "I run a small business and would definitely pay for this. The main challenge I see is how to ensure the AI truly captures our brand voice.",
    author: {
      id: "user-3",
      name: "Michael Chen",
      image: null,
    },
    createdAt: new Date(Date.now() - 86400000 * 0.5).toISOString(),
  }
];

export default function IdeaDetailPage({ params }: { params: { id: string } }) {
  const [idea, setIdea] = useState<typeof MOCK_IDEA | null>(null);
  const [comments, setComments] = useState<typeof MOCK_COMMENTS>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  
  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setIdea(MOCK_IDEA);
      setComments(MOCK_COMMENTS);
      setIsLoading(false);
    }, 500);
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-8"></div>
          <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-4">Idea Not Found</h1>
        <p className="mb-8">The idea you're looking for doesn't exist or has been removed.</p>
        <Link href="/ideas">
          <Button>Browse Ideas</Button>
        </Link>
      </div>
    );
  }

  const isAuthor = user && user.id === idea.user.id;
  const formattedDate = formatDistanceToNow(new Date(idea.createdAt), { addSuffix: true });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/ideas" className="text-blue-600 hover:text-blue-800">
          ← Back to Ideas
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{idea.title}</h1>
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <span>Posted {formattedDate}</span>
                <span className="mx-2">•</span>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-xs mr-2">
                    {idea.user.name?.[0] || "U"}
                  </div>
                  <span>{idea.user.name}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthor && (
                <Link href={`/ideas/${idea.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
              )}
              <button
                className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                onClick={() => navigator.clipboard.writeText(window.location.href)}
              >
                <Share2 className="h-5 w-5" />
              </button>
              <VoteButtons ideaId={idea.id} initialVotes={idea.upvotes} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {idea.tags?.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose dark:prose-invert max-w-none mb-8">
            <h2>Description</h2>
            <p className="whitespace-pre-wrap">{idea.description}</p>
            
            <h2>Problem</h2>
            <p className="whitespace-pre-wrap">{idea.problem}</p>
            
            <h2>Solution</h2>
            <p className="whitespace-pre-wrap">{idea.solution}</p>
            
            <h2>Target Market</h2>
            <p className="whitespace-pre-wrap">{idea.targetMarket}</p>
            
            {idea.businessModel && (
              <>
                <h2>Business Model</h2>
                <p className="whitespace-pre-wrap">{idea.businessModel}</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <CommentList ideaId={idea.id} initialComments={comments} />
      </div>
    </div>
  );
}
