import mongoose from "mongoose";

const miterbeiterSchema = new mongoose.Schema({
  mName: { type: String },
  mAdres: { type: String },
  tel: {  type: String },
  position: {  type: String },
  extern: {  type: String },
  kenzeichen: {  type: String },
  timestamps: true,
  });

export const Miterbeiter = mongoose.model("Miterbeiter", miterbeiterSchema, "miterbeiters");
