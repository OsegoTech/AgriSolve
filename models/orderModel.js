import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: {type: Number, required: true}
})

const orderSchema = mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    products: [productSchema]
})


const Order = mongoose.model("Order", orderSchema);

export default Order;
