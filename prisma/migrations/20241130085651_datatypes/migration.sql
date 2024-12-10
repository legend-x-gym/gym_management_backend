/*
  Warnings:

  - The `fitnessGoal` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `plan` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `paymentMethod` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "fitnessGoal",
ADD COLUMN     "fitnessGoal" INTEGER,
DROP COLUMN "plan",
ADD COLUMN     "plan" INTEGER,
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" INTEGER;
