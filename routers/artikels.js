import express from "express";
import {
  artikels,
  addArtikel,
  editArtikel,
  deleteArtikel,
} from "../controlers/artikels.js";

const router = express.Router();

// Kustomer Route
router.get("/", artikels);
router.post("/addartikel", addArtikel);
router.put("/editartikel", editArtikel);
router.put("/editartikel/:id", editArtikel);
router.delete("/deleteartikel", deleteArtikel);

export default router;
