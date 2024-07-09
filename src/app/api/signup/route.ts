import User from "@/models/userModel";
import { connectDb } from "@/utils/connectDb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { username, email, password } = await request.json();

  await connectDb();

  const existingEmail = await User.findOne({ email });

  if (existingEmail ) {
    return new NextResponse("Email or username is already in use", {
      status: 400,
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(username,email,hashedPassword)

  await User.create({ username, email, password: hashedPassword });
  try {

    console.log("test")


    return new NextResponse(  "user is registered", { status: 200 , });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
