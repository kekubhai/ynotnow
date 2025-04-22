"use client";

import { useState } from "react";
import { generateFollowUpResponse } from "@/lib/gemini";

type AiAnalysisSectionProps = {
  ideaId: string;
  analysis: {
    feasibility: string;
    monetization: string;
    marketGap: string;
    swot: string;
    elevatorPitch: string;
  };
  title: string;
  description: string;
};

export function AiAnalysisSection({
  ideaId,
  analysis,
  title,
  description,
}: AiAnalysisSectionProps) {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAskAI = async () => {
    if (!question.trim()) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/ideas/${ideaId}/ask-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      if (res.ok) {
        const data = await res.json();
        setResponse(data.response);
      }
    } catch (error) {
      console.error("Error asking AI:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">AI Analysis</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Elevator Pitch</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {analysis.elevatorPitch}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Feasibility Report</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {analysis.feasibility}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Monetization Strategy</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {analysis.monetization}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Market Gap Analysis</h3>
          <p className="text-gray-600 dark:text-gray-300">
            {analysis.marketGap}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">SWOT Analysis</h3>
          <p className="text-gray-600 dark:text-gray-300">{analysis.swot}</p>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Ask AI a Follow-up Question</h3>
          <div className="space-y-4">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about this idea..."
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              rows={3}
            />
            <button
              onClick={handleAskAI}
              disabled={isLoading || !question.trim()}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Thinking..." : "Ask AI"}
            </button>

            {response && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-gray-600 dark:text-gray-300">{response}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 