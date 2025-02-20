import prisma from "../utils/prisma.js";
import { deleteImage, randomId } from "../utils/utils.js";
import bcrypt from "bcrypt";

const createAdmin = async (req, res) => {
  const { email, password, name, gymId } = req.body;
  const adminId = randomId();

  try {
    const user = await prisma.admin.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 10),
        name,
        adminId,
        gym: {
          connect: {
            gymId,
          },
        },
      },
    });

    return res.status(200).json({ message: "admin succesfully created", user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Failed to create admin. Please try again.",
      error: err.message,
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await prisma.admin.findFirst({
      where: {
        email,
      },
    });
    if (!admin)
      return res
        .status(404)
        .json({ message: "Incorrect email. Please try again." });
    const isMatch = bcrypt.compareSync(password, admin.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Incorrect password. Please try again." });
    return res.status(200).json({ message: "login successful", admin });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Failed to login. Please try again.",
      error: err,
    });
  }
};
const updateAccount = async (req, res) => {
  console.log(req.body);
  const { id: adminId } = req.params;
  const { email, currPass, newPass, name, ext } = req.body;

  req.file && (await deleteImage(adminId, "admins", ext));

  try {
    const updated = await prisma.admin.update({
      where: { adminId },
      data: {
        email,
        name,
        imgUrl: req.file ? `uploads/admins/${adminId}${ext}` : undefined,
      },
    });
    if (newPass) {
      const admin = await prisma.admin.findUnique({
        where: {
          adminId,
        },
      });
      if (!admin)
        return res.status(400).json({
          message: "No admin by the specified id.",
        });
      const isMatch = bcrypt.compareSync(currPass, admin.password);
      if (!isMatch)
        return res.status(400).json({
          message: "The current password is incorrect.",
        });
      const password = bcrypt.hashSync(newPass, 10);
      const updated = await prisma.admin.update({
        where: { adminId },
        data: {
          password,
        },
      });
      return res
        .status(200)
        .json({ message: "Password updated succesfully.", admin: updated });
    }
    return res
      .status(200)
      .json({ message: "Account updated succesfully.", admin: updated });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      message: "Failed to update account. Please try again.",
      error: err,
    });
  }
};

export { createAdmin, signIn, updateAccount };
