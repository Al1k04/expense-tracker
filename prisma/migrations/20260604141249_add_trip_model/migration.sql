-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
