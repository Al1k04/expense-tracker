import "dotenv/config";
import prisma from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const password = "123ddd";
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({
    data: {
      email: "elsa@prisma.io",
      name: "Elsa Prisma",
      password: hashedPassword,
    },
  });
  const transaction = await prisma.transaction.createMany({
    data: [
      {
        description: "Bought ps5",
        category: "enjoy",
        amount: 700,
        date: new Date("2026-05-31"),
        type: "expense",
        userId: user.id,
      },
      {
        description: "Salary",
        category: "enjoy",
        amount: 1500,
        date: new Date("2026-07-21"),
        type: "income",
        userId: user.id,
      },
      {
        description: "Casino",
        category: "casual game",
        amount: 250,
        date: new Date("2026-08-21"),
        type: "expense",
        userId: user.id,
      },
      {
        description: "Job",
        category: "salary",
        amount: 3000,
        date: new Date("2026-09-21"),
        type: "income",
        userId: user.id,
      },
    ],
  });
  return hashedPassword;
}

main();
