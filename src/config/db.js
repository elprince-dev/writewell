// import mysql from "mysql2/promise";

// export const connection = await mysql.createConnection({
//   host: "localhost",
//   user: "mohamed",
//   database: process.env.NEXT_PUBLIC_DB_NAME,
//   password: process.env.NEXT_PUBLIC_DB_PASSWORD,
// });

import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  //connect
  const dbconnection = await mysql.createConnection({
    host: process.env.NEXT_PUBLIC_DB_HOST_PROD,
    user: process.env.NEXT_PUBLIC_DB_USER_PROD,
    database: process.env.NEXT_PUBLIC_DB_NAME,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
    port: process.env.NEXT_PUBLIC_DB_PORT,
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}
