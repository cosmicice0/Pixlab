import ProjectDescription from "@/models/projectModel";
import { connectDb } from "@/utils/connectDb";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const projectId = params.id;
  try {
    await connectDb();

    const body = await req.json();
    const { startDate, dueDate } = body;

    const updatedProject = await ProjectDescription.findByIdAndUpdate(
      projectId,
      { startDate, dueDate },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "server error", error: error.message },
      { status: 500 }
    );
  }
};
