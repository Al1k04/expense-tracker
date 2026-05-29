import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

function createData(
  name: string,
  category: string,
  date: string,
  amount: number,
  color: string,
) {
  return { name, category, date, amount, color };
}

const rows = [
  createData("Grocery store", "Food", "May 24", 48.5, "#1D9E75"),
  createData("Salary", "Income", "May 22", 3200, "#0F6E56"),
  createData("Uber ride", "Transport", "May 21", 12.0, "#185FA5"),
  createData("Netflix", "Entertainment", "May 20", 15.99, "#854F0B"),
];

export default function RecentTransactions() {
  return (
    <Box sx={{ mt: 4, mx: 10 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  <span
                    style={{
                      backgroundColor: row.color,
                      color: "#fff",
                      padding: "2px 10px",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  >
                    {row.category}
                  </span>
                </TableCell>
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
