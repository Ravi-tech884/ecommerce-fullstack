import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  image: { type: String, default: "https://via.placeholder.com/600x400?text=Product" },
  category: { type: String, required: true },
  countInStock: { type: Number, default: 0, min: 0 },
  rating: { type: Number, default: 0, min: 0, max: 5 }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
