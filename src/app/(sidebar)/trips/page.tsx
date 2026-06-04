import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import AddTransactionModal from "@/components/dashboard/AddTransactionModal";
import TripsTable from "./TripsTable";

export default async function Trips() {
  const session = await auth();
  const getTrips = await prisma.trip.findMany({
    where: { userId: session?.user?.id },
  });

  return (
    <>
      <TripsTable trips={getTrips} />
      <AddTransactionModal />
    </>
  );
}
