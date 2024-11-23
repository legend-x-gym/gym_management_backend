import express from "express";
import { getSettings, setSettings } from "../controllers/setting";

const settingRouter = express.Router();

settingRouter.route("/get", getSettings);
settingRouter.route("/set", setSettings);
