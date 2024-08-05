/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_PASSWORD_PROD: process.env.DB_PASSWORD_PROD,
    DB_NAME_PROD: process.env.DB_NAME_PROD,
    DB_PORT_PROD: process.env.DB_PORT_PROD,
    DB_HOST_PROD: process.env.DB_HOST_PROD,
    DB_USER_PROD: process.env.DB_USER_PROD,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
