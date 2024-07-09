import ProjectDescription from "@/models/projectModel";
import { connectDb } from "@/utils/connectDb";
import { NextResponse } from "next/server";
export const revalidate = 0;
export const PATCH = async (
  req: any,
  { params }: { params: { id: string } }
) => {
  const projectId = params.id;
  console.log(projectId);
  try {
    await connectDb();

    const body = await req.json();

    const { status } = body;
    console.log("PROGRESS", body.progress);

    const updatedProject = await ProjectDescription.findByIdAndUpdate(
      projectId,
      { progress: body.progress },
      { new: true }
    );
    console.log(updatedProject);

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
