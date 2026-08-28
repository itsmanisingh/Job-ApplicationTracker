import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";

export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();

    const application = await JobApplication.create(body);

    return NextResponse.json(application, { status: 201 });
  } catch (error) {
    console.error("Create application error:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Invalid application data" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 },
    );
  }
}
