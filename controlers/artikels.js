import { AddArtikel } from "../models/Artikel.js";
import jwt from "jsonwebtoken";

//get Artikels
export const GetNewArtikels = async (req, res) => {
  try {
    const GetArtikels = await AddArtikel.find().exec();
    res.json(GetArtikels);
  } catch (error) {
    res.status(500).json({ error: "server hatasi" });
  }
};

// Add Artikel
export const addNewArtikel = async (req, res) => {
  try {
    const {
      NewartikelName,
      NewartikelPrice,
      NewartikelBeschreibung,
      NewartikelRabat,
      NewartikelKodu,
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
    const Newartikel = new AddArtikel({
      NewartikelName,
      NewartikelPrice,
      NewartikelBeschreibung,
      NewartikelRabat,
      NewartikelKodu,
    });

    await Newartikel.save();
    return res.json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" });
  }
};

// Edit Artikel
export const editNewArtikel = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "giris yap" });
    }
    const {
      NewartikelName,
      NewartikelPrice,
      NewartikelBeschreibung,
      NewartikelRabat,
      NewartikelKodu,
    } = req.body;

    const newArtikel = new Artikel({
      NewartikelName,
      NewartikelPrice,
      NewartikelBeschreibung,
      NewartikelRabat,
      NewartikelKodu,
    });

    const responce = await newArtikel.save();
    res.json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server hatasi" });
  }
};

// Delete Artikel

export const deleteNewArtikel = async (req, res) => {
  const {id} = req.params
  try {
    const artikels = await AddArtikel.findByIdAndDelete(
      id
    ).exec();
    res.json(artikels);

    console.log("Miterbeiter Delete OK!", id);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "server error" });
  }
};
