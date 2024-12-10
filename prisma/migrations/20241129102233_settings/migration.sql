/*
  Warnings:

  - Changed the type of `value` on the `GymSetting` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `paymentDuration` on the `Offer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GymSetting" DROP COLUMN "value",
ADD COLUMN     "value" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "paymentDuration",
ADD COLUMN     "paymentDuration" INTEGER NOT NULL;
