import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true
  },
  availability: {
    type: Number,
    required: true
  },
  category: {
    type: Number,
  }
});
const Product = mongoose.model("Product", productSchema);

export default Product