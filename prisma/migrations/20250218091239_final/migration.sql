/*
  Warnings:

  - Added the required column `gymId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gymId` to the `GymSetting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gymId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gymId` to the `Trainee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "gymId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GymSetting" ADD COLUMN     "gymId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "gymId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Trainee" ADD COLUMN     "gymId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Gym" (
    "id" SERIAL NOT NULL,
    "gym_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainer" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "phone_num" TEXT,
    "img_url" TEXT,
    "reg_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "gymId" TEXT NOT NULL,

    CONSTRAINT "Trainer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" SERIAL NOT NULL,
    "equipment_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'available',
    "last_maintenance_date" TIMESTAMP(3),
    "next_maintenance_date" TIMESTAMP(3),
    "gymId" TEXT NOT NULL,

    CONSTRAINT "Equipment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gym_gym_id_key" ON "Gym"("gym_id");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_user_id_key" ON "Trainer"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_email_key" ON "Trainer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_equipment_id_key" ON "Equipment"("equipment_id");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("gym_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainee" ADD CONSTRAINT "Trainee_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("gym_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trainer" ADD CONSTRAINT "Trainer_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("gym_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipment" ADD CONSTRAINT "Equipment_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("gym_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GymSetting" ADD CONSTRAINT "GymSetting_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("gym_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("gym_id") ON DELETE RESTRICT ON UPDATE CASCADE;
