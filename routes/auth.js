import { Router } from "express";
import multer from "multer";
import path from "path";

import { createAdmin, signIn, updateAccount } from "../controllers/auth.js";
import { randomId } from "../utils/utils.js";

const authRouter = Router();

const storage = multer.diskStorage({
  destination: (_, file, cb) => cb(null, "uploads/admins"),
  filename: (req, file, cb) => {
    const id = req.params.id || randomId();
    const ext = path.extname(file.originalname);
    if (!req.params.id) req.body.id = id;
    req.body.ext = ext;
    cb(null, id + ext);
  },
});

const upload = multer({ storage: storage });

authRouter.post("/create", createAdmin);
authRouter.post("/login", signIn);
authRouter.patch("/:id", upload.single("image"), updateAccount);

export default authRouter;
