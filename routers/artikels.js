import express from "express";
import {
  GetNewArtikels,
  //AddArtikel,
  editNewArtikel,
  deleteNewArtikel,
  addNewArtikel,
} from "../controlers/artikels.js";

const router = express.Router();

// Kustomer Route
router.get("/", GetNewArtikels);
router.post("/addartikel", addNewArtikel);
router.put("/editartikel", editNewArtikel);
router.put("/editartikel/:id", editNewArtikel);
router.delete("/deleteartikel", deleteNewArtikel);

export default router;
