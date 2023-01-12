import mongoose from "mongoose";

const artikelSchema = new mongoose.Schema({
  artikelName: { type: String },
  artikelPrice: { type: String },
  artikelBeschreibung: {  type: String },
  artikelRabat: {  type: String },
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

export const Artikel = mongoose.model("Artikel", artikelSchema, "artikels");
