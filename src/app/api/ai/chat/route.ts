import { NextResponse } from "next/server";
import axios from "axios";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // ✅ Ensure this is set correctly

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ role: "user", parts: [{ text: message }] }], // ✅ Correct format
      }
    );

    // ✅ Extract the text response correctly
    const aiReply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";

    return NextResponse.json({ reply: aiReply });
  } catch (error: any) {
    console.error("AI API Error:", error.response?.data || error.message);

    return NextResponse.json(
      { error: error.response?.data?.error?.message || "Failed to get AI response" },
      { status: 500 }
    );
  }
}
