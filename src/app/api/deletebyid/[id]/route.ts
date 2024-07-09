import ProjectDescription from "@/models/projectDescription"
import { connectDb } from "@/utils/connectDb"
import { NextResponse } from "next/server"

export const DELETE = async (req:Request, {params}:{params : {id:string}}) => {
    const projectId = params.id
    console.log("ID To BE DEleted", projectId)

    try {
        await connectDb()

        const deletedProject = await ProjectDescription.findByIdAndDelete(projectId)
        console.log(deletedProject)

        if (!deletedProject) {
            return NextResponse.json({ message: 'Project not found' }, { status: 404 });
          }
      
          return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
    } catch(err:any){
        console.error(err);
        return NextResponse.json(
          { message: "server error", error: err.message },
          { status: 500 }
        );
    }
}