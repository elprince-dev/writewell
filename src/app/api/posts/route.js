import { query } from "@/config/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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

export async function POST(req) {
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;
  const reqData = await req.json();
  console.log(reqData);

  if (!token) {
    return new Response(JSON.stringify("Not authenticated"), {
      status: 401,
    });
  }

  try {
    const access_token = process.env.JWT_SECRET;
    const userInfo = jwt.verify(token, access_token);
    console.log("user info is " + userInfo.id);
    console.log("request data is " + reqData);

    const data = await query({
      query:
        "INSERT INTO posts(`title`, `img`, `desc`, `cat`, `date`, `user_id`, `public`) VALUES (?,?,?,?,?,?,?)",
      values: [
        reqData.title,
        reqData.img,
        reqData.desc,
        reqData.cat,
        reqData.date,
        userInfo.id,
        1,
      ],
    });
    console.log("Data inserted successfully:", data);

    return new Response(JSON.stringify("Post created"), { status: 200 });
  } catch (err) {
    console.error("Error inserting data:", err);
    return new Response(JSON.stringify("Error creating post"), {
      status: 500,
    });
  }
}
