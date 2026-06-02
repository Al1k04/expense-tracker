import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { DeleteButton } from "./DeleteButton";

export default async function RecentTransactions() {
  const session = await auth();

  const transactions = await prisma.transaction.findMany({
    where: { userId: session?.user?.id },
  });
  return (
    <Box sx={{ mt: 4, mx: 10 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Amount</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.description}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{transaction.description}</TableCell>
                <TableCell align="left">
                  <span
                    style={{
                      backgroundColor:
                        transaction.type === "income" ? "#1D9E75" : "#A32D2D",
                      color: "#fff",
                      padding: "2px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  >
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell align="left">
                  {transaction.date.toLocaleDateString()}
                </TableCell>
                <TableCell align="left">{transaction.amount}</TableCell>
                <TableCell align="left">
                  <DeleteButton id={transaction.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
