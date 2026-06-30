"use client";
import { Button } from "@mui/material";
import { useState } from "react";
import toast from "react-hot-toast";

export function SendReportButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function sendReport() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/send-report", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Error while deleting transaction");
      }
      toast.success("Report sended successfully !");
    } catch (error: any) {
      toast.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      disabled={isLoading}
      variant="contained"
      onClick={() => sendReport()}
    >
      Send Report
    </Button>
  );
}
