import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: session.user?.id,
    },
  });
  return NextResponse.json(transactions);
}

export async function POST(request: NextRequest) {
  const session = await auth();
  const body = await request.json();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const transaction = await prisma.transaction.create({
    data: {
      description: body.description,
      category: body.category,
      amount: parseFloat(body.amount),
      date: new Date(body.date),
      type: body.type,
      userId: session?.user?.id,
    },
  });
  try {
    return NextResponse.json(
      { message: "Data received", data: body },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
