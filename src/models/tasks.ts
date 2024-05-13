import mongoose from "mongoose";
const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    status: {
      type: String,
      trim: true,
      required: true,
      enum: ["PENDING", "COMPLETED"],
      default: "PENDING"
    },
    user: {type: Schema.ObjectId, ref: 'users'},
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model(`tasks`, taskSchema, `tasks`);