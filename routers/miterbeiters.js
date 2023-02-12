import express from "express";
import {
  miterbeiters,
  addMiterbeiter,
  editMiterbeiter,
  deleteMiterbeiter,
  fahrern,
  addFahrer,
  editFahrer,
  deleteFahrer,
} from "../controlers/miterbeiters.js";

const router = express.Router();

// Miterbeiter Route
router.get("/", miterbeiters);
router.post("/addmiterbeiter", addMiterbeiter);
router.put("/editmiterbeiter", editMiterbeiter);
router.put("/editmiterbeiter/:id", editMiterbeiter);
router.delete("/deletemiterbeiter/:id", deleteMiterbeiter);
router.get("/fahrern", fahrern);
router.post("/addfahrer", addFahrer);
router.put("/editfahrer/:id", editFahrer);
router.delete("/delfahrer/:id", deleteFahrer);

export default router;
