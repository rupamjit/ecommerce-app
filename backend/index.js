import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import connectDB from "./config/db.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

dotenv.config()
const port = process.env.PORT || 5000

// routes
app.use('/api/v1/users', userRoutes)
app.use("/api/v1/category", categoryRoutes);
app.use('/api/v1/products',productRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/upload", uploadRoutes);

connectDB()
app.listen(port,()=>{
    console.log(`Server listening on port ${port}`);
})