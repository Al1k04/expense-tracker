import { Box, Button, Paper, Typography } from "@mui/material";
import { BarChart, Code, User } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export default function About() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 1000,
        mx: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        About
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 5 }}>
        ExpenseTracker — built by Alik Avetikov
      </Typography>
      <Paper sx={{ p: 3, mb: 2, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "primary.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BarChart size={20} />
          </Box>
          <Typography variant="h6">About the app</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          ExpenseTracker helps you take control of your finances. Track your
          income and expenses, add transactions, edit or delete them, and see
          your financial picture in auto-updating charts — by month and by
          category. You can also plan trips and track budgets for each one
          separately.{" "}
        </Typography>
      </Paper>
      <Paper sx={{ p: 3, mt: 2, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "primary.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Code size={20} />
          </Box>
          <Typography variant="h6">Tech stack</Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
            gap: 3,
          }}
        >
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              p: 1,
              fontSize: 13,
              color: "text.secondary",
              bgcolor: "action.hover",
            }}
          >
            Next.js 16
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              p: 1,
              fontSize: 13,
              color: "text.secondary",
              bgcolor: "action.hover",
            }}
          >
            TypeScript
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              p: 1,
              fontSize: 13,
              color: "text.secondary",
              bgcolor: "action.hover",
            }}
          >
            Prisma ORM
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              p: 1,
              fontSize: 13,
              color: "text.secondary",
              bgcolor: "action.hover",
            }}
          >
            PostgreSQL
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              p: 1,
              fontSize: 13,
              color: "text.secondary",
              bgcolor: "action.hover",
            }}
          >
            Auth.js
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              p: 1,
              fontSize: 13,
              color: "text.secondary",
              bgcolor: "action.hover",
            }}
          >
            MUI
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              p: 1,
              fontSize: 13,
              color: "text.secondary",
              bgcolor: "action.hover",
            }}
          >
            Recharts
          </Box>
          <Box
            sx={{
              border: 1,
              borderColor: "divider",
              borderRadius: 1,
              p: 1,
              fontSize: 13,
              color: "text.secondary",
              bgcolor: "action.hover",
            }}
          >
            Resend
          </Box>
        </Box>
      </Paper>

      <Paper sx={{ p: 3, mt: 3, borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              bgcolor: "primary.light",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <User size={20} />
          </Box>
          <Typography variant="h6">Developer</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Designed and built by Alik Avetikov — a fullstack developer in
          training. This project was built from scratch: authentication with
          Google OAuth, REST API, database with Prisma and PostgreSQL, real-time
          charts, email reports via Resend, and a clean UI with MUI.
        </Typography>

        <Button
          sx={{ mt: 2, borderRadius: 2 }}
          variant="outlined"
          startIcon={<FaGithub size={16} />}
          href="https://github.com/Al1k04"
          target="_blank"
        >
          GitHub
        </Button>
      </Paper>
    </Box>
  );
}
