// app/ideas/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useUser, } from '@stackframe/stack';

type Idea = {
  id: string;
  title: string;
  description: string;
  upvotes: number;
  user: {
    name: string;
    image: string;
  };
};

export default function IdeasPage() {
  
  const user = useUser();
  const isAuthenticated = !!user;
  const [ideas, setIdeas] = useState<Idea[]>([]);

  useEffect(() => {
    fetch('/api/ideas')
      .then((res) => res.json())
      .then(setIdeas);
  }, []);

  async function handleUpvote(ideaId: string) {
    if (!isAuthenticated) return;

    const res = await fetch('/api/ideas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ideaId, userId: user?.id }),
    });

    if (res.ok) {
      setIdeas((prev) =>
        prev.map((i) => (i.id === ideaId ? { ...i, upvotes: i.upvotes + 1 } : i))
      );
    }
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <h2>hello</h2>
      {ideas.map((idea) => (
        <div key={idea.id} className="bg-white shadow-md rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
          
            <span className="text-sm font-medium">{idea.user.name}</span>
          </div>
          <h2 className="text-lg font-bold">{idea.title}</h2>
          <p className="text-sm mt-2 text-gray-700">{idea.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-xs text-gray-500">{idea.upvotes} upvotes</span>
            {isAuthenticated ? (
              <button
                onClick={() => handleUpvote(idea.id)}
                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Like
              </button>
            ) : (
              <span className="text-xs text-gray-400">Login to like</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
