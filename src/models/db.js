import mysql2 from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();



export const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME 
});

pool
  .query("SELECT 1")
  .then(() => console.log("Connected to MySQL"))
  .catch((err) => console.error("MySQL connection error", err));

  pool.on('error', (err) => {
    console.log('MySQL pool error', err);
  });