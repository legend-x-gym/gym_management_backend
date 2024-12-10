/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `GymSetting` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GymSetting_key_key" ON "GymSetting"("key");
