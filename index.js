import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { sequelizeCrud } from "express-sequelize-crud";
import userRoutes from "./routers/users.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.use("/users", userRoutes);

app.get("/", (req, res) => {
  return res.json({ msg: "Mohasebe API up and running" });
});

mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(PORT, () => {
    console.log(`Mohasebe API is running https://localhost:${PORT}`);
  });
});
