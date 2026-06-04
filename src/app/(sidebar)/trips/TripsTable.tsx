"use client";

import { DeleteButton } from "@/components/dashboard/DeleteButton";
import EditTransactionModal from "@/components/dashboard/EditTransactionModal";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

export default function TripsTable({
  trips,
}: {
  trips: {
    id: string;
    name: string;
    description: string;
    date: Date;
    type: string;
    budget: number;
    userId: string;
  }[];
}) {
  const [filterTrips, setFilterTrips] = useState("expense");

  const filteredTrips =
    filterTrips === "expense"
      ? trips.filter((t) => t.type === "expense")
      : trips;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Budget</TableCell>
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredTrips.map((trips) => (
            <TableRow
              key={trips.description}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left">{trips.description}</TableCell>
              <TableCell align="left">
                <span
                  style={{
                    backgroundColor:
                      trips.type === "income" ? "#1D9E75" : "#A32D2D",
                    color: "#fff",
                    padding: "2px 10px",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                >
                  {trips.type}
                </span>
              </TableCell>
              <TableCell align="left">
                {trips.date.toLocaleDateString()}
              </TableCell>
              <TableCell align="left">{trips.budget}</TableCell>
              <TableCell align="left">
                <Box sx={{ display: "flex", gap: "20px" }}>
                  {/* <DeleteButton id={trips.id} /> */}
                  {/* <EditTransactionModal trips={trips} /> */}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
