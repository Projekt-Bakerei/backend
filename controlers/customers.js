import { Customer } from "../models/customer.js";
import jwt from "jsonwebtoken";

// Get Customers
export const customers = async (req, res) => {
  try {
    const customers = await Customer.find().exec();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "server hatasi" });
  }
};

// Add Customers
export const addCustomer = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "giris yap" });
    }

    const {
      kodu,
      passiv,
      active,
      hitab,
      kategory,
      ismi,
      kdv,
      kisi,
      sekli,
      cadde,
      plz,
      yer,
      telefon,
      mobil,
    } = res.body;

    const newCustomer = new Customer({
      kodu,
      passiv,
      active,
      hitab,
      kategory,
      ismi,
      kdv,
      kisi,
      sekli,
      cadde,
      plz,
      yer,
      telefon,
      mobil,
    });
    const responce = await newCustomer.save();

    res.json(responce);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server hatasi" });
  }
};

// Edit Customer
export const editCustomer = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "giris yap" });
    }
    const {
      kodu,
      passiv,
      active,
      hitab,
      kategory,
      ismi,
      kdv,
      kisi,
      sekli,
      cadde,
      plz,
      yer,
      telefon,
      mobil,
    } = req.body;

    const newCustomer = new Customer({
      kodu,
      passiv,
      active,
      hitab,
      kategory,
      ismi,
      kdv,
      kisi,
      sekli,
      cadde,
      plz,
      yer,
      telefon,
      mobil,
    });

    const responce = await newCustomer.save();
    res.json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server hatasi" });
  }
};

// Delete Customer
export const deleteCustomer = async (req, res) => {
  try {
    const customers = await Customer.findByIdAndDelete(
      req.params.customerId
    ).exec();
    res.json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server hatasi" });
  }
};
