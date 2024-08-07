import { query } from "@/config/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

// Function to add CORS headers
function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
}

export async function OPTIONS() {
  const headers = new Headers();
  addCorsHeaders({ headers });
  return new Response(null, { headers });
}

export async function POST(req) {
  const request = await req.json();

  // Check if user exists
  const q = "SELECT * FROM users WHERE username = ?";
  const data = await query({
    query: q,
    values: [request.username],
  });
  if (data.length === 0) {
    const response = new Response(JSON.stringify("User not found!"), {
      status: 404,
    });
    addCorsHeaders(response);
    return response;
  }

  // Verify password
  const isPasswordCorrect = bcrypt.compareSync(
    request.password,
    data[0].password
  );
  if (!isPasswordCorrect) {
    const response = new Response(JSON.stringify("Invalid password!"), {
      status: 401,
    });
    addCorsHeaders(response);
    return response;
  }

  // Generate JWT token
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

  // Add CORS headers
  addCorsHeaders({ headers });

  return new Response(JSON.stringify(other), {
    status: 200,
    headers: headers,
  });
}
