import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Charts } from "./Charts";

export default async function ChartsWrapper() {
  const session = await auth();
  const transactions = await prisma.transaction.findMany({
    where: { userId: session?.user?.id },
  });
  return <Charts transactions={transactions} />;
}
