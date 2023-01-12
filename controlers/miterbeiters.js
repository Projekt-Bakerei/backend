import { Miterbeiter } from "../models/Miterbeiter.js";
import jwt from "jsonwebtoken";

//get Miterbeiters
export const miterbeiters = async (req, res) => {
  try {
    const miterbeiters = await Miterbeiter.find().exec();
    res.json(miterbeiters);
  } catch (error) {
    res.status(500).json({ error: "server hatasi" });
  }
};

// Add Miterbeiter
export const addMiterbeiter = async (req, res) => {
    try {
      const { 
        mName,
        mAdres,
        tel,
        position,
        extern,
        kenzeichen,
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
      const miterbeiter = new Miterbeiter({
        mName,
        mAdres,
        tel,
        position,
        extern,
        kenzeichen,
      });
  
      await miterbeiter.save();
      return res.json({ msg: "ok" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "server error" });
    }
  };
  
  // Edit Miterbeiterr
export const editMiterbeiter = async (req, res) => {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({ error: "giris yap" });
      }
      const {
        mName,
        mAdres,
        tel,
        position,
        extern,
        kenzeichen,
      } = req.body;
  
      const newMiterbeiter = new Miterbeiter({
        mName,
        mAdres,
        tel,
        position,
        extern,
        kenzeichen,
      });
  
      const responce = await newMiterbeiter.save();
      res.json(responce);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "server hatasi" });
    }
  };


// Delete Miterbeiter
export const deleteMiterbeiter = async (req, res) => {
    try {
      const miterbeiters = await Miterbeiter.findByIdAndDelete(
        req.params.miterbeiterId
      ).exec();
      res.json(miterbeiters);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "server hatasi" });
    }
  };
  