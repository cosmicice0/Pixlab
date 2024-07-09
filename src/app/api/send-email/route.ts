// app/api/send-email/route.ts
import EmailTemplate from "@/components/email-emplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Readable } from "stream";


const resend = new Resend('re_123456789');
resend.apiKeys.create({ name: 'Production' });
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const file = formData.get("file") as File;

  if (!email || !subject || !message || !file) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Read the file content
  const fileContent = await file.arrayBuffer();
  const fileBuffer = Buffer.from(fileContent);

  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: [email],
      subject: subject,
      react: EmailTemplate({ message }) as React.ReactElement,
      attachments: [
        {
          filename: file.name,
          content: fileBuffer.toString("base64"),
        //   contentType: file.type,
        },
      ],
    });

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
