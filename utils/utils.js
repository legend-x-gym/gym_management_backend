import ShortUniqueId from "short-unique-id";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const uid = new ShortUniqueId();
const randomId = (len = 10) => uid.rnd(len);

const deleteImage = async (fileName, subdir, exception) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const uploadsDir = path.join(
      path.join(__dirname, ".."),
      `uploads/${subdir}`
    );
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

export { randomId, deleteImage };
