import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photos: [String],
  reviews: {
    type: String,
  },
  rating: {
    type: Number,
  },
});
const Product = mongoose.model("Product", productSchema);

export default Product
