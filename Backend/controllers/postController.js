import { Post } from '../model/posts.js';  

// Get posts
export async function fetchPosts(req, res){
    try {
        const {page, limit} = req.query;
        const skip = (page - 1) * limit; // Calculate the number of documents to skip
        const paginatedPosts = await Post.aggregate([
            {
              $addFields: {
                likeCount: { $size: "$likes" }, // Stage 1: Add a "likeCount" field
              },
            },
            {
              $sort: { likeCount: -1, updatedAt: -1 }, // Stage 2: Sort by likeCount and updatedAt
            },
            {
              $skip: parseInt(skip), // Stage 3: Skip the previous documents
            },
            {
              $limit: parseInt(limit), // Stage 4: Limit the number of documents fetched
            },
        ]);
        return res.status(200).json({message:paginatedPosts, success:true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}

// Create Post
export async function createPost(req, res){
    try {
        const {caption, media} = req.body;
        const userId = req.userId;
        if (!userId) {
            return res.status(404).json({ message: "User not found", success: false });
        }
        if (!caption) {
            return res.status(400).json({message:"Caption is required", success:false});
        }
        const newPost = new Post({
            userId: userId,
            media:[...media],
            caption:caption,
            likes: [],
            comments: [],
        })
        await newPost.save();
        return res.status(200).json({message:"Post Created!", success:true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}

// Edit Post
export async function editPost(req, res){
    try {
        const {postId, caption, media} = req.body;
        if (!caption) {
            return res.status(400).json({message:"Caption is required", success:false});
        }
        await Post.findByIdAndUpdate(postId, {caption:caption, media:media, updatedAt:Date.now()});
        return res.status(200).json({message:"Post Updated", success:true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}

// Delete Post
export async function deletePost(req, res){
    try {
        const postId = req.body.postId;
        await Post.deleteOne({_id: postId})
        return res.status(200).json({message:"Post Deleted!", success:true});
    } catch(error) {
        return res.status(500).json({
            message: "Server error. Please try again later.",
            success: false,
            error: error.message
        });
    }
}
