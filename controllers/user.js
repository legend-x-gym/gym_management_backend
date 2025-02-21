import prisma from "../utils/prisma.js";

import { deleteImage, randomId } from "../utils/utils.js";

const getUsers = async (req, res) => {
  try {
    const users = await prisma.trainee.findMany({
      orderBy: { regDate: "asc" },
    });
    res.status(200).json({ message: "Ok", users });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ message: "error fetching users", error: err });
  }
};

const getUser = async (req, res) => {
  const { id: userId } = req.body;
  if (!id) res.status(400).json({ message: "Id is required to get user." });

  try {
    const user = await prisma.trainee.findUnique({
      where: { userId },
    });
    res.status(200).json({ user });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ message: `Failed to fetch user-${userId}`, error: err.message });
  }
};

const registerUster = async (req, res) => {
  let userId = "";
  console.log(req.body);
  const {
    id,
    name,
    email,
    phoneNum,
    age,
    weight,
    height,
    shift,
    gender,
    goal,
    plan: strPlan, //plan as a string which should be parsed as int
    paymentMethod,
    gymId,
    ext,
  } = req.body;

  userId = id;
  if (!req.file) userId = randomId();

  try {
    const user = (await prisma.trainee.findUnique({ where: { email } })) || {};
    if (Object.keys(user).length) {
      deleteImage(id, "users");
      return res
        .status(400)
        .json({ message: "Failed to register user. User already exists." });
    }
    const plan = parseInt(strPlan);

    // 1 || "" - month
    // 2 - 3 month
    // 3 - 6 month
    // 4 - year

    if (!plan || plan === 1) remainingDays = 30;
    if (plan === 2) remainingDays = 90;
    if (plan === 3) remainingDays = 180;
    else remainingDays = 365;

    const newUser = await prisma.trainee.create({
      data: {
        userId,
        name,
        email,
        age: parseInt(age),
        weight: parseFloat(weight),
        height: parseFloat(height),
        gender,
        fitnessGoal: parseInt(goal),
        plan: parseInt(plan),
        shift: parseInt(shift),
        paymentMethod: parseInt(paymentMethod),
        phoneNum,
        remainingDays,
        imgUrl: `uploads/users/${userId}${ext}`,
        gym: { connect: { gymId } },
      },
    });
    res
      .status(200)
      .json({ message: "User succesfully created", user: newUser });
  } catch (err) {
    console.error(err.message);
    deleteImage(id, "users");
    return res.status(500).json({
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
    height,
    gender,
    fitnessGoal,
    plan,
    shift,
    paymentMethod,
    hasPaid,
    ext,
  } = req.body;

  req.file && (await deleteImage(userId, "users", ext));

  try {
    const user = await prisma.trainee.update({
      where: { userId },
      data: {
        regDate: regDate ? new Date(regDate) : undefined,
        name: name,
        email: email,
        age: age ? parseInt(age) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        height: height ? parseFloat(height) : undefined,
        gender: gender,
        fitnessGoal: fitnessGoal ? parseInt(fitnessGoal) : undefined,
        plan: plan ? parseInt(plan) : undefined,
        shift: shift ? parseInt(shift) : undefined,
        paymentMethod: paymentMethod ? parseInt(paymentMethod) : undefined,
        phoneNum,
        imgUrl: req.file ? `uploads/users/${userId}${ext}` : undefined,
        hasPaid: hasPaid ? (hasPaid === "true" ? true : false) : undefined,
      },
    });
    return res
      .status(200)
      .json({ message: "User changes updated succesfully.", user });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      message: "Failed to update user. Please try again. ",
      error: err,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteImage(id, "users");
    await prisma.trainee.delete({
      where: {
        userId: id,
      },
    });
    res.status(200).json({ message: "User deleted succesfully" });
  } catch (err) {
    // console.error(err.message);
    return res
      .status(200)
      .json({ message: "Failed to delete user", error: err });
  }
};

const updateRemainingDays = async () => {
  const users = await prisma.trainee.findMany();

  await Promise.all(
    users.map(async (user) => {
      if (user.remainingDays > 0) {
        await prisma.trainee.update({
          where: { id: user.id },
          data: { remainingDays: user.remainingDays - 1 },
        });
      }
    })
  );
};

export {
  getUser,
  getUsers,
  deleteUser,
  registerUster,
  updateUser,
  updateRemainingDays,
};
