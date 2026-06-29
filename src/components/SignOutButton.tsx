"use client";
import { Box, Button } from "@mui/material";
import { signOut } from "next-auth/react";
export default function SignOutButton() {
  return (
    <Box>
      <Button onClick={() => signOut()} variant="contained">
        Sign Out
      </Button>
    </Box>
  );
}
