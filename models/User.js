import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: { type: String, required: true },
  role: {
    type: Number,
    default: 0,
  }
},
{
  timestamps: true,
  versionKey: false,
  id: true,
  toJSON: {
    transform(doc, ret){
      ret.id = ret._id
      delete ret._id
    }
  }
}
);

export const User = mongoose.model("User", userSchema, "users");
