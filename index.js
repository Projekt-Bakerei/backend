import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import { sequelizeCrud } from "express-sequelize-crud";
import userRoutes from "./routers/users.js";
import customerRoutes from "./routers/customers.js";
import miterbeiterRoutes from "./routers/miterbeiters.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/miterbeiters", miterbeiterRoutes);

app.get("/", (req, res) => {
  return res.json({ msg: "Mohasebe API up and running" });
});

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_CONNECTION).then(() => {
  app.listen(PORT, () => {
    console.log(`Mohasebe API is running http://localhost:${PORT}`);
  });
});
