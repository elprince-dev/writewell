import { db } from "@/config/db";

export async function POST(req, res) {
  //Check existing user
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";
  console.log;
  res.body;
  db(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return new Response("User exists");
  });
}
