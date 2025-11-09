/*
  Warnings:

  - A unique constraint covering the columns `[founderId]` on the table `Settlement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `founderId` to the `Settlement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Settlement" ADD COLUMN     "founderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Settlement_founderId_key" ON "Settlement"("founderId");

-- AddForeignKey
ALTER TABLE "Settlement" ADD CONSTRAINT "Settlement_founderId_fkey" FOREIGN KEY ("founderId") REFERENCES "Character"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
