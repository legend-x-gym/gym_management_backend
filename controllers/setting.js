import prisma from "../utils/prisma.js";
import { randomId } from "../utils/utils.js";

const getSettings = async (req, res) => {
  try {
    const settings = await prisma.gymSetting.findMany();
    res.status(200).json({ message: "ok", settings });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to fetch settings", error: err });
  }
};

const setSetting = async (req, res) => {
  const { key, value, id, gymId } = req.body;
  console.log(req.body);
  if (!value)
    return res.status(400).json({ message: "Value is not specified." });
  const settingId = id || randomId();
  try {
    const setting = await prisma.gymSetting.upsert({
      where: {
        key,
      },
      update: {
        value: parseInt(value),
      },
      create: {
        settingId,
        key,
        value: parseInt(value),
        gym: { connect: { gymId } },
      },
    });
    res
      .status(200)
      .json({ message: "Space setting succesfully set.", setting });
  } catch (err) {
    console.error(err.messsage);
    res.status(500).json({ message: "Failed to set total space", error: err });
  }
};

const deleteSetting = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.gymSetting.delete({
      where: {
        settingId: id,
      },
    });
    res.status(200).json({ message: "Setting deleted succesfully" });
  } catch (err) {
    console.error(err.message);
    res.status(200).json({ message: "Failed to delete setting", error: err });
  }
};

export { setSetting, getSettings, deleteSetting };
