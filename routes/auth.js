import { Router } from "express";

import { createAdmin, signIn, updateAccount } from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/create", createAdmin);
authRouter.post("/login", signIn);
authRouter.post("/update", updateAccount);


export default authRouter;
