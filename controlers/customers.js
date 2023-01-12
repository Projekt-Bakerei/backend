
import { Customer } from "../models/customer.js";
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
      mobil
     } = req.body;
     const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization || req.token || req.header('token') || req.headers.authorization.split(' ')[1];
     console.log("Token:",token)
         if (!token) {
           return res.status(403).send("A token is required for authentication");
         }
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
         
         if (!decoded) {
            return res.status(401).json({ error:  error.message });
         }
         console.log("Decoded:",decoded)
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


// export const addCustomer = async (req, res) => {
    
//     try {
//       const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.headers.authorization;
//     if (!token) {
//       return res.status(403).send("A token is required for authentication");
//     }
//      const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     if (decoded.user !==0 ) {
//        return res.status(401).json({ error:  error.message });
//     }
//     const {
//       kodu,
//       passiv,
//       hitab,
//       kategory,
//       ismi,
//       kdv,
//       kisi,
//       sekli,
//       cadde,
//       plz,
//       yer,
//       telefon,
//       mobil,
//     } = req.body;
//     console.log("Frontend kommt:",req.body);
//     const newCustomer = new Customer({
//       kodu,
//       passiv,
//       hitab,
//       kategory,
//       ismi,
//       kdv,
//       kisi,
//       sekli,
//       cadde,
//       plz,
//       yer,
//       telefon,
//       mobil,
//     });
//     newCustomer = await newCustomer.save();

//      res.send(newCustomer);
//     return res.json({ msg: "ok" });
//   } catch (error) {
    
//     console.log("AddCustomer:", req.body.token);
//     return res.status(500).json({ error:  error.message });
//   }
// };

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