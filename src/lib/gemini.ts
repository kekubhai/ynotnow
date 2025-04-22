// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function analyzeIdea(idea: { title: string; description: string }) {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   const prompt = `Analyze this startup idea and provide a comprehensive analysis:

// Title: ${idea.title}
// Description: ${idea.description}

// Please provide the following analysis in JSON format:
// 1. Feasibility report
// 2. Monetization strategy
// 3. Market gap analysis
// 4. SWOT breakdown
// 5. A compelling elevator pitch

// Format the response as a JSON object with these exact keys:
// {
//   "feasibility": "...",
//   "monetization": "...",
//   "marketGap": "...",
//   "swot": "...",
//   "elevatorPitch": "..."
// }`;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     const text = response.text();
    
//     // Parse the JSON response
//     const analysis = JSON.parse(text);
//     return analysis;
//   } catch (error) {
//     console.error("Error analyzing idea:", error);
//     throw new Error("Failed to analyze idea");
//   }
// }

// export async function generateFollowUpResponse(
//   idea: { title: string; description: string },
//   question: string
// ) {
//   const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//   const prompt = `Based on this startup idea:

// Title: ${idea.title}
// Description: ${idea.description}

// Answer this follow-up question: ${question}

// Provide a detailed, actionable response.`;

//   try {
//     const result = await model.generateContent(prompt);
//     const response = await result.response;
//     return response.text();
//   } catch (error) {
//     console.error("Error generating follow-up response:", error);
//     throw new Error("Failed to generate follow-up response");
//   }
// } 