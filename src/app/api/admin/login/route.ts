import { NextResponse } from "next/server";

export const POST = async (req: any) => {
 
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 404 }
    );
  }
  const authHeader = req.headers.get('authorization');
  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthoized" }, { status: 404 });
  }
 
  const [username, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");

  if (
    username === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ message: "Login succesfull" }, { status: 200 });
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 404 }
    );
  }
}
