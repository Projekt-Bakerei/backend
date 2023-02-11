import { LieferscheinNummer } from "../models/LieferscheinNummer.js";
import jwt from "jsonwebtoken";


//get LieferscheinNummer
export const lieferscheinNummer = async (req, res) => {
  try {
    const lieferschein = await LieferscheinNummer.find().exec();
    res.json(lieferschein);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add LieferschinsNummer
export const addLieferscheinNummer = async (req, res) => {
  try {
    const { 
      lieferscheinNummerNew,
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
    const lieferscheinNummer = new LieferscheinNummer({
      lieferscheinNummerNew,
    });

    await lieferscheinNummer.save();
    return res.json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};
