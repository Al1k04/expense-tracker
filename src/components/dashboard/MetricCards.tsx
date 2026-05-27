import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";

export default function MetricCard() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 2,
        mt: "20px",
        ml: "30px",
      }}
    >
      <Card>
        <CardContent>
          <Typography variant="subtitle2">Total Balance</Typography>
          <Typography variant="h5">$4,280</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle2">This month income</Typography>
          <Typography variant="h5" sx={{ color: "#1D9E75" }}>
            +$3,200
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="subtitle2">This month expenses</Typography>
          <Typography variant="h5" sx={{ color: "#A32D2D" }}>
            -$1,840
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="subtitle2">Transactions</Typography>
          <Typography variant="h5">24</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
