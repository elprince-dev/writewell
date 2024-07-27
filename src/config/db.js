// import mysql from "mysql2/promise";

// export const connection = await mysql.createConnection({
//   host: "localhost",
//   user: "mohamed",
//   database: process.env.NEXT_PUBLIC_DB_NAME,
//   password: process.env.NEXT_PUBLIC_DB_PASSWORD,
// });

import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
 

  //Digital ocean ubuntu
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    user: "mohamed",
    database: process.env.NEXT_PUBLIC_DB_NAME,
    password: process.env.NEXT_PUBLIC_DB_PASSWORD,
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
