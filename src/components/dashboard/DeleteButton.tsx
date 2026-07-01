"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export function DeleteButton({ id }: { id: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error while deleting transaction");
      }
      router.refresh();
      toast.success("Transaction successfully deleted!");
    } catch (error: any) {
      toast.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      size="small"
      disabled={isLoading}
      variant="contained"
      onClick={() => handleDelete()}
    >
      <Trash2 size={10} />
    </Button>
  );
}
