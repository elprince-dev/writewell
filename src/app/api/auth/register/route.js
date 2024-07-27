import { query } from "@/config/db";
import bcrypt from "bcryptjs";

export async function POST(req) {
  // Parse the request body
  const { first_name, last_name, username, email, password } = await req.json();

  //check if user exitst
  const q = "SELECT * FROM users WHERE username = ? or email = ?";
  const data = await query({
    query: q,
    values: [username, email],
  });

  if (data.length > 0) {
    return new Response(JSON.stringify("User already exists!"), {
      status: 409,
    });
  }

  //hash the password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  //Create user
  const user_q =
    "INSERT INTO users(first_name, last_name, username, email, password) VALUES (?,?,?,?,?)";
  const values = [first_name, last_name, username, email, hash];
  const user = await query({
    query: user_q,
    values: values,
  });
  console.log(user);

  return new Response(JSON.stringify("user has been created"), { status: 200 });
}
