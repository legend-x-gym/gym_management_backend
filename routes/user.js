import { Router } from "express";
import multer from "multer";
import path from "path";

import {
  deleteUser,
  getUser,
  getUsers,
  registerUster,
  updateUser,
} from "../controllers/user.js";

import { randomId } from "../utils/utils.js";

const userRouter = Router();

const storage = multer.diskStorage({
  destination: (_, file, cb) => cb(null, "uploads/users"),
  filename: (req, file, cb) => {
    const id = req.params.id || randomId();
    const ext = path.extname(file.originalname);
    if (!req.params.id) req.body.id = id;
    req.body.ext = ext;
    cb(null, id + ext);
  },
});

const upload = multer({ storage: storage });

userRouter.post("/create", upload.single("image"), registerUster);
userRouter.get("/list", getUsers);
userRouter.get("/:id", getUser);
userRouter.patch("/:id", upload.single("image"), updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
