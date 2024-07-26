import { db } from "@/config/db";

export async function POST(req, res) {
  //Check existing user
  const { email, username } = await req.json();
  //   const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  //   console.log(name);
  return new Response(email);
  //   db(q, [req.body.email, req.body.username], (err, data) => {
  //     if (err) return res.json(err);
  //     if (data.length) return new Response("User exists");
  //   });
}
