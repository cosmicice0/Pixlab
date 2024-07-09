import mongoose, { Schema, models } from "mongoose";
import Invoice from "./invoiceModel";
import Project from "./projectModel";
import projectDescription from "./projectDescription";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    // invoices: [Invoice.schema],
    // projects: [Project.schema],
    userProjects: [{ type: Schema.Types.ObjectId, ref: "ProjectDescription" }],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
