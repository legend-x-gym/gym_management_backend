import express from "express";
import { listOfNotifications } from "../controllers/notification.js";

const notification = express.Router();

notification.get("/:gymId", listOfNotifications);

export default notification;
