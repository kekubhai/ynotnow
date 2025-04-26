"use client";

import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";

type CommentProps = {
  comment: {
    id: string;
    content: string;
    author: {
      name: string | null;
      image: string | null;
    };
    createdAt: string | Date;
  };
  onDelete?: (commentId: string) => void;
  isAuthor?: boolean;
};

export function Comment({ comment, onDelete, isAuthor = false }: CommentProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  
  // Format createdAt date
  const formattedDate = typeof comment.createdAt === 'string' 
    ? formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })
    : formatDistanceToNow(comment.createdAt, { addSuffix: true });

  const handleDelete = async () => {
    if (!onDelete) return;
    
    setIsDeleting(true);
    try {
      await onDelete(comment.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border-b pb-6 last:border-b-0">
      <div className="flex items-start space-x-3">
        {comment.author.image ? (
          <Image
            src={comment.author.image}
            alt={comment.author.name || "User"}
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <span className="text-gray-500 dark:text-gray-400">
              {comment.author.name?.[0] || "U"}
            </span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">{comment.author.name || "Anonymous"}</p>
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formattedDate}
              </p>
              {isAuthor && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-red-500 hover:text-red-700 text-sm"
                  title="Delete comment"
                >
                  {isDeleting ? "..." : "×"}
                </button>
              )}
            </div>
          </div>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            {comment.content}
          </p>
        </div>
      </div>
    </div>
  );
}