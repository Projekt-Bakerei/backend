import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
 
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
    transform(doc, ret){
      ret.id = ret._id
      delete ret._id
    }
  }
})

export const Customer = mongoose.model("Customer", customerSchema, "customers");
