import { query } from "@/config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  try {
    const request = await req.json();

    // Check if user exists
    const q = "SELECT * FROM users WHERE username = ?";
    const data = await query({
      query: q,
      values: [request.username],
    });

    if (data.length === 0) {
      return new Response(JSON.stringify({ message: "User not found!" }), {
        status: 404,
      });
    }

    // Verify password
    const isPasswordCorrect = bcrypt.compareSync(
      request.password,
      data[0].password
    );
    if (!isPasswordCorrect) {
      return new Response(JSON.stringify({ message: "Invalid password!" }), {
        status: 401,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: data[0].id },
      process.env.NEXT_PUBLIC_JWT_SECRET || process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Optional: Set token expiration time
      }
    );

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
        secure: true, //process.env.NODE_ENV === "production",
        maxAge: 3600, // Optional: Set cookie expiration time
      })
    );

    return new Response(JSON.stringify(other), {
      status: 200,
      headers: headers,
    });
  } catch (error) {
    console.error("Error during signin:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
