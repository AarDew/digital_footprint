import { NextResponse } from "next/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const topic = searchParams.get("topic") || "";

  if (!topic) {
    return NextResponse.json(
      { error: "Topic parameter is required" },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      console.error("YOUTUBE_API_KEY is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const searchQuery = encodeURIComponent(`cybersecurity ${topic} tutorial`);
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${searchQuery}&type=video&key=${apiKey}`;

    const response = await fetch(url);

    if (!response.ok) {
      let errorDesc = "Failed to fetch videos";
      try {
        const errorData = await response.json();
        console.error("YouTube API Error Details:", errorData);
        if (errorData.error && errorData.error.message) {
           errorDesc = errorData.error.message;
        }
      } catch (e) {
        console.error("YouTube API Error (Non-JSON):", response.status);
      }
      return NextResponse.json(
        { error: errorDesc },
        { status: response.status === 403 ? 403 : response.status === 400 ? 400 : 502 }
      );
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      return NextResponse.json([]);
    }

    const formattedVideos = data.items.map((item) => {
      const snippet = item.snippet || {};
      const id = item.id || {};
      
      const thumbnail = snippet.thumbnails?.high?.url || 
                        snippet.thumbnails?.medium?.url || 
                        snippet.thumbnails?.default?.url || 
                        "";

      return {
        title: snippet.title || "Unknown Title",
        videoId: id.videoId || "",
        thumbnail: thumbnail,
        channelTitle: snippet.channelTitle || "Unknown Channel",
      };
    }).filter(video => video.videoId); // ignore items without a videoId to be safe

    return NextResponse.json(formattedVideos);

  } catch (error) {
    console.error("YouTube video fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
