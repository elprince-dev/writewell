import { query } from "@/config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  const request = await req.json();

  //check if user exists
  const q = "SELECT * FROM users WHERE username = ?";
  const data = await query({
    query: q,
    values: [request.username],
  });
  if (data.length === 0) {
    return new Response(JSON.stringify("User not found!"), {
      status: 404,
    });
  }

  //verify password
  const isPasswordCorrect = bcrypt.compareSync(
    request.password,
    data[0].password
  );
  if (!isPasswordCorrect) {
    return new Response(JSON.stringify("Invalid password!"), {
      status: 401,
    });
  }

  //generate JWT token
  const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET);

  const { password, ...other } = data[0];
  // Create headers object
  const headers = new Headers();

  // Serialize and append the cookie to the headers
  headers.append(
    "Set-Cookie",
    serialize("access_token", token, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: true, // process.env.NODE_ENV === "production",
    })
  );

  return new Response(JSON.stringify(other), {
    status: 200,
    headers: headers,
  });
}

