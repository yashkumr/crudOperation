import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  email: {
    type: String,
    required:true,
    unique:true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
});
export default mongoose.model("Users", userSchema);
