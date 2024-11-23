import prisma from "../utils/prisma";

const getSettings = async (req, res) => {
  try {
    const setting = await prisma.setting.findMany();
    res.status.json({ setting });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ messsage: "Failed to fetch settings", error: err });
  }
};

const setSettings = async (req, res) => {
  const { totalSpace } = req.body;
  try {
    const setting = await prisma.setting.update({
      data: {
        totalSpace,
      },
    });
    res.status.json({ setting });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ messsage: "Failed to fetch settings", error: err });
  }
};

const setSpace = async (req, res) => {
  const { totalSpace } = req.body;
  try {
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to set settings.", error: err });
  }
};

export { getSettings, setSettings };
