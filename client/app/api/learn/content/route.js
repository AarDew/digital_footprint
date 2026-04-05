import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category") || "Phishing";

  try {
    const prompt = "You are a cybersecurity expert. Create a detailed, beginner-friendly but highly accurate learning module specifically focused ONLY on \"" + category + "\". Avoid generic security explanations.\n\n" +
      "The article MUST deeply cover the following specific topics related to " + category + ":\n" +
      "1. Definition\n" +
      "2. How it works\n" +
      "3. Real-world examples\n" +
      "4. Risks\n" +
      "5. Prevention methods\n\n" +
      "Additionally, generate 3 to 5 key takeaways, and 3 to 5 scenario-based MCQ quiz questions testing practical understanding of " + category + ".\n\n" +
      "Return ONLY a valid JSON object with the exact following structure, and no extra markdown or text outside it:\n" +
      "{\n" +
      "  \"title\": \"String - A catchy, highly relevant title for the " + category + " module\",\n" +
      "  \"article\": [\"String - Detailed paragraph covering Definition\", \"String - Detailed paragraph covering How it works\", \"String - Detailed paragraph covering Real-world examples\", \"String - Detailed paragraph covering Risks\", \"String - Detailed paragraph covering Prevention methods\"],\n" +
      "  \"keyTakeaways\": [\"String - Takeaway 1\", \"String - Takeaway 2\", \"String - Takeaway 3\", \"String - Takeaway 4\", \"String - Takeaway 5\"],\n" +
      "  \"quiz\": [\n" +
      "    {\n" +
      "      \"question\": \"String - Scenario-based Question 1\",\n" +
      "      \"options\": [\"String - Option A\", \"String - Option B\", \"String - Option C\", \"String - Option D\"],\n" +
      "      \"answer\": \"String - The exact string of the correct option\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"question\": \"String - Scenario-based Question 2\",\n" +
      "      \"options\": [\"String - Option A\", \"String - Option B\", \"String - Option C\", \"String - Option D\"],\n" +
      "      \"answer\": \"String - The exact string of the correct option\"\n" +
      "    },\n" +
      "    {\n" +
      "      \"question\": \"String - Scenario-based Question 3\",\n" +
      "      \"options\": [\"String - Option A\", \"String - Option B\", \"String - Option C\", \"String - Option D\"],\n" +
      "      \"answer\": \"String - The exact string of the correct option\"\n" +
      "    }\n" +
      "  ]\n" +
      "}";

    const apiKey = process.env.GEMINI_API_KEY;
    const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API Error:", errorText);
      
      // Automatic fallback if Gemini quota is exceeded or an error occurs
      return NextResponse.json({
        title: category + " (Offline Fallback Preview)",
        article: [
          "We couldn't generate a dynamic module because the Gemini API returned an error. This is a local fallback preview for " + category + ".",
          "Phishing is a cyberattack that uses disguised email as a weapon. The goal is to trick the email recipient into believing that the message is something they want or need.",
          "To defend against these threats, always verify the sender's identity, avoid clicking on unsolicited links, and employ hardware-based Multi-Factor Authentication."
        ],
        keyTakeaways: [
          "Always verify link destinations before clicking.",
          "Enable Multi-Factor Authentication (MFA) everywhere.",
          "Do not supply personal information to unverified senders."
        ],
        quiz: [
          {
            "question": "What is the primary method used to defend against " + category + " attacks like credential harvesting?",
            "options": ["Using the same password everywhere", "Clicking unsubsubscribe on spam", "Employing Multi-Factor Authentication (MFA)", "Turning off the firewall"],
            "answer": "Employing Multi-Factor Authentication (MFA)"
          }
        ]
      });
    }

    const data = await response.json();
    let contentStr = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0] ? data.candidates[0].content.parts[0].text : null;
    
    if (!contentStr) {
       console.error("Unrecognized payload structure:", data);
       return NextResponse.json({ error: "Invalid response from AI model" }, { status: 500 });
    }

    // Clean up potential markdown formatting around JSON
    contentStr = contentStr.trim();
    if (contentStr.startsWith("```json")) {
      contentStr = contentStr.replace(/^```json\s*/i, "");
    } else if (contentStr.startsWith("```")) {
      contentStr = contentStr.replace(/^```\s*/, "");
    }
    if (contentStr.endsWith("```")) {
      contentStr = contentStr.replace(/\s*```$/, "");
    }
    contentStr = contentStr.trim();

    let parsedContent;

    try {
      parsedContent = JSON.parse(contentStr);
    } catch (err) {
      console.error("JSON PARSE ERROR:", contentStr);
      // Also fallback if parsing goes terribly wrong
      return NextResponse.json({
        title: category + " (Parse Error Fallback)",
        article: ["The AI generated a malformed response.", "Please try again later."],
        keyTakeaways: ["Monitor your API configuration"],
        quiz: []
      });
    }

    return NextResponse.json(parsedContent);

  } catch (error) {
    console.error("Learn content generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
