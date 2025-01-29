import mongoose,{Schema} from "mongoose";
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    userId: {
        type:ObjectId,
        ref:"User",
        required:true,
    },
    media:[{
        type: String
    }],
    caption:{
        type:String,
        required:true,
    },
    likes: [{
        type: ObjectId,
        ref:"User",
        required:true
    }],
    comments: [{
        commentId : {type: ObjectId, ref: "Comment"},
    }],
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()}
});

export const Post = mongoose.model("Post", PostSchema);
