-- CreateTable
CREATE TABLE "Gym" (
    "id" SERIAL NOT NULL,
    "gym_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Gym_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" SERIAL NOT NULL,
    "offer_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "payment_duration" INTEGER NOT NULL,
    "base" DOUBLE PRECISION NOT NULL,
    "discounted" DOUBLE PRECISION NOT NULL,
    "services" JSONB NOT NULL,
    "offer_img" TEXT NOT NULL,
    "gymId" TEXT NOT NULL,

    CONSTRAINT "Offer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trainee" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "phone_num" TEXT,
    "fitness_goal" INTEGER,
    "plan" INTEGER,
    "shift" INTEGER,
    "gender" CHAR(1),
    "img_url" TEXT DEFAULT 'uploads/users/default-user.png',
    "reg_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "payment_method" INTEGER,
    "hasPaid" BOOLEAN NOT NULL DEFAULT true,
    "remaining_days" INTEGER NOT NULL,
    "gymId" TEXT NOT NULL,

    CONSTRAINT "Trainee_pkey" PRIMARY KEY ("id")
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

-- CreateTable
CREATE TABLE "GymSetting" (
    "id" SERIAL NOT NULL,
    "setting_id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "gymId" TEXT NOT NULL,

    CONSTRAINT "GymSetting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "admin_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "img_url" TEXT DEFAULT 'uploads/admins/default-admin.png',
    "role" TEXT NOT NULL DEFAULT 'admin',
    "gymId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "notification_id" TEXT NOT NULL,
    "notification" TEXT NOT NULL,
    "seen" BOOLEAN NOT NULL,
    "gymId" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gym_gym_id_key" ON "Gym"("gym_id");

-- CreateIndex
CREATE UNIQUE INDEX "Offer_offer_id_key" ON "Offer"("offer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Trainee_user_id_key" ON "Trainee"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Trainee_email_key" ON "Trainee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_user_id_key" ON "Trainer"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Trainer_email_key" ON "Trainer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Equipment_equipment_id_key" ON "Equipment"("equipment_id");

-- CreateIndex
CREATE UNIQUE INDEX "GymSetting_setting_id_key" ON "GymSetting"("setting_id");

-- CreateIndex
CREATE UNIQUE INDEX "GymSetting_key_key" ON "GymSetting"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_admin_id_key" ON "Admin"("admin_id");

-- CreateIndex
CREATE UNIQUE INDEX "Notification_notification_id_key" ON "Notification"("notification_id");

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

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym"("gym_id") ON DELETE RESTRICT ON UPDATE CASCADE;
