import ProjectDescription from "@/models/projectModel";
import { connectDb } from "@/utils/connectDb";
import { NextResponse } from "next/server";

export const revalidate = 0;
export const dynamic = 'force-dynamic';


export const GET = async (req:Request, res:Response) => {
  try {
    await connectDb();
    const projects = await ProjectDescription.find();
    console.log(projects)
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error:any) {
    console.error(error);
    return NextResponse.json(
      { message: "server error", error: error.message },
      { status: 500 }
    );
  }
};
