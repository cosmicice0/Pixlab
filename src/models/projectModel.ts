import mongoose, { Schema, models } from "mongoose";

const projectSchema = new Schema({
  projectId: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    required: true,
  }
}, { _id: false });

const Project = models.Project || mongoose.model("Project", projectSchema);
export default Project;