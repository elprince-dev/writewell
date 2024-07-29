import { query } from "@/config/db";

import path from "path";
import { writeFile } from "fs/promises";

//source: https://medium.com/@irwantoalvin/how-to-upload-file-to-the-directory-using-next-js-app-router-prismaorm-mysql-and-postman-d6e3a5ba5054

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return new Response(JSON.stringify({ error: "No files received." }), {
      status: 400,
    });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");
  console.log(filename);

  try {
    await writeFile(
      path.join(process.cwd(), "public/uploads/" + filename),
      buffer
    );
    return new Response(JSON.stringify({ filename: filename }), {
      status: 201,
    });
  } catch (error) {
    console.log("Error occured ", error);
    return new Response(JSON.stringify({ Message: "failed" }), { status: 500 });
  }
}
