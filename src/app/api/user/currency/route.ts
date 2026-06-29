import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  const session = await auth();
  try {
    const body = await req.json();
    const { currency } = body;

    if (!currency) {
      return NextResponse.json(
        { error: "Currency is required" },
        { status: 400 },
      );
    }

    const updateCurrency = await prisma.user.update({
      data: { currency },
      where: {
        id: session?.user?.id,
      },
    });

    return NextResponse.json({
      success: true,
      receivedCurrency: updateCurrency,
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
