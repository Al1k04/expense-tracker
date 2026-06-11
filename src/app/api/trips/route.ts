import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";

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

export async function POST(request: NextRequest) {
  const session = await auth();
  const body = await request.json();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const trip = await prisma.trip.create({
      data: {
        name: body.name,
        description: body.description,
        date: new Date(body.date),
        budget: parseFloat(body.budget),
        type: body.type,
        userId: session.user.id,
      },
    });

    return NextResponse.json(trip, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
