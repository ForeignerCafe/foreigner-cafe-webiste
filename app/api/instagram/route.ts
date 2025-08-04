// app/api/instagram/route.ts

export async function GET(request: Request) {
  const accessToken = process.env.IG_ACCESS_TOKEN;
  const userId = process.env.IG_USER_ID;

  if (!accessToken || !userId) {
    return new Response(JSON.stringify({ error: "Missing IG credentials" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,like_count,comments_count&access_token=${accessToken}&limit=27`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Instagram API error: ${response.status}`);
    }

    const data = await response.json();

    const filtered = data.data.filter(
      (post: any) =>
        post.media_type === "IMAGE" ||
        post.media_type === "VIDEO" ||
        post.media_type === "REEL"
    );

    return new Response(JSON.stringify(data.data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error fetching Instagram media:", error.message);

    return new Response(
      JSON.stringify({ error: "Failed to fetch Instagram posts" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
