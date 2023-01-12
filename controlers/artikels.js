import { Artikel } from "../models/Artikel.js";
import jwt from "jsonwebtoken";

//get Artikels
export const artikels = async (req, res) => {
  try {
    const artikels = await Artikel.find().exec();
    res.json(artikels);
  } catch (error) {
    res.status(500).json({ error: "server hatasi" });
  }
};

// Add Artikel
export const addArtikel = async (req, res) => {
  try {
    const {
      artikelName,
      artikelPrice,
      artikelBeschreibung,
      artikelRabat,
      artikelKodu,
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
    const artikel = new Artikel({
      artikelName,
      artikelPrice,
      artikelBeschreibung,
      artikelRabat,
      artikelKodu,
    });

    await artikel.save();
    return res.json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

// Edit Artikel
export const editArtikel = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "giris yap" });
    }
    const {
      artikelName,
      artikelPrice,
      artikelBeschreibung,
      artikelRabat,
      artikelKodu,
    } = req.body;

    const newArtikel = new Artikel({
      artikelName,
      artikelPrice,
      artikelBeschreibung,
      artikelRabat,
      artikelKodu,
    });

    const responce = await newArtikel.save();
    res.json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server hatasi" });
  }
};

// Delete Artikel
export const deleteArtikel = async (req, res) => {
  try {
    const artikels = await Artikel.findByIdAndDelete(
      req.params.artikelId
    ).exec();
    res.json(artikels);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server hatasi" });
  }
};
