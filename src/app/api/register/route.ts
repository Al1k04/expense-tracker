import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    // 1. Parse the incoming JSON body
    const body = await request.json();

    // 2. Extract needed data
    const { name, email, password } = body;

    // 3. Validate the payload
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Process data (e.g., save to a database)
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    // 5. Return success response
    return NextResponse.json(
      { message: "User created successfully", data: user },
      { status: 201 },
    );
  } catch (error) {
    // 6. Handle parsing or server errors
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
