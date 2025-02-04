/*
  Warnings:

  - You are about to drop the column `settingId` on the `GymSetting` table. All the data in the column will be lost.
  - You are about to drop the column `paymentDuration` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[setting_id]` on the table `GymSetting` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[offer_id]` on the table `Offer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `setting_id` to the `GymSetting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `offer_id` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_duration` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "GymSetting_settingId_key";

-- DropIndex
DROP INDEX "Offer_user_id_key";

-- AlterTable
ALTER TABLE "GymSetting" DROP COLUMN "settingId",
ADD COLUMN     "setting_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "paymentDuration",
DROP COLUMN "user_id",
ADD COLUMN     "offer_id" TEXT NOT NULL,
ADD COLUMN     "payment_duration" INTEGER NOT NULL;

-- DropTable
DROP TABLE "User";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "Trainee" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "phone_num" TEXT,
    "fitness_goal" INTEGER,
    "plan" INTEGER,
    "shift" INTEGER,
    "gender" CHAR(1),
    "img_url" TEXT,
    "reg_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "payment_method" INTEGER,
    "hasPaid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Trainee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "admin_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Trainee_user_id_key" ON "Trainee"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Trainee_email_key" ON "Trainee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GymSetting_setting_id_key" ON "GymSetting"("setting_id");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_offer_id_key" ON "Offer"("offer_id");
