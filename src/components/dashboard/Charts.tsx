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

interface Transaction {
  id: string;
  amount: number;
  category: string;
  date: Date;
  type: string;
}

interface ChartsProps {
  transactions: Transaction[];
}

export const Charts: React.FC<ChartsProps> = ({ transactions }) => {
  const result = transactions.reduce(
    (
      acc: Record<string, { name: string; income: number; expense: number }>,
      current,
    ) => {
      const shortMonth = current.date.toLocaleString("en-En", {
        month: "short",
      });

      if (!acc[shortMonth]) {
        acc[shortMonth] = {
          name: shortMonth,
          income: 0,
          expense: 0,
        };
      }

      if (current.type === "income") {
        acc[shortMonth].income += current.amount;
      } else if (current.type === "expense") {
        acc[shortMonth].expense += current.amount;
      }

      return acc;
    },
    {},
  );

  const chartData = Object.values(result);

  const categoryData = transactions.reduce((acc: Record<string, number>, t) => {
    const { category, amount } = t;

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += amount;

    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryData).map(
    ([category, amount]) => ({
      category,
      amount,
    }),
  );
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr",
          md: "repeat(2, 1fr)",
        },
        gap: 2,
        mt: "60px",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
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
        <BarChart data={categoryChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#1D9E75" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
