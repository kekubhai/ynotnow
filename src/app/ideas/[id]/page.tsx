// app/ideas/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useStackApp } from '@stackframe/stack';
import Image from 'next/image';

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
  const { data: session } = useStackApp()
  const [ideas, setIdeas] = useState<Idea[]>([]);
  

  useEffect(() => {
    fetch('/api/ideas')
      .then(res => res.json())
      .then(setIdeas);
  }, []);

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2">
      {ideas.map((idea) => (
        <div key={idea.id} className="bg-white shadow-lg rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Image src={idea.user.image || '/default-avatar.png'} alt={idea.user.name} width={32} height={32} className="rounded-full" />
            <span className="text-sm font-medium">{idea.user.name}</span>
          </div>
          <h2 className="text-xl font-bold">{idea.title}</h2>
          <p className="text-sm text-gray-700 mt-2">{idea.description}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">{idea.upvotes} upvotes</span>
            {session ? (
              <button
                onClick={() => handleUpvote(idea.id)}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
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

  async function handleUpvote(ideaId: string) {
    const res = await fetch('/api/upvote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ideaId }),
    });

    if (res.ok) {
      setIdeas(prev =>
        prev.map(i =>
          i.id === ideaId ? { ...i, upvotes: i.upvotes + 1 } : i
        )
      );
    }
  }
}
