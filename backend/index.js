import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import connectDB from "./config/db.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

dotenv.config()
const port = process.env.PORT || 5000

// routes
app.use('/api/v1/users', userRoutes)


connectDB()
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})