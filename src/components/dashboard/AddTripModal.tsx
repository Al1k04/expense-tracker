"use client";
import {
  Box,
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
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddTripModal() {
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    type: "expense",
    date: "",
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
      const response = await fetch("/api/trips", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const result = await response.json();
        toast.success("Successfully", result);
        router.refresh();
        setFormData({
          name: "",
          description: "",
          budget: "",
          type: "expense",
          date: "",
        });
      } else {
        toast.error("Error sending");
      }
    } catch (error) {
      toast.error("Network error");
    }
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Trip</DialogTitle>

        <form onSubmit={handleFormSubmit}>
          <DialogContent dividers>
            <DialogContentText sx={{ mb: 2 }}>
              Enter the details of your financial trip below.
            </DialogContentText>

            <Stack spacing={3}>
              <TextField
                required
                autoFocus
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />
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
                label="Budget"
                name="budget"
                type="number"
                value={formData.budget}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              />

              <TextField
                label="Transaction Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="expense">Expense</MenuItem>
              </TextField>

              <TextField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Stack>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="inherit">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit Trip
            </Button>
          </DialogActions>
        </form>
      </Dialog>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mr: "40px" }}>
        <Button
          onClick={() => handleOpen()}
          type="submit"
          variant="contained"
          color="primary"
        >
          + Add Trip
        </Button>
      </Box>
    </>
  );
}
