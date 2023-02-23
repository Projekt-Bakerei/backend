import { Customer } from "../models/customer.js";

// Create Lieferschein
export const addLieferschein = async (req, res) => {
  try {
    // const token = req.headers.authorization;
    const idCustomer = req.body.id;
    let date = new Date(0);
    let data = req.body.lieferscheinArtikels;
    const lieferscheins = [
      {
        lieferscheinNummer: req.body.lieferscheinNummer,
        lieferscheinDatum: req.body.lieferscheinDatum,
        leistungDatum: req.body.leistungDatum,
        lieferant: req.body.lieferant,
        lieferscheinArtikelsDb: data,
        //  inputArtikelName: inputArtikelNameIn,
        //  inputArtikelMenge: inputArtikelMengeIn,
        // inputArtikelEinheit: inputArtikelEinheitIn,
        //  inputArtikelKisten: inputArtikelKistenIn,
      },
    ];

    const updatedCustomer = await Customer.findByIdAndUpdate(
      {
        _id: idCustomer,
      },
      {
        $addToSet: { lieferscheins: { $each: lieferscheins } },
      },
      {
        timestamps: { createdAt: true, updatedAt: true },
        rawResult: true,
        upsert: true,
        new: true,
      }
    );
    res.json(updatedCustomer);
    console.log("ID:", idCustomer);
    console.log(
      "Body:",
      req.body,
      "Lieferschein: ",
      lieferscheins,
      // "lieferscheinArtikels: ", lieferscheinArtikels
      " Lenght: %s",
      data
    );
    console.log("Add artikel OK:", updatedCustomer);
  } catch (error) {
    //console.log("ID:", id);
    console.log("Error Body:", req.body);
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
