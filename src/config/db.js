import mysql from "mysql";

export const db = mysql.createConnection({
  host: "localhost",
  user: process.env.NEXT_PUBLIC_DB_USER,
  password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  database: process.env.NEXT_PUBLIC_DB_NAME,
});

export const query = async (sql, params) => {
  const [rows] = await db.execute(sql, params);
  return rows;
};
