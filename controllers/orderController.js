import Order from "../models/orderModel.js"

export const createOrder = async(req, res) => {
    try{
        const { buyer, seller, products } = req.body

        const order =   new Order({buyer, seller, products })
        const savedOrder = await order.save()
        res.status(201).json({ status: 'success', order: savedOrder });
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getOrdersbyBuyer = async(req ,res) => {
    try{
        const { buyerId } = req.params
        const orders = await Order.find({ buyer: buyerId })
            .populate('buyer')
            .populate('seller')
            .populate('products.productId')
            .exec()

        res.status(200).json(orders);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const getOrdersbySeller = async(req, res) => {
    try{
        const{ sellerId } = req.params
        const orders = await Order.find({ seller: sellerId})
            .populate('buyer')
            .populate('seller')
            .populate('products.productId')
            .exec()

        res.status(200).json(orders)
    } catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

