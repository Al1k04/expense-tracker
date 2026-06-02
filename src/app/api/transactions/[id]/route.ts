import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  reguest: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;

    const deletePost = await prisma.transaction.delete({
      where: {
        id: String(id),
      },
    });
    return NextResponse.json(
      { message: "Post deleted successfully", deletePost },
      { status: 200 },
    );
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json({ error: "Record not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  const user = session;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const { id } = await params;

    const updateTransaction = await prisma.transaction.update({
      where: { id },
      data: {
        ...body,
        amount: parseFloat(body.amount),
        date: new Date(body.date),
      },
    });
    return NextResponse.json(
      {
        message: "Profile partially updated successfully",
        updateTransaction: body,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }
}
