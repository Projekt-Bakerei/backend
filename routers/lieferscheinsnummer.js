import express from "express";
import {
  lieferscheinNummer,
  addLieferscheinNummer,
  //editLieferscheinNummer,
  //deleteLieferscheinNummer,
} from "../controlers/lieferscheinNummer.js";

const router = express.Router();

// LieferscheinNummer Route
router.get("/", lieferscheinNummer);
router.post("/addnummer", addLieferscheinNummer);
//router.put("/editnummer", editLieferscheinNummer);
//router.put("/editnummer/:id", editLieferscheinNummer);
//router.delete("/delnummer", deleteLieferscheinNummer);

export default router;