import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import JobApplication from "@/models/JobApplication";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    await connectToDatabase();

    const { id } = await params;

    const application = await JobApplication.findOne({
      _id: id,
      userId: currentUser.userId,
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("Get application error:", error);

    return NextResponse.json(
      { error: "Failed to get application" },
      { status: 500 },
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { id } = await params;
    const body = await request.json();

    const application = await JobApplication.findOneAndUpdate(
      {
        _id: id,
        userId: currentUser.userId,
      },
      body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("Update application error:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { error: "Invalid application data" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { id } = await params;

    const application = await JobApplication.findOneAndDelete({
      _id: id,
      userId: currentUser.userId,
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.error("Delete application error:", error);

    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 },
    );
  }
}