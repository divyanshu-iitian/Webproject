import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./utill/DataBase.js";
import userRoutes from './Router/userRoute.js';  // Import user routes
import postRoutes from "./Router/postRoute.js";
import eventRoutes from "./Router/eventRoute.js"
import dotenv from "dotenv";
import { Post } from "./model/posts.js";

dotenv.config({});

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true                
};
app.use(cors(corsOptions));

// Route
app.get("/api/home", (req, res) => {
    return res.status(200).json({
        message: "I am coming from backend",
        success: true
    });
});

app.use('/api/v1/users', userRoutes);  // Prefix for user-related routes

app.use('/api/v1/post', postRoutes);  // Prefix for user-related routes

app.use('/api/v1/event', eventRoutes);

app.get('/api/v1/trending', async (req, res)=>{
    try {
        const limit = 5;
        const trendingPosts = await Post.aggregate([
            {
              $addFields: {
                likeCount: { $size: "$likes" }, // Stage 1: Add a "likeCount" field
              },
            },
            {
              $sort: { likeCount: -1}, // Stage 2: Sort by likeCount
            },
            {
              $limit: parseInt(limit), // Stage 3: Limit the number of documents fetched
            },
        ]);
        return res.status(200).json({message:trendingPosts, success:true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
})

// Start the server
const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});
