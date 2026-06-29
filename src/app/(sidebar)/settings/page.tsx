import { auth } from "@/auth";
import { Avatar, Box, Paper, TextField, Typography } from "@mui/material";
import SignOutButton from "@/components/SignOutButton";
import CurrencySelect from "@/components/CurrencySelect";

export default async function Settings() {
  const session = await auth();
  const email = session?.user?.email;
  const name = session?.user?.name;
  const currency = session?.user.currency;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 640,
        mx: "auto",
        mt: 4,
      }}
    >
      <Paper sx={{ p: 3, mb: 2.5, borderRadius: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
          Profile
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            sx={{ width: 64, height: 64 }}
            alt={name ?? undefined}
            src={session?.user?.image ?? undefined}
          />
          <Box>
            <Typography fontWeight={500}>{name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {email}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            borderTop: 1,
            borderColor: "divider",
            pt: 2.5,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label="Name"
            defaultValue={name}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />

          <TextField
            label="Email"
            defaultValue={email}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </Box>
      </Paper>
      <Paper sx={{ p: 3, mb: 2.5, borderRadius: 2 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
          Preferences
        </Typography>
        <CurrencySelect initialCurrency={currency ?? "USD"} />
      </Paper>
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <SignOutButton />
      </Paper>
    </Box>
  );
}
