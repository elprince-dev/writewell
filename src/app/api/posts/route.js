import { query } from "@/config/db";
import { cookies } from "next/headers";

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
  data = await req.json();
  console.log(data);

  if (!token) {
    return new Response(JSON.stringify("Not authenticated"), {
      status: 401,
    });
  }

  try {
    const userInfo = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    // const data = await query({
    //   query:
    //     "INSERT INTO posts (`id`, `title`, `img`, `desc`, `cat`, `date`, `user_id`) VALUES (?,?,?,?,?,?,?)",
    //   values: [id, userInfo.id],
    // });

   

    return new Response(JSON.stringify("Post deleted"), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Invalid token"), {
      status: 403,
    });
  }
}
