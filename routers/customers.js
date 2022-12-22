import express from "express";
import {
  customers,
  addCustomer,
  editCustomer,
  deleteCustomer,
} from "../controlers/customers.js";

const router = express.Router();

// Kustomer Route
router.get("/", customers);
router.post("/addcustomer", addCustomer);
router.put("/editcustomer", editCustomer);
router.put("/editcustomer/:id", editCustomer);
router.delete("/deletecustomer", deleteCustomer);

export default router;
