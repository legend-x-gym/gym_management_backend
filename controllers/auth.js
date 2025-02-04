import prisma from "../utils/prisma.js";
import { randomId } from "../utils/utils.js";
import bcrypt from "bcrypt";

const createAdmin = async (req, res) => {
  const { email, password, name } = req.body;
  const adminId = randomId();

  try {
    const user = await prisma.admin.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 10),
        name,
        adminId,
      },
    });

    res.status(200).json({ message: "admin succesfully created", user });
  } catch (err) {
    res.status(500).json({
      message: "Failed to create admin. Please try again.",
      error: err,
    });
  }
};

const signIn = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const user = await prisma.admin.findFirst({
      where: {
        OR: [{ email: identifier }, { name: identifier }],
      },
    });
    if (!user)
      return res
        .status(404)
        .json({ message: "Invalid user name or email. Please try again." });
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Incorrect password. Please try again." });
    res.status(200).json({ message: "login successful", user });
  } catch (err) {
    res.status(500).json({
      message: "Failed to login. Please try again.",
      error: err,
    });
  }
};
const updateAccount = async (req, res) => {
  const { id: adminId } = req.params;
  const { email, password, name } = req.body;

  try {
    const user = await prisma.admin.update({
      where: { adminId },
      data: {
        email,
        password,
        name,
      },
    });
    res.status(200).json({ message: "Account updated", user });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update account. Please try again.",
      error: err,
    });
  }
};

export { createAdmin, signIn, updateAccount };
