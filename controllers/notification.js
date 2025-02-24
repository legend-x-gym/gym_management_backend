import prisma from "../utils/prisma.js";
import { randomId } from "../utils/utils.js";

const listOfNotifications = async (req, res) => {
  try {
    const { gymId } = req.params();
    if (!gymId) res.status(400).json({ message: "Invalid gym id." });
    const notification = await prisma.notification.findMany({
      where: {
        gymId,
        seen: false,
      },
    });
    res.status(200).json({ message: "succesful", notification });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createNotifications = async () => {
  try {
    const gyms = await prisma.gym.findMany();
    const gymIds = gyms.filter((gym) => gym.gymId);
    await Promise.all(
      gymIds.map(async (gymId) => {
        const users = await prisma.trainee.findMany({ where: gymId });
        const exprired = users.filter((user) => user.remainingDays <= 0);
        const oneDayRemaing = users.filter((user) => user.remainingDays === 1);
        const threeDayRemaing = users.filter(
          (user) => user.remainingDays === 3
        );
        const id1 = randomId();
        if (exprired.length)
          await prisma.notification.create({
            data: {
              notificationId: id1,
              notification: `${exprired.length} users membership expired.`,
              gym: { connect: gymId },
            },
          });
        if (oneDayRemaing)
          await prisma.notification.create({
            data: {
              notificationId: id1,
              notification: `${oneDayRemaing.length} users membership will expire tommorow.`,
              gym: { connect: gymId },
            },
          });
        if (threeDayRemaing)
          await prisma.notification.create({
            data: {
              notificationId: id1,
              notification: `${threeDayRemaing.length} users membership will expire in three days.`,
              gym: { connect: gymId },
            },
          });
      })
    );
  } catch (err) {
    console.error(err.message);
  }
};

export { listOfNotifications, createNotifications };
