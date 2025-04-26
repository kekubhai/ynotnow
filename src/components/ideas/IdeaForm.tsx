"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

type IdeaFormProps = {
  onIdeaAdded?: (newIdea: any) => void;
  initialData?: {
    id?: string;
    title?: string;
    description?: string;
    problem?: string;
    solution?: string;
    targetMarket?: string;
    businessModel?: string;
    tags?: string[];
  };
  isEditing?: boolean;
};

export function IdeaForm({ 
  onIdeaAdded, 
  initialData = {}, 
  isEditing = false 
}: IdeaFormProps) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [problem, setProblem] = useState(initialData.problem || "");
  const [solution, setSolution] = useState(initialData.solution || "");
  const [targetMarket, setTargetMarket] = useState(initialData.targetMarket || "");
  const [businessModel, setBusinessModel] = useState(initialData.businessModel || "");
  const [tags, setTags] = useState<string[]>(initialData.tags || []);
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const ideaData = {
        title,
        description,
        problem: problem || description,
        solution: solution || "TBD",
        targetMarket: targetMarket || "General audience",
        businessModel: businessModel || "",
        tags,
        isPublic: true,
      };
      
      let response;
      
      if (isEditing && initialData.id) {
        response = await fetch(`/api/ideas/${initialData.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ideaData),
        });
      } else {
        response = await fetch("/api/ideas", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ideaData),
        });
      }

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || `Failed to ${isEditing ? 'update' : 'post'} idea`);
      }

      const newIdea = await response.json();

      // Reset form if not editing
      if (!isEditing) {
        setTitle("");
        setDescription("");
        setProblem("");
        setSolution("");
        setTargetMarket("");
        setBusinessModel("");
        setTags([]);
      }

      // Notify parent component
      if (onIdeaAdded) {
        onIdeaAdded(newIdea);
      }

      toast.success(`Your idea has been successfully ${isEditing ? 'updated' : 'posted'}!`);
    } catch (error) {
      console.error(`Error ${isEditing ? 'updating' : 'posting'} idea:`, error);
      toast.error(`Failed to ${isEditing ? 'update' : 'post'} your idea. Please try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">
          {isEditing ? 'Edit Your Idea' : 'Share Your Idea'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="A catchy title for your idea"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border rounded-md h-24"
              placeholder="Describe your idea in detail"
              required
            />
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            {showAdvanced ? "Hide" : "Show"} advanced fields
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={showAdvanced ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
              />
            </svg>
          </button>

          {showAdvanced && (
            <>
              <div>
                <label htmlFor="problem" className="block text-sm font-medium mb-1">
                  Problem Statement
                </label>
                <textarea
                  id="problem"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="What problem does your idea solve?"
                />
              </div>

              <div>
                <label htmlFor="solution" className="block text-sm font-medium mb-1">
                  Solution
                </label>
                <textarea
                  id="solution"
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="How does your idea solve the problem?"
                />
              </div>

              <div>
                <label htmlFor="targetMarket" className="block text-sm font-medium mb-1">
                  Target Market
                </label>
                <input
                  type="text"
                  id="targetMarket"
                  value={targetMarket}
                  onChange={(e) => setTargetMarket(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Who is this idea for?"
                />
              </div>

              <div>
                <label htmlFor="businessModel" className="block text-sm font-medium mb-1">
                  Business Model
                </label>
                <textarea
                  id="businessModel"
                  value={businessModel}
                  onChange={(e) => setBusinessModel(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="How would this idea make money?"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="tags" className="block text-sm font-medium mb-1">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInput}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Press Enter to add tags"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 text-blue-600 hover:text-blue-800"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            {isSubmitting ? "Submitting..." : isEditing ? "Update Idea" : "Post Idea"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}