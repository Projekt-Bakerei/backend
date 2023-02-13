import express from "express";
import {
  customers,
  addCustomer,
  editCustomer,
  deleteCustomer,
  addRechnung,
  getCustomer,
 
} from "../controlers/customers.js";


const router = express.Router();

// Customer Route
router.get("/", customers);
// router.get("/customer/:id", customers)
// router.get('/customer/:id', function(req, res) {
//   customers.findById( req.customers);
//   res.send(customers);
// });
router.get("/customer/:id", getCustomer);
router.post("/addcustomer", addCustomer);
router.put("/editcustomer", editCustomer);
router.put("/editcustomer/:id", editCustomer);
router.delete("/deletecustomer/:id", deleteCustomer);


// Add Rechnung
router.post("/rechnug/:customerId", addRechnung);

export default router;
