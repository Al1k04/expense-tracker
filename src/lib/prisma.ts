import { PrismaClient } from "@/generated/prisma/client";

declare const globalThis: {
  prismaGlobal: PrismaClient;
} & typeof global;

if (!globalThis.prismaGlobal) {
  globalThis.prismaGlobal = new PrismaClient({
    datasourceUrl:
      process.env.DATABASE_URL ?? "postgresql://localhost:5432/expense_tracker",
  });
}

const prisma = globalThis.prismaGlobal;
export default prisma;
