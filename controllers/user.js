import prisma from "../utils/prisma.js";

import { deleteImage, randomId } from "../utils/utils.js";

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({ orderBy: { regDate: "asc" } });
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
    const user = (await prisma.user.findUnique({ where: { email } })) || {};
    if (Object.keys(user).length) {
      deleteImage(id, "users");
      return res
        .status(400)
        .json({ message: "Failed to register user. User already exists." });
    }
    const newUser = await prisma.user.create({
      data: {
        userId,
        name,
        email,
        age: parseInt(age),
        weight: parseFloat(weight),
        gender,
        fitnessGoal: parseInt(fitnessGoal),
        plan: parseInt(plan),
        paymentMethod: parseInt(paymentMethod),
        phoneNum,
        imgUrl: `uploads/users/${userId}${ext}`,
      },
    });
    res
      .status(200)
      .json({ message: "User succesfully created", user: newUser });
  } catch (err) {
    console.error(err.message);
    deleteImage(id, "users");
    res.status(500).json({
      message: "Failed to register user. Please try again.",
      error: err,
    });
  }
};

const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const {
    regDate,
    name,
    email,
    phone: phoneNum,
    age,
    weight,
    gender,
    fitnessGoal,
    plan,
    paymentMethod,
    hasPaid,
    ext,
  } = req.body;

  req.file && (await deleteImage(userId, "users", ext));

  try {
    const user = await prisma.user.update({
      where: { userId },
      data: {
        regDate: regDate ? new Date(regDate) : undefined,
        name: name,
        email: email,
        age: age ? parseInt(age) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        gender: gender,
        fitnessGoal: fitnessGoal ? parseInt(fitnessGoal) : undefined,
        plan: plan ? parseInt(plan) : undefined,
        paymentMethod: paymentMethod ? parseInt(paymentMethod) : undefined,
        phoneNum,
        imgUrl: req.file ? `uploads/users/${userId}${ext}` : undefined,
        hasPaid: hasPaid ? (hasPaid === "true" ? true : false) : undefined,
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
    await deleteImage(id, "users");
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

export { getUser, getUsers, deleteUser, registerUster, updateUser };
