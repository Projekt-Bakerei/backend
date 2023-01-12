import express from "express";
import {
  miterbeiters,
  addMiterbeiter,
  editMiterbeiter,
  deleteMiterbeiter,
} from "../controlers/miterbeiters.js";

const router = express.Router();

// Miterbeiter Route
router.get("/", miterbeiters);
router.post("/addmiterbeiter", addMiterbeiter);
router.put("/editmiterbeiter", editMiterbeiter);
router.put("/editmiterbeiter/:id", editMiterbeiter);
router.delete("/delete", deleteMiterbeiter);

export default router;
