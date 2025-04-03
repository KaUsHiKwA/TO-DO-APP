import mongoose from "mongoose";
import User from "../models/user.js";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Task = mongoose.model("todos", taskSchema);

export default Task;
