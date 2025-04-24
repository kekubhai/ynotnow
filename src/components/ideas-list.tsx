"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@stackframe/stack';

type Idea = {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  tags?: string[];
  user: {
    id: string;
    name: string;
    image: string;
  };
  createdAt: string;
};

export function IdeasList() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useUser();

  useEffect(() => {
    async function fetchIdeas() {
      try {
        setLoading(true);
        const response = await fetch('/api/ideas');
        
        if (!response.ok) {
          throw new Error('Failed to fetch ideas');
        }

        const data = await response.json();
        setIdeas(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching ideas:', err);
        setError('Failed to load ideas. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchIdeas();
  }, []);

  async function handleUpvote(ideaId: string) {
    if (!user) {
      toast.error('Please log in to upvote ideas');
      return;
    }

    try {
      const res = await fetch(`/api/ideas/${ideaId}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        // Optimistically update the UI
        setIdeas((prev) =>
          prev.map((idea) =>
            idea.id === ideaId
              ? { ...idea, upvotes: idea.upvotes + 1 }
              : idea
          )
        );
        toast.success('Upvoted!');
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Failed to upvote');
      }
    } catch (error) {
      console.error('Error upvoting:', error);
      toast.error('Something went wrong');
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </CardContent>
            <CardFooter>
              <Skeleton className="h-8 w-12" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-6 text-center">
        <div className="text-red-500 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mx-auto mb-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"
            />
          </svg>
          <h3 className="text-lg font-semibold">Error Loading Ideas</h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </Card>
    );
  }

  if (ideas.length === 0) {
    return (
      <Card className="p-10 text-center">
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12 mx-auto mb-4 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
          <h2 className="text-2xl font-bold mb-2">No Ideas Found</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Be the first to share an innovative idea!
          </p>
        </div>
        <Link href="/ideas/new">
          <Button className="bg-blue-500 hover:bg-blue-600">
            Share Your Idea
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {ideas.map((idea) => (
        <Card key={idea.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                {idea.user?.image ? (
                  <div className="h-8 w-8 mr-2 relative overflow-hidden rounded-full">
                    <Image 
                      src={idea.user.image} 
                      alt={idea.user?.name || 'User'}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-2">
                    {idea.user?.name?.charAt(0) || 'U'}
                  </div>
                )}
                <span className="font-medium">{idea.user?.name || 'Anonymous'}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {idea.createdAt ? new Date(idea.createdAt).toLocaleDateString() : 'Recently'}
              </span>
            </div>
            <CardTitle className="line-clamp-1">{idea.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">
              {idea.description.replace(/<[^>]*>?/gm, '')}
            </p>
            {idea.tags && idea.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {idea.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
                {idea.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    +{idea.tags.length - 3} more
                  </span>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between items-center pt-1">
            <div className="flex items-center gap-1">
              <Button 
                onClick={() => handleUpvote(idea.id)} 
                variant="ghost" 
                size="sm"
                className="text-gray-600 hover:text-blue-600 dark:text-gray-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                {idea.upvotes}
              </Button>
            </div>
            <Link href={`/ideas/${idea.id}`} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
              Read more →
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}