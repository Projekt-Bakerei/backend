import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser"
// import { sequelizeCrud } from "express-sequelize-crud";
import userRoutes from "./routers/users.js";
import customerRoutes from "./routers/customers.js";
import lieferscheinNummer from "./routers/lieferscheinsnummer.js";
import miterbeiterRoutes from "./routers/miterbeiters.js";
import artikelRoutes from "./routers/artikels.js";
import customerProducts from "./routers/customerProducts.js"
import addProduct from "./routers/customerProducts.js"
import delProduct from "./routers/customerProducts.js";
import  addLieferschein  from "./routers/lieferscheinCustomer.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const PORT = process.env.PORT || 8080;


app.use("/users", userRoutes);
app.use("/customers", customerRoutes);
app.use("/lieferscheinsnummer", lieferscheinNummer);
app.use("/miterbeiters", miterbeiterRoutes);
app.use("/newartikels", artikelRoutes);
app.use("/customerproducts", customerProducts);
app.use("/customerproduct", addProduct);
app.use("/delproduct", delProduct);
app.use("/customerlieferschein", addLieferschein);


app.get("/", (req, res) => {
  return res.json({ msg: "Lexware API up and running" });
});

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_CONNECTION,{ useNewUrlParser: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Lexware API is running: ${PORT}`);
  });
});
