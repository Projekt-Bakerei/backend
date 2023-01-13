import mongoose from "mongoose";

const artikelSchema = new mongoose.Schema({
  NewartikelName: { type: String },
  NewartikelPrice: { type: String },
  NewartikelBeschreibung: {  type: String },
  NewartikelRabat: {  type: String },
  NewartikelKodu: {  type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret){
        ret.id = ret._id
        delete ret._id
      }
    }
  }
  );

export const AddArtikel = mongoose.model("Artikel", artikelSchema, "artikels");
//Comment
//Comment2