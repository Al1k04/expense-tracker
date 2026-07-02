import { PrismaClient } from "@/generated/prisma/client";

declare const globalThis: {
  prismaGlobal: PrismaClient;
} & typeof global;

if (!globalThis.prismaGlobal) {
  globalThis.prismaGlobal = new PrismaClient();
}

const prisma = globalThis.prismaGlobal;
export default prisma;
