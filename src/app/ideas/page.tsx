// app/ideas/page.tsx
'use client';

import { IdeasList } from '@/components/ideas-list';
import { Button } from '@/components/ui/button';
import { Suspense } from 'react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function IdeasPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Startup Ideas</h1>
        <Link href="/ideas/ADD_idea">
          <Button className="bg-blue-500 hover:bg-blue-600">
            Share Your Idea
          </Button>
        </Link>
      </div>
      
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-6 w-full" />
              </div>
              <div className="p-4">
                <Skeleton className="h-20 w-full" />
              </div>
            </div>
          ))}
        </div>
      }>
        <IdeasList />
      </Suspense>
    </div>
  );
}
