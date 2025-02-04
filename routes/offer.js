import { Router } from "express";
import {
  createOffer,
  deleteOffer,
  getOffers,
  getoOffer,
  updateOffer,
} from "../controllers/offer.js";
import multer from "multer";
import { randomId } from "../utils/utils.js";
import path from "path";

const offerRouter = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/offers"),
  filename: (req, file, cb) => {
    const id = req.params.id || randomId();
    const ext = path.extname(file.originalname);
    req.body.id = id;
    req.body.ext = ext;
    cb(null, id + ext);
  },
});

const upload = multer({ storage });

offerRouter.get("/list", getOffers);
offerRouter.get("/:id", getoOffer);

offerRouter.post("/create", upload.single("image"), createOffer);

offerRouter.patch("/:id", upload.single("image"), updateOffer);

offerRouter.delete("/:id", deleteOffer);

export default offerRouter;
