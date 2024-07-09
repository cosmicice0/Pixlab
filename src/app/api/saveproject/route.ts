import ProjectDescription from "@/models/projectDescription";
import User from "@/models/userModel";
import { connectDb } from "@/utils/connectDb";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export const POST = async (req: any, res: any) => {
  const body = await req.json();
  const { name, email, service, message, amount } = body;
  try {
    await connectDb();

    const session = await getServerSession();
    console.log(session);
    if (!session) {
      return NextResponse.json(
        { message: "User not Authorized" },
        { status: 404 }
      );
    }

    // Find the user by email
    const user = await User.findOne({ email: session.user?.email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const newProject = new ProjectDescription({
      name,
      email: email,
      service,
      message,
      userId: user._id,
      progress: "Not Started",
      invoice: {
        amount,
        status: "Unpaid"
      }
    });
    console.log(newProject);
    const saveProject = await newProject.save();

    await User.findByIdAndUpdate(user._id, {
      $push: { userProjects: newProject._id },
    });
    

    return NextResponse.json(saveProject, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "server error" }, { status: 404 });
  }
};
