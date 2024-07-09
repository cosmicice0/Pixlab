import ProjectDescription from "@/models/projectDescription";
import { connectDb } from "@/utils/connectDb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export const GET = async (req: any, { params }: { params: { id: string } }) => {
  const draftId = params.id;
  try {
    await connectDb();

    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: "User not Authorized" }, { status: 401 });
    }

    const project = await ProjectDescription.findById(draftId);

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ message: "server error", error: error.message }, { status: 500 });
  }
};

export const PUT = async (req: any, { params }: { params: { id: string } }) => {
    const draftId = params.id;
  try {
    const body = await req.json();
    const { name, email, service, message } = body;

    await connectDb();

    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ message: "User not Authorized" }, { status: 401 });
    }

    const project = await ProjectDescription.findById(draftId);

    if (!project) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    project.name = name;
    project.email = email;
    project.service = service;
    project.message = message;

    await project.save();

    return NextResponse.json({ message: "Project updated successfully", project }, { status: 200 });
  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ message: "server error", error: error.message }, { status: 500 });
  }
};
