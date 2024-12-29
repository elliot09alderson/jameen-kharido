import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/db.js";
import { customerRouter } from "./routes/customerRouter.js";
import bodyParser from "body-parser";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

// import multer from "multer";

export const app = express();
app.use(express.json());
app.use(bodyParser.json());
dotenv.config({ path: "./src/.env" });
export const upload = multer({
  dest: "uploads/", // Temporary folder for file uploads
});
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

connectDB();

app.use("/api/v1/customer", customerRouter);
app.listen(4000, () => console.log("port is running on 4k"));
