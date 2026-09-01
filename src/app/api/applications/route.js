import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();

    const application = await JobApplication.create({
      ...body,
      userId: currentUser.userId,
    });

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

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const applications = await JobApplication.find({
      userId: currentUser.userId,
    }).sort({ createdAt: -1 });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Get applications error:", error);

    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 },
    );
  }
}
