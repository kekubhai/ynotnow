"use client";

import { useState } from "react";

type VoteButtonsProps = {
  ideaId: string;
  initialVotes: number;
};

export function VoteButtons({ ideaId, initialVotes }: VoteButtonsProps) {
  
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<number | null>(null);

  const handleVote = async (value: number) => {


    try {
      const response = await fetch(`/api/ideas/${ideaId}/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });

      if (response.ok) {
        const data = await response.json();
        setVotes(data.votes);
        setUserVote(data.userVote);
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => handleVote(1)}
        
        className={`p-2 rounded-full transition-colors ${
          userVote === 1
            ? "bg-green-500 text-white"
            : "hover:bg-green-100 dark:hover:bg-green-900"
        }`}
       
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <span className="my-1 font-medium">{votes}</span>

      <button
        onClick={() => handleVote(-1)}
       
        className={`p-2 rounded-full transition-colors ${
          userVote === -1
            ? "bg-red-500 text-white"
            : "hover:bg-red-100 dark:hover:bg-red-900"
        }`}
       
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
} 