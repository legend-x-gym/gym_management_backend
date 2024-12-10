import express from "express";
import {
  deleteSetting,
  getSettings,
  setSetting,
} from "../controllers/setting.js";

const settingRouter = express.Router();

settingRouter.post("/create", setSetting);

settingRouter.get("/list", getSettings);

settingRouter.delete("/:id", deleteSetting);

export default settingRouter;
