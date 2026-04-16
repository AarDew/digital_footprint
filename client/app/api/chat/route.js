import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are a cybersecurity expert assistant.

Your job is to explain cybersecurity concepts in a simple, beginner-friendly way.

Every response MUST include:
1. Clear explanation
2. Real-world example
3. Prevention tips

Guidelines:
- Keep answers concise but informative
- Use bullet points where helpful
- Avoid technical jargon unless explained
- Focus only on cybersecurity topics

If user asks harmful or hacking-related questions:
- Do NOT provide illegal guidance
- Instead explain ethical cybersecurity and prevention`;

export async function POST(request) {
  try {
    const body = await request.json();
    let { message } = body;

    // Trim and validate user input
    if (typeof message !== 'string') {
      return NextResponse.json({ reply: "Invalid input type." }, { status: 400 });
    }
    
    message = message.trim();
    if (!message) {
      return NextResponse.json({ reply: "Message cannot be empty." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not configured.");
      return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
    }

    // Prepare full prompt for Gemini
    const fullPrompt = `${SYSTEM_PROMPT}\n\nUser message: ${message}`;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    // Use latest Gemini API via fetch (matching the other app routes)
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: fullPrompt }]
        }],
        generationConfig: {
          maxOutputTokens: 600,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);
      return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!reply) {
      console.error("Unexpected response from Gemini:", data);
      return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
    }

    // Return response in same format
    return NextResponse.json({ reply: reply.trim() });

  } catch (error) {
    console.error("Chat API caught error:", error);
    return NextResponse.json({ reply: "Something went wrong. Please try again." }, { status: 500 });
  }
}
