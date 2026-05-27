"use client";

import { Box } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", income: 4000, expense: 2400 },
  { name: "Feb", income: 3000, expense: 1398 },
  { name: "Mar", income: 2000, expense: 9800 },
  { name: "Apr", income: 2780, expense: 3908 },
  { name: "May", income: 1890, expense: 4800 },
];

const categoryData = [
  { category: "Food", amount: 850 },
  { category: "Transport", amount: 420 },
  { category: "Entertainment", amount: 300 },
  { category: "Shopping", amount: 650 },
];

export default function Сharts() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 2,
        mt: "60px",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 70, right: 30, left: 50, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" stroke="#8884d8" tick={{ fontSize: 12 }} />

          <YAxis
            label={{ value: "Amount ($)", angle: -90, position: "insideLeft" }}
            domain={[0, "auto"]}
          />

          <Tooltip />
          <Legend />

          <Bar dataKey="income" fill="#1D9E75" />
          <Bar dataKey="expense" fill="#A32D2D" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={categoryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#1D9E75" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
