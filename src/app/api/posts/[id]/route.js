import { query } from "@/config/db";

export async function GET(req, { params }) {
  const { id } = params;
  console.log(id);

  const data = await query({
    query: "SELECT * FROM posts WHERE posts.id = ?",
    values: [id],
  });

  return new Response(JSON.stringify(data[0]), { status: 200 });
}
