import { Customer } from "../models/customer.js";
import {ArtikelCustomer} from "../models/customer.js"
import jwt from "jsonwebtoken";

// Get Customers
export const customers = async (req, res) => {
  try {
    const customers = await Customer.find().exec();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const customers = await Customer.findById(req.params.id);
    res.send(customers);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

// Add Customers

export const addCustomer = async (req, res) => {
  try {
    const {
      kodu,
      passiv,
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
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["x-access-token"] ||
      req.headers.authorization ||
      req.token ||
      req.header("token") ||
      req.headers.authorization.split(" ")[1];
    console.log("Token:", token);
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ error: error.message });
    }
    console.log("Decoded:", decoded);
    const customer = new Customer({
      kodu,
      passiv,
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

    await customer.save();
    return res.json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
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
  const {id} = req.params
  try {
    const customer = await Customer.findByIdAndDelete(
      id
    ).exec();
    res.json(customer);

    console.log("Customer Delete OK!", id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};



// Create Rechnung
export const addRechnung = async (req, res) => {
  try {
    let id = req.params.id;

    const token = req.headers.authorization;

    const {
      firmenName,
      firmenAdresse,
      firmenStadt,
      ansperchpartner,
      rechnungsNummer,
      myFirma,
    } = req.body;

    let date = new Date(0);
    let rechnungs = [
      {
        firmenName: firmenName,
        firmenAdresse: firmenAdresse,
        firmenStadt: firmenStadt,
        rechnungsNummer: rechnungsNummer,
        ansperchpartner: ansperchpartner,
        myFirma: myFirma,
        createdAt: date,
        updatedAt: date,
        timestamp: timestamp,
      },
    ];

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: { rechnungs: { $each: rechnungs } },
        //: $setOnInsert: {updatedAt: new Date()},
      }
      // { timestamps: { createdAt: true, updatedAt: false }, new: true }
    );
    res.json(updatedCustomer);
    console.log("Add rechnung OK:", updatedCustomer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
