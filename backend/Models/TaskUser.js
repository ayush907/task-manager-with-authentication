import mongoose from "mongoose";
import taskConnection from "./ConnTask.js";

const Schema = mongoose.Schema;

const TaskUserSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    TaskName: {type: String, required: true},
    IsDone: {type: Boolean, required: true}
})

const TaskUserModel = taskConnection.model("tasks", TaskUserSchema)

export default TaskUserModel