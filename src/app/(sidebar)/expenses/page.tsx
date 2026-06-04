import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import ExpensesTable from "./ExpensesTable";

export default async function Expense() {
  const session = await auth();
  const getTransactions = await prisma.transaction.findMany({
    where: { userId: session?.user?.id },
  });

  return <ExpensesTable transactions={getTransactions} />;
}
