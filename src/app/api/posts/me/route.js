import { query } from "@/config/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET(req) {
  // Parse the request URL
  const cookieStore = cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) {
    return new Response(JSON.stringify("Not authenticated"), {
      status: 401,
    });
  }

  try {
    const userInfo = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);

    const q = "SELECT * FROM posts WHERE user_id=?";
    const data = await query({
      query: q,
      values: [userInfo.id],
    });
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify("Invalid token"), {
      status: 403,
    });
  }
}

// export async function POST(req) {
//   const cookieStore = cookies();
//   const token = cookieStore.get("access_token")?.value;
//   const reqData = await req.json();
//   console.log("token is" + token);

//   if (!token) {
//     return new Response(JSON.stringify("Not authenticated"), {
//       status: 401,
//     });
//   }

//   try {
//     const userInfo = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET);
//     console.log("use info is " + userInfo);
//     console.log("request data is " + reqData);

//     const data = await query({
//       query:
//         "INSERT INTO posts (`title`, `img`, `desc`, `cat`, `date`, `user_id`) VALUES (?,?,?,?,?,?)",
//       values: [
//         reqData.title,
//         reqData.img,
//         reqData.desc,
//         reqData.cat,
//         reqData.date,
//         userInfo.id,
//       ],
//     });

//     return new Response(JSON.stringify("Post created"), { status: 200 });
//   } catch (err) {
//     return new Response(JSON.stringify("Invalid token"), {
//       status: 403,
//     });
//   }
// }
