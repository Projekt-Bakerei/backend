import express from "express";
import {
  customers,
  addCustomer,
  editCustomer,
  deleteCustomer,
  addArtikel,
  addRechnung,
} from "../controlers/customers.js";

const router = express.Router();

// Customer Route
router.get("/", customers);
router.post("/addcustomer", addCustomer);
router.put("/editcustomer", editCustomer);
router.put("/editcustomer/:id", editCustomer);
router.delete("/deletecustomer", deleteCustomer);

// Add Rechnung
router.post("/rechnug/:customerId", addRechnung);

// Add Artikel
router.post("/artikel/:customerId", addArtikel);

export default router;
