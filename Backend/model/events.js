import mongoose,{Schema} from "mongoose";
const ObjectId = Schema.ObjectId;

const EventSchema = new Schema({
    userId: {
        type:ObjectId,
        ref:"User",
        required:true,
    },
    media:[{
        type: String
    }],
    title:{
        type:String,
        required:true
    },
    caption:{
        type:String,
        required:true,
    },
    department:{
        type:String,
        required:true
    },
    expired:{
        type:Boolean,
        required:true
    },
    comments: [{
        commentId : {type: ObjectId, ref: "Comment"},
    }],
    upvotes: [{
        type: ObjectId,
        ref:"User",
        required:true
    }],
    deadLine: {type:String, required:true},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
});

export const Event = mongoose.model("Event", EventSchema);
