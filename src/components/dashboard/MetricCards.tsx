import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { Box, Card, CardContent, Typography } from "@mui/material";

export default async function MetricCard() {
  const session = await auth();

  const transactions = await prisma.transaction.findMany({
    where: { userId: session?.user?.id },
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalBalance = totalIncome - totalExpenses;

  const total = transactions.length;

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 2,
        mt: "20px",
        ml: "30px",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="subtitle2">Total Balance</Typography>
          <Typography variant="h5">{totalBalance}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle2">This month income</Typography>
          <Typography variant="h5" sx={{ color: "#1D9E75" }}>
            {totalIncome}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="subtitle2">This month expenses</Typography>
          <Typography variant="h5" sx={{ color: "#A32D2D" }}>
            {totalExpenses}
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="subtitle2">Transactions</Typography>
          <Typography variant="h5">{total}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
