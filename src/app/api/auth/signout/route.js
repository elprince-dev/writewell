import { query } from "@/config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST() {
//   const request = await req.json();

  const headers = new Headers();

  // Serialize and append the cookie with an expired date to the headers
  headers.append(
    "Set-Cookie",
    serialize("access_token", "", {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: true, // process.env.NODE_ENV === "production",
      expires: new Date(0), // Set the cookie expiration to the past date
    })
  );

  return new Response(JSON.stringify("User has been signed out"), {
    status: 200,
    headers: headers,
  });
}
