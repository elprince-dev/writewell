import { query } from "@/config/db";

export async function GET(req) {
  // Parse the request body
  const url = new URL(req.url);
  const cat = url.searchParams.get("cat");

  const data = cat 
    ? await query({
        query: "SELECT * FROM posts WHERE cat = ?",
        values: [cat],
      })
    : await query({
        query: "SELECT * FROM posts",
        values: [],
      });

  console.log(JSON.stringify("request is succes"));

  return new Response(JSON.stringify(data), { status: 200 });
}
