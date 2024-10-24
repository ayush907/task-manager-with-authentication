import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuthUserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

const AuthUserModel = mongoose.model("users", AuthUserSchema)

export default AuthUserModel;

