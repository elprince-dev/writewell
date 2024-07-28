import { query } from "@/config/db";

export async function GET(req, { params }) {
  const { id } = params;

  const data = await query({
    query:
      "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.user_id WHERE p.id = ? ",
    values: [id],
  });

  return new Response(JSON.stringify(data[0]), { status: 200 });
}
