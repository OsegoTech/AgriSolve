import mongoose from "mongoose";

const cartItems = mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const CartItems = mongoose.model("CartItems", cartItems);

export default CartItems;
