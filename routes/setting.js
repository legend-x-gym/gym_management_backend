import { Router } from "express";
import {
  deleteSetting,
  getSettings,
  setSetting,
} from "../controllers/setting.js";

const settingRouter = Router();

settingRouter.post("/create", setSetting);

settingRouter.get("/list", getSettings);

settingRouter.delete("/:id", deleteSetting);

export default settingRouter;
