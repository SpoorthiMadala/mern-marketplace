
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  type: String, // sale or rent
  phone: String,
  imageUrl: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export default mongoose.model("Product", productSchema);
