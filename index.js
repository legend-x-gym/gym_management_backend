import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import user from "./routes/user.js";
import offer from "./routes/offer.js";
import setting from "./routes/setting.js";
import auth from "./routes/auth.js";

import gym from "./routes/gym.js";

config();

const PORT = process.env.PORT || 4000;
const app = express();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/offer", offer);
app.use("/setting", setting);
app.use("/auth", auth);
app.use("/gym", gym);

app.get("/", (req, res) => {
  res.send("legend x gym managment.");
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
