import express from "express";

import {
  createGym,
  getGyms,
  getGym,
  deleteGym,
} from "../controllers/gym.js";

const router = express.Router();

router.post("/create", createGym);
router.get("/", getGyms);
router.get("/:id", getGym);
router.delete("/:id", deleteGym);

export default router;
