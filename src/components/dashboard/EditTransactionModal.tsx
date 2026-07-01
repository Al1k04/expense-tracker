"use client";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function EditTransactionModal({
  transaction,
}: {
  transaction: {
    id: string;
    description: string;
    amount: number;
    category: string;
    type: string;
    date: Date;
  };
}) {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    description: transaction.description,
    amount: transaction.amount,
    category: transaction.category,
    type: transaction.type,
    date: transaction.date,
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/transactions/${transaction.id}`, {
        method: "PATCH",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Successfully", result);
        router.refresh();
      } else {
        toast.error("Error sending");
      }
    } catch (error) {
      toast.error("Network error");
    }
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type: inputType } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit</DialogTitle>

        <form onSubmit={handleFormSubmit}>
          <DialogContent dividers>
            <DialogContentText sx={{ mb: 2 }}>
              Enter the details of your financial transaction below.
            </DialogContentText>

            <Stack spacing={3}>
              <TextField
                required
                autoFocus
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />

              <TextField
                required
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                slotProps={{ htmlInput: { step: "0.01", min: "0.01" } }}
              />

              <TextField
                select
                label="Transaction Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>
              </TextField>

              <TextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit Transaction
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Button
        size="small"
        onClick={() => handleOpen()}
        type="submit"
        variant="contained"
        color="primary"
      >
        <Pencil size={10} />
      </Button>
    </>
  );
}
