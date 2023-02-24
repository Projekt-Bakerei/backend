import mongoose from "mongoose";

const LieferscheinNummerSchema = new mongoose.Schema(
  {
    lieferscheinNummerNew: {
      type: String,
      trim: true,
      required: false,
      maxlength: 20,
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

export const LieferscheinNummer = mongoose.model("LieferscheinNummer", LieferscheinNummerSchema, "lieferscheinNummer");