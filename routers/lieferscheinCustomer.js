import express from "express";

import {
  addLieferschein,
} from "../controlers/customerLieferschein.js"
import { getCustomer } from "../controlers/customers.js";

const router = express.Router();

// Customer Products Route
router.get("/", getCustomer);

router.post("/addlieferschein/:id", addLieferschein);
//router.delete("/deleteproduct/:customerId/:artikelsId", delProduct);


export default router;