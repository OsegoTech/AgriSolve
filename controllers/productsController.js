import Product from "../models/productsModel.js";
import asyncHandler from "express-async-handler";


export const createProduct = asyncHandler(async (req, res, next) => {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
    next();
});

export const getProducts = asyncHandler(async (req, res, next) => {
    const products = await Product.find({});
    res.json(products);
    next();
});

export const getProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
    next();
});

export const updateProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.title = req.body.title || product.title;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.photos = req.body.photos || product.photos;
        product.reviews = req.body.reviews || product.reviews;
        product.rating = req.body.rating || product.rating;
        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
    next();
});


export const deleteProduct = asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        await product.remove();
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
    next();
});