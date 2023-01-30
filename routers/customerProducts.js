import express from "express";

import {
  addProduct,
  delProduct,
} from "../controlers/customerProducts.js"
import { getCustomer } from "../controlers/customers.js";

const router = express.Router();

// Customer Products Route
router.get("/", getCustomer);

router.post("/addproduct/:id", addProduct);
router.delete("/deleteproduct/:customerId/:artikelsId", delProduct);


export default router;