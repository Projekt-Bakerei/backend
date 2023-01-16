import mongoose from "mongoose";
// Empfänger Schema
const FirmaRechnungSchema = new mongoose.Schema(
  {
    firmenName: String,
    firmenAdresse: String,
    firmenStadt: String,
    ansprechpartner: String,
    rechnungsNummer: Number,
    myFirma: String,
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
export const FirmaRechnung = mongoose.model(
  "FirmaRechnung",
  FirmaRechnungSchema
);


const ArtickelSchema = new mongoose.Schema(
  {
    artikelName: { type: String },
    artikelPrice: { type: String },
    artikelBeschreibung: { type: String },
    artikelRabat: { type: String },
    artikelKodu: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
export const Artickel = mongoose.model(
  "Artickel",
  ArtickelSchema
);

const ArtickelCustomerSchema = new mongoose.Schema(
  {
    artikelName: { type: String },
    artikelPrice: { type: String },
    artikelBeschreibung: { type: String },
    artikelRabat: { type: String },
    artikelKodu: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
  ,
  {
    artickel: [Artickel],
  }
);
export const ArtickelCustomer = mongoose.model(
  "ArtickelCustomer",
  ArtickelCustomerSchema
);

const RechnungSchema = new mongoose.Schema(
  {
    rechnungsnummern: Number,
    kundennummer: Number,
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
  {
    firmato: [FirmaRechnungSchema],
  },
  {
    artickel: [ArtickelCustomer],
  }
);
export const Rechnung = mongoose.model("Rechnung", RechnungSchema);

const customerSchema = new mongoose.Schema(
  {
    kodu: { type: String },
    passiv: { type: String, trim: true, default: false },
    //passiv: { type: String },
    hitab: { type: String },
    kategory: { type: String },
    ismi: { type: String },
    kdv: { type: String },
    kisi: { type: String },
    sekli: { type: String },
    cadde: { type: String },
    plz: { type: Number },
    yer: { type: String },
    telefon: { type: String },
    mobil: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
    id: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  },
  {
    rechnung: [RechnungSchema],
  }
);

export const Customer = mongoose.model("Customer", customerSchema, "customers");
