import { Customer } from "../models/customer.js";
import {ArtikelCustomer} from "../models/customer.js"



// Create Artikel
export const addProduct = async (req, res) => {
  try {
    //

    const token = req.headers.authorization;

    const {
      artikelNameCu,
      artikelPriceCu,
      artikelBeschreibungCu,
      artikelKoduCu,
      customerId,
    } = req.body;
    let idCustomer = customerId;
    let date = new Date(0);
    let artikels = [
      {
        artikelName: artikelNameCu,
        artikelPrice: artikelPriceCu,
        artikelBeschreibung: artikelBeschreibungCu,
        artikelKodu: artikelKoduCu,
      },
    ];

    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: idCustomer },
      {
        $addToSet: { artikels: { $each: artikels } },
      },
      {
        timestamps: { createdAt: true, updatedAt: false },
        new: true,
      }
    );
    res.json(updatedCustomer);
    console.log("ID:", idCustomer);
    console.log("Body:", req.body);
    console.log("Add artikel OK:", updatedCustomer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
// Delete Product
// export const delProduct = async (req, res) => {
//   try {
//     const products = await ArtikelCustomer.findByIdAndDelete(req.params.artikelsId).exec();
//     res.json(products);
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ error: "server error" });
//   }
// };

export const delProduct = async (req, res) => {
   try {
    const { customerId, artikelsId } = req.params;
    console.log("CustomerId:", customerId);
  const product = await Customer.findById(customerId);
  
  console.log("ProductId:", artikelsId);
  product.artikels.remove(artikelsId);
  await product.save();

  res.send({ message: "Removed successfully" });
  console.log("Delete Artikel OK!");
 
} catch (err) {
  console.log("Error:", err.message);
    return res.status(500).send({ message: err.message });
}
};
