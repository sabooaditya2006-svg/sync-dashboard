import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // Explicit check to see if the key is missing during build/runtime
    if (!apiKey) {
      console.error("CRITICAL: GEMINI_API_KEY is undefined in environment variables.");
      return NextResponse.json({ reply: "Server configuration error." }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { prompt } = await req.json();
    
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error("AI Error Details:", error);
    return NextResponse.json(
      { reply: "An error occurred while communicating with the AI." }, 
      { status: 500 }
    );
  }
}