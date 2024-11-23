import prisma from "../utils/prisma.js";
import randomId from "../utils/randomId.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ message: "Ok", users });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "error fetching users", error: err });
  }
};

const getUser = async (req, res) => {
  const { id: userId } = req.body;
  if (!id) res.status(400).json({ message: "Id is required to get user." });

  try {
    const user = await prisma.user.findUnique({
      where: { userId },
    });
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ message: `Failed to fetch user-${userId}`, error: err.message });
  }
};

const registerUster = async (req, res) => {
  let userId = "";
  const {
    id,
    name,
    email,
    phone: phoneNum,
    age,
    weight,
    gender,
    goal: fitnessGoal,
    plan,
    paymentMethod,
    ext,
  } = req.body;

  userId = id;
  if (!req.file) userId = randomId();

  try {
    const user = await prisma.user.create({
      data: {
        userId,
        name,
        email,
        age: parseInt(age),
        weight: parseFloat(weight),
        gender,
        fitnessGoal,
        plan,
        paymentMethod,
        phoneNum,
        imgUrl: `uploads/users/${userId}${ext}`,
      },
    });
    res.status(200).json({ message: "User succesfully created", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to register user", error: err });
  }
};

const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const fields = Object.entries(req.body);
  const updatedFields = fields.filter((field) => {
    const [key, value] = field;
    return value && !key.includes("ext");
  });
  const updates = Object.fromEntries(updatedFields);
  if (!Object.keys(updates).length && !req.file)
    return res.status(400).json({ message: "No fields specified for update." });
  if (req.file) await deleteUserImage(userId, req.body.ext);
  try {
    const user = await prisma.user.update({
      where: { userId },
      data: {
        ...updates,
        regDate: new Date(updates.regDate),
        weight: updates.weight ? parseFloat(updates.weight) : undefined,
        age: updates.age ? parseInt(updates.age) : undefined,
        hasPaid: updates.hasPaid === "true" ? true : false,
        imgUrl: req.file ? `uploads/users/${userId}${req.body.ext}` : undefined,
      },
    });
    res
      .status(200)
      .json({ message: "User changes updated succesfully.", user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message: "Failed to update user. Please try again. ",
      error: err,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteUserImage(id);
    await prisma.user.delete({
      where: {
        userId: id,
      },
    });
    res.status(200).json({ message: "User deleted succesfully" });
  } catch (err) {
    console.error(err.message);
    res.status(200).json({ message: "Failed to delete user", error: err });
  }
};

const deleteUserImage = async (fileName, exception) => {
  console.log();
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const uploadsDir = path.join(path.join(__dirname, ".."), "uploads/users");
    fs.readdir(uploadsDir, (err, files) => {
      if (err) throw new Error("Failed to read the directory");
      const file = files.find(
        (file) => file.includes(fileName) && !file.includes(exception)
      );
      if (!file) return;
      const filePath = path.join(uploadsDir, file);
      fs.unlink(filePath, (err) => {
        if (err) throw new Error("failed to delete user image.");
      });
    });
  } catch (err) {
    throw err;
  }
};

export { getUser, getUsers, deleteUser, registerUster, updateUser };
