import { Router } from "express";

import { createAdmin } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/create", createAdmin);
// authRouter.patch("/:id");
// authRouter.delete("/:id");

createAdmin({
  body: {
    email: "johnnymessay@gmail.com",
    password: "1213121",
    name: "Johnny",
  },
});

export default authRouter;
