import ProjectDescription from "@/models/projectDescription";
import User from "@/models/userModel";
import { connectDb } from "@/utils/connectDb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export const GET = async (req: Request) => {
  const session = await getServerSession();

  if (!session) {
    return NextResponse.json(
      { message: "User not Authorized" },
      { status: 401 }
    );
  }
  try {
    await connectDb();

    const user = await User.findOne({ email: session.user?.email })
    console.log("USER SESSION EMAIL",user)
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const userProjects = await ProjectDescription.find({_id: user.userProjects})
    console.log("USER OBJECTS",userProjects)
    return NextResponse.json({ userProjects }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "server error", error: error.message },
      { status: 500 }
    );
  }
};
