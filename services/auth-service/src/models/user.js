import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    googleId: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    role: {type: String, enum: ["student", "faculty", "admin", "pending"], default: "student"}
}, {timestamps: true});

export const userModel = mongoose.model("users", userSchema);
