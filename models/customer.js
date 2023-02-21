import mongoose from "mongoose";
const { Schema, model } = mongoose;
// Empfänger Schema
// const FirmaLieferscheinSchema = new Schema(
//   {
//     LieferFirmaKundenNummer: String,
//     LiefertFirma: String,
//     LiefertFirmaAdresse: String,
//     LiefertFirmaKontakt: String,
//     LiefertFirmaKontaktPerson: String,
//     LieferscheinNummer: String,
//     LieferscheinDatum: String,
//     LieferscheinZeitrum: String,
//   },
//   {
//     Produckt:[{
//       artikelKodu: String,
//       artikelName: String,
//       artikelMenge: Number,
//       artikelZutaten: String,
//       artikelKistenzahl: Number,
//     }],
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//     id: true,
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//       },
//     },
//   }
// );

// const FirmaRechnungSchema = new Schema(
//   {
//     artikelRe: [{
//     firmenName: String,
//     firmenAdresse: String,
//     firmenStadt: String,
//     ansprechpartner: String,
//     rechnungsNummer: Number,
//     myFirma: String,
//   }]
// },
//   {
//     timestamps: true,
//     versionKey: false,
//     id: true,
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//       },
//     },
//   }
// );

// const ArtickelCustomerSchema = new Schema(
//   {
//     artikelName: String,
//     artikelPrice: String,
//     artikelBeschreibung: String,
//     artikelKodu: String,
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//     id: true,
//     toJSON: {
//       transform(doc, ret) {
//         ret.id = ret._id;
//         delete ret._id;
//       },
//     },
//   },
// );

const ArtikelCustomerSchema = new mongoose.Schema(
  {
    artikelName: String,
    artikelPrice: Number,
    artikelBeschreibung: String,
    artikelKodu: Number,
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
export const ArtikelCustomer = mongoose.model(
  "ArtikelCustomer",
  ArtikelCustomerSchema,
  "customers"
);

const LieferscheinCustomerSchema = new mongoose.Schema(
  {
    lieferscheinNummer: String,
    lieferscheinDatum: String,
    leistungDatum: String,
    lieferant: String,
  },
  {
    lieferscheinArtikels: 
      [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Lieferschein',
        inputArtikelName: String,
        inputArtikelMenge: String,
        inputArtikelEinheit: String,
        inputArtikelKisten: String,
      }],
  },
  {
    // timestamps: true,
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
export const LieferscheinCustomer = mongoose.model(
  "LieferscheinCustomer",
  LieferscheinCustomerSchema,
  "customers"
);

const customerSchema = new mongoose.Schema(
  {
    artikels: [ArtikelCustomerSchema],
    // lieferscheins: [
    //   {
    //     lieferscheinNummer: String,
    //     lieferscheinDatum: String,
    //     leistungDatum: String,
    //     lieferant: String,
    //   },
    //   {
    //         lieferscheinArtikels: [
    //           {
    //             inputArtikelName: String,
    //             inputArtikelMenge: String,
    //             inputArtikelEinheit: String,
    //             inputArtikelKisten: String,
    //           },
    //         ],
    //       },
    // ],
     lieferscheins: [LieferscheinCustomerSchema],
    // artikels: [
    //   {
    //     artikelName: String,
    //     artikelPrice: Number,
    //     artikelBeschreibung: String,
    //     artikelKodu: Number,
    //   },
    // ],

    kodu: {
      type: String,
      trim: true,
      required: false,
      maxlength: 20,
    },
    passiv: {
      type: String,
      trim: true,
      required: false,
    },
    hitab: {
      type: String,
      required: false,
      maxlength: 20000,
    },
    kategory: {
      type: String,
      trim: true,
      required: false,
      maxlength: 32,
    },
    ismi: {
      type: String,
      required: false,
      maxlength: 32,
      trim: true,
    },
    kdv: {
      type: String,
      required: false,
      maxlength: 32,
      trim: true,
    },
    kisi: {
      type: String,
      required: false,
      maxlength: 32,
      trim: true,
    },
    sekli: {
      type: String,
      required: false,
      maxlength: 32,
      trim: true,
    },
    cadde: {
      type: String,
      required: false,
      maxlength: 32,
      trim: true,
    },
    plz: {
      type: Number,
      required: false,
      maxlength: 5,
      trim: true,
    },
    yer: {
      type: String,
      required: false,
      maxlength: 32,
      trim: true,
    },
    telefon: {
      type: String,
      required: false,
      maxlength: 32,
      trim: true,
    },
    mobil: {
      type: String,
      required: false,
      maxlength: 32,
      trim: true,
    },
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

export const Customer = mongoose.model("Customer", customerSchema, "customers");
