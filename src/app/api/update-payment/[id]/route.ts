
import ProjectDescription from '@/models/projectDescription';
import { connectDb } from '@/utils/connectDb';
import { NextResponse } from 'next/server';


export const PUT = async (req:Request, {params}:{params : {id:string}}) => {
  const projectId = params.id
  console.log( projectId)

  try {
      await connectDb()

      const updateProjectInvoice = await ProjectDescription.findByIdAndUpdate(projectId)
      console.log(updateProjectInvoice)

      updateProjectInvoice.invoice.status = "Paid"; // Update the invoice status
      updateProjectInvoice.progress ="In Progress"
      await updateProjectInvoice.save();


      if (!updateProjectInvoice) {
          return NextResponse.json({ message: 'Project not found' }, { status: 404 });
        }
    
        return NextResponse.json({ message: 'Invoice changed successfully' }, { status: 200 });
  } catch(err:any){
      console.error(err);
      return NextResponse.json(
        { message: "server error", error: err.message },
        { status: 500 }
      );
  }
}
