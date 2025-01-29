import mongoose, {Schema} from "mongoose";
const ObjectId = Schema.ObjectId;

const CommentSchema = new Schema({
    userId : {type: ObjectId, ref: "User"},
    content : {type:String, required:true},
    likes:[{type: ObjectId, ref:"User", required:true}],
    createdAt : {type:Date, default: Date.now},
});

export const Comment = mongoose.model("Comment", CommentSchema); 