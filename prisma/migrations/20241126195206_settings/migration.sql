/*
  Warnings:

  - You are about to drop the `Expense` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Setting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Expense";

-- DropTable
DROP TABLE "Setting";

-- CreateTable
CREATE TABLE "GymSetting" (
    "id" SERIAL NOT NULL,
    "settingId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "GymSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GymSetting_settingId_key" ON "GymSetting"("settingId");
