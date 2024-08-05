import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const host = process.env.DB_HOST_PROD;
  const port = process.env.DB_PORT_PROD;
  const user = process.env.DB_USER_PROD;
  const password = process.env.DB_PASSWORD_PROD;
  const database = process.env.DB_NAME_PROD;
  //connect
  const dbconnection = await mysql.createConnection({
    host: host,
    user: user,
    database: database,
    password: password,
    port: port,
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
