"use client";

import { useState } from "react";
import { useUser } from "@stackframe/stack";
import { Comment } from "./Comment";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type CommentListProps = {
  ideaId: string;
  initialComments: Array<{
    id: string;
    content: string;
    author: {
      id: string;
      name: string | null;
      image: string | null;
    };
    createdAt: string | Date;
  }>;
};

export function CommentList({ ideaId, initialComments = [] }: CommentListProps) {
  const user = useUser();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment, ideaId }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const newCommentData = await response.json();
      setComments([newCommentData, ...comments]);
      setNewComment("");
      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete comment");
      }

      setComments(comments.filter((comment) => comment.id !== commentId));
      toast.success("Comment deleted successfully");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 mb-2"
            rows={3}
          />
          <Button
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      ) : (
        <div className="mb-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Please sign in to leave a comment
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <Comment 
            key={comment.id} 
            comment={comment} 
            onDelete={handleDelete}
            isAuthor={user?.id === comment.author.id}
          />
        ))}

        {comments.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
}