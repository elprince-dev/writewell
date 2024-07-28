import { query } from "@/config/db";

export async function GET(req) {
  // Parse the request URL
  const url = new URL(req.url);
  const cat = url.searchParams.get("cat");

  // cat is being evaluated with a string of value "null"
  if (cat !== null && cat !== "null") {
    const q = "SELECT * FROM posts WHERE cat=?";
    const data = await query({
      query: q,
      values: [cat],
    });
    return new Response(JSON.stringify(data), { status: 200 });
  }

  const q = "SELECT * FROM posts";
  const data = await query({
    query: q,
    values: [],
  });
  return new Response(JSON.stringify(data), { status: 200 });
}
