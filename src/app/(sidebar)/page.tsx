import MetricCard from "@/components/dashboard/MetricCards";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import ChartsWrapper from "@/components/dashboard/ChartsWrapper";
import AddTransactionModal from "@/components/dashboard/AddTransactionModal";

export default function DashBoard() {
  return (
    <div>
      <div className="flex justify-center">
        <div className="flex justify-between items-center  ml-10  bg-white/50 shadow-sm p-5 w-full rounded-2xl">
          <h1>Dashboard</h1>
          <AddTransactionModal />
        </div>
      </div>
      <MetricCard />
      <ChartsWrapper />
      <RecentTransactions />
    </div>
  );
}
