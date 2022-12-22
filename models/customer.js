import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  kodu: { type: String },
  passiv: { type: String, required: true, trim: true },
  active: { type: Boolean },
  hitab: { type: String },
  kategory: { type: String },
  ismi: { type: String },
  kdv: { type: String },
  kisi: { type: String },
  sekli: { type: String },
  cadde: { type: String },
  plz: { type: Number },
  yer: { type: String },
  telefon: { type: Number },
  mobil: { type: Number },
});

export const Custoemr = mongoose.model("Customer", customerSchema, "customers");
