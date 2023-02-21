import { Customer, LieferscheinCustomer } from "../models/customer.js";

// Create Lieferschein
export const addLieferschein = async (req, res) => {
  try {
    //

    const token = req.headers.authorization;
    const idCustomer = req.body.id;
    let date = new Date(0);
    const lieferschein = [
      {
        lieferscheinNummer: req.body.lieferscheinNummer,
        lieferscheinDatum: req.body.lieferscheinDatum,
        leistungDatum: req.body.leistungDatum,
        lieferant: req.body.lieferant,
        lieferscheinArtikels: {
  
  inputArtikelName: req.body.inputArtikelNameIn,
  inputArtikelMenge: req.body.inputArtikelMengeIn,
  inputArtikelEinheit: req.body.inputArtikelEinheitIn,
  inputArtikelKisten: req.body.inputArtikelKistenIn,
      
 }
    },
    ];
    
 


    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: idCustomer },
      {
        $addToSet: {
          
          lieferscheins: { $each: lieferschein },
          //lieferscheinArtikels: [{type: Schema.Types.ObjectId}]
         // lieferscheins:  {$each: {lieferscheinArtikels} }
        },
      },
      {
        timestamps: { createdAt: true, updatedAt: true },
        new: true,
      }
    );
    res.json(updatedCustomer);
    console.log("ID:", idCustomer);
    console.log("Body:", req.body);
    console.log("Add artikel OK:", updatedCustomer);
  } catch (error) {
    //console.log("ID:", id);
    console.log("Body:", req.body);
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
