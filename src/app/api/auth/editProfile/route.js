import { query } from "@/config/db";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function PUT(req) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const reqData = await req.json();

  if (!token) {
    return new Response(JSON.stringify("Not authenticated"), {
      status: 401,
    });
  }

  try {
    const userInfo = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    const data = await query({
      query:
        "UPDATE users SET `first_name`=?, `last_name`=?, `username`=?, `email`=? WHERE `id` = ? ",
      values: [
        reqData.first_name,
        reqData.last_name,
        reqData.username,
        reqData.email,
        userInfo.id,
      ],
    });

    return new Response(JSON.stringify("User information has been updated"), {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify("Invalid token"), {
      status: 403,
    });
  }
}
