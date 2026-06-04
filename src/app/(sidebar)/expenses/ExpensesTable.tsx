"use client";

import { DeleteButton } from "@/components/dashboard/DeleteButton";
import EditTransactionModal from "@/components/dashboard/EditTransactionModal";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

export default function ExpensesTable({
  transactions,
}: {
  transactions: {
    id: string;
    description: string;
    amount: number;
    category: string;
    type: string;
    date: Date;
  }[];
}) {
  const [filter, setFilter] = useState("all");

  const filteredTransactions =
    filter === "all"
      ? transactions
      : transactions.filter((t) => t.type === filter);

  return (
    <Box sx={{ mt: 4, mx: 10 }}>
      <Box sx={{ mt: 4, mx: 10, float: "right" }}>
        <Box sx={{ mb: 2, display: "flex", gap: 1 }}>
          <Button onClick={() => setFilter("all")}>All</Button>
          <Button
            variant={filter === "income" ? "contained" : "outlined"}
            color="success"
            onClick={() => setFilter("income")}
          >
            Income
          </Button>

          <Button
            variant={filter === "expense" ? "contained" : "outlined"}
            color="error"
            onClick={() => setFilter("expense")}
          >
            Expense
          </Button>
        </Box>
      </Box>
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
            {filteredTransactions.map((transaction) => (
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
                  <Box sx={{ display: "flex", gap: "20px" }}>
                    <DeleteButton id={transaction.id} />
                    <EditTransactionModal transaction={transaction} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
