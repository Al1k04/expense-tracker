import { Button } from "@mui/material";
import { Plus } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCards";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import ChartsWrapper from "@/components/dashboard/ChartsWrapper";

export default function DashBoard() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex justify-between items-center  ml-10  bg-white/50 shadow-sm p-5 w-full rounded-2xl">
          <h1>Dashboard</h1>
          <Button
            variant="contained"
            sx={{ py: "5px", px: "10px" }}
            startIcon={<Plus size={16} />}
          >
            Add transaction
          </Button>
        </div>
      </div>
      <MetricCard />
      <ChartsWrapper />
      <RecentTransactions />
    </div>
  );
}
