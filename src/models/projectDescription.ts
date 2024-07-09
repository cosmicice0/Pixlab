// models/projectModel.js
import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    service: {
      type: String,
      enum: ["frontend", "backend", "fullstack"],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    progress: {
      type: String,
      enum: ["Not Started", "In Progress", "Halted", "Completed"],
      default: "Not Started",
      // required: true,
    },
    startDate: {
      type: Date,
    },
    dueDate: {
      type: Date,
    },
    invoice: {
      amount: { type: Number },
      status: { type: String, enum: ["Paid", "Unpaid"], default: "Unpaid" },
    },
  },
  { timestamps: true }
);

const ProjectDescription =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
export default ProjectDescription;
