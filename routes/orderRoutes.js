import express from 'express';
const router = express.Router()
import {createOrder, getOrdersbyBuyer, getOrdersbySeller} from '../controllers/orderController.js'

//Create Order 
router.post('/createOrder', createOrder)

//Get order by buyer
router.get('/byBuyer/:buyerId', getOrdersbyBuyer)

//Get order by seller/farmer
router.get('/orders/bySeller/:sellerId', getOrdersbySeller)

export default router;