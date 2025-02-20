import prisma from "../utils/prisma.js";
import { randomId } from "../utils/utils.js";

const createGym = async (req, res) => {
  const { name } = req.body;
  const gymId = randomId();
  try {
    const gym = await prisma.gym.create({
      data: {
        name,
        gymId,
      },
    });
    res.status(200).json({ message: "gym succesfully created", gym });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Failed to create gym. Please try again.",
      error: err.message,
    });
  }
};

const getGyms = async (req, res) => {
  try {
    const gyms = await prisma.gym.findMany();
    res.status(200).json({ message: "gyms fetched", gyms });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Failed to fetch gyms. Please try again.",
      error: err.message,
    });
  }
};

const getGym = async (req, res) => {
  const { id } = req.params;
  try {
    const gym = await prisma.gym.findUnique({
      where: { gymId: id },
    });
    res.status(200).json({ message: "gym fetched", gym });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Failed to fetch gym. Please try again.",
      error: err.message,
    });
  }
};

const deleteGym = async (req, res) => {
  const { id } = req.params;
  try {
    const gym = await prisma.gym.delete({
      where: { gymId: id },
    });
    res.status(200).json({ message: "gym deleted", gym });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Failed to delete gym. Please try again.",
      error: err.message,
    });
  }
};

export { createGym, getGyms, getGym, deleteGym };
