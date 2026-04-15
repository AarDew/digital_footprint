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

    const searchQuery = encodeURIComponent(`cybersecurity ${topic} explained tutorial beginner`);
    // Fetch an extended pool securely so we can actively filter down to only premium results
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${searchQuery}&type=video&safeSearch=moderate&videoEmbeddable=true&key=${apiKey}`;

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
      
      // Filter primarily for high or medium quality thumbnails to preserve premium UX
      const thumbnailInfo = snippet.thumbnails?.high || snippet.thumbnails?.medium;

      // Decode common HTML entities from API response
      const cleanTitle = (snippet.title || "Unknown Title")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&');

      return {
        title: cleanTitle,
        videoId: id.videoId || "",
        thumbnailUrl: thumbnailInfo ? thumbnailInfo.url : null,
        channelTitle: snippet.channelTitle || "Unknown Channel",
      };
    }).filter(video => video.videoId && video.thumbnailUrl);

    // Limit down to strictly the top 6 well-formed educational results
    const top6Videos = formattedVideos.slice(0, 6).map(v => ({
      title: v.title,
      videoId: v.videoId,
      thumbnail: v.thumbnailUrl,
      channelTitle: v.channelTitle
    }));

    return NextResponse.json(top6Videos);

  } catch (error) {
    console.error("YouTube video fetch error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
