import { query } from "@/config/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req, { params }) {
  const { id } = params;

  const data = await query({
    query:
      "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.user_id WHERE p.id = ?",
    values: [id],
  });

  return new Response(JSON.stringify(data[0]), { status: 200 });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return new Response(JSON.stringify("Not authenticated"), {
      status: 401,
    });
  }

  try {
    const userInfo = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    const data = await query({
      query: "DELETE FROM posts WHERE `id` = ? AND `user_id` = ?",
      values: [id, userInfo.id],
    });

    if (data.affectedRows === 0) {
      return new Response(JSON.stringify("Post not found"), {
        status: 404,
      });
    }

    return new Response(JSON.stringify("Post deleted"), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Invalid token"), {
      status: 403,
    });
  }
}

export async function PUT(req, { params}) {
  const { id } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const reqData = await req.json();
  console.log("token is" + token);

  if (!token) {
    return new Response(JSON.stringify("Not authenticated"), {
      status: 401,
    });
  }

  try {
    const userInfo = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
    console.log("use info is " + userInfo);
    console.log("request data is " + reqData);

    const data = await query({
      query:
        "UPDATE posts SET `title`=?, `img`=?, `desc`=?, `cat`=? WHERE `id` = ? AND `user_id` = ?",
      values: [
        reqData.title,
        reqData.img,
        reqData.desc,
        reqData.cat,
        id,
        userInfo.id,
      ],
    });

    return new Response(JSON.stringify("Post updated"), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Invalid token"), {
      status: 403,
    });
  }
}
