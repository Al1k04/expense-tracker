import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { DeleteButton } from "@/components/dashboard/DeleteButton";
import EditTransactionModal from "@/components/dashboard/EditTransactionModal";
import ExpensesTable from "./ExpensesTable";

export default async function Expense() {
  const session = await auth();
  const getTransactions = await prisma.transaction.findMany({
    where: { userId: session?.user?.id },
  });

  return <ExpensesTable transactions={getTransactions} />;
}
