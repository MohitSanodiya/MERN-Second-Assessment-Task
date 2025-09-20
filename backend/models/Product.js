import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, text: true },
    description: { type: String, text: true },
    price: { type: Number, required: true },
    category: { type: String },
    countInStock: { type: Number, required: true, default: 0 },
    image: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
