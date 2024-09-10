import express from "express";
const app = express();
import { pool } from "./models/db.js";
import router from "./routes/srp.routes.js";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.APP_PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
