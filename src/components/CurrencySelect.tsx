"use client";

import { MenuItem, TextField } from "@mui/material";
import { useState } from "react";

export default function CurrencySelect({
  initialCurrency,
}: {
  initialCurrency: string;
}) {
  const [currency, setCurrency] = useState(initialCurrency);

  const handleChange = async (event: any) => {
    setCurrency(event.target.value);

    await fetch("/api/user/currency", {
      method: "PATCH",
      body: JSON.stringify({ currency: event.target.value }),
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <TextField
      select
      label="Currency"
      value={currency}
      onChange={handleChange}
      helperText="Please select your local currency"
      fullWidth
    >
      <MenuItem value="USD">USD ($)</MenuItem>
      <MenuItem value="EUR">EUR (€)</MenuItem>
      <MenuItem value="GBP">GBP (£)</MenuItem>
      <MenuItem value="GEL">GEL (₾)</MenuItem>
    </TextField>
  );
}
