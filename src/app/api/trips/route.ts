import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const trips = await prisma.trip.findMany({
    where: {
      userId: session.user?.id,
    },
  });
  return NextResponse.json(trips);
}

export async function POST(response: NextRequest) {
  const session = await auth();
  const body = await response.json();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const trips = await prisma.trip.create({
      data: {
        description: body.description,
        name: body.name,
        date: new Date(body.date),
        budget: parseFloat(body.budget),
        userId: session.user.id,
      },
    });
    return NextResponse.json(
      { message: "Data received", data: body },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
