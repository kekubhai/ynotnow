// app/ideas/page.tsx
'use client';

import { IdeasList } from '@/components/ideas-list';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { PlusCircle } from "lucide-react";

// Placeholder data for ideas (in a real app, this would come from the API)
const MOCK_IDEAS = [
  {
    id: "1",
    title: "AI-Powered Content Generator for Small Businesses",
    description: "A tool that helps small businesses generate high-quality marketing content using AI. The platform would understand the business's brand voice and target audience to create engaging blog posts, social media content, and email campaigns.",
    tags: ["AI", "SaaS", "Marketing"],
    user: {
      name: "Jane Smith",
      image: null
    },
    upvotes: 42,
    comments: Array(5).fill({ id: "comment-1" }),
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "2",
    title: "Sustainable Fashion Rental Marketplace",
    description: "A peer-to-peer platform where people can rent out their high-quality clothing items to others nearby. This reduces waste in the fashion industry and allows people to monetize their underused clothing items.",
    tags: ["Fashion", "Sustainability", "Marketplace"],
    user: {
      name: "Alex Johnson",
      image: null
    },
    upvotes: 36,
    comments: Array(3).fill({ id: "comment-2" }),
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "3",
    title: "Virtual Reality Physical Therapy Platform",
    description: "A VR platform that makes physical therapy more engaging and effective. Patients can complete their exercises in interactive virtual environments, and therapists can track progress remotely.",
    tags: ["Healthcare", "VR", "Fitness"],
    user: {
      name: "Michael Chen",
      image: null
    },
    upvotes: 28,
    comments: Array(7).fill({ id: "comment-3" }),
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString()
  }
];

export default function IdeasPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Trending Ideas</h1>
        <Link href="/ideas/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <PlusCircle className="h-4 w-4 mr-2" />
            Share Idea
          </Button>
        </Link>
      </div>

      <div className="mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <Button variant="outline" className="whitespace-nowrap">All Ideas</Button>
          <Button variant="outline" className="whitespace-nowrap">Top Rated</Button>
          <Button variant="outline" className="whitespace-nowrap">Most Recent</Button>
          <Button variant="outline" className="whitespace-nowrap">Tech</Button>
          <Button variant="outline" className="whitespace-nowrap">E-commerce</Button>
          <Button variant="outline" className="whitespace-nowrap">Healthcare</Button>
          <Button variant="outline" className="whitespace-nowrap">Finance</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_IDEAS.map(idea => (
          <IdeaCard key={idea.id} idea={idea} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button variant="outline">Load More Ideas</Button>
      </div>
    </div>
  );
}
