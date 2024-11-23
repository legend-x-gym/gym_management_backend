import express from "express";
import { getOffer, getOffers } from "../controllers/offer";

const offerRouter = express.Router();

offerRouter.get("/list", getOffers);
offerRouter.post("/:id", getOffer);
offerRouter.post("/create",);

export default offerRouter;