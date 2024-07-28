import { query } from "@/config/db";

export async function GET(req) {
  // Parse the request body
  const url = new URL(req.url);
  const cat = url.searchParams.get("cat");

  // cat
  //   ? await query({
  //       query: "SELECT * FROM posts WHERE cat = ?",
  //       values: [cat],
  //     })
  //   :

  const data = await query({
    query: "SELECT * FROM posts",
    values: [],
  });

  return new Response(JSON.stringify(data), { status: 200 });
}
