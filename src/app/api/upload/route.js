import { query } from "@/config/db";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_AWS_REGION,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  console.log(file);

  if (!file) {
    return new Response(JSON.stringify({ error: "No files received." }), {
      status: 400,
    });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replaceAll(" ", "_");

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
    Key: filename,
    Body: buffer,
    ContentType: file.type,
    // ACL: "public-read", // Optional: Set the file to be publicly accessible
  };

  try {
    const data = await s3.upload(params).promise();
    return new Response(JSON.stringify({ filePath: data.Location }), {
      status: 201,
    });
  } catch (error) {
    console.log("Error occurred ", error);
    return new Response(JSON.stringify({ Message: "failed" }), { status: 500 });
  }
}
