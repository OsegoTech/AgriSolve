import Product from "../models/productsModel.js";

export const createProduct = async (req, res) => {
    const { name, price, description, availability, images, category } = req.body;

    try {
        const newProduct = new Product({
            name,
            price,
            description,
            availability,
            images,
            category,
        });
        await newProduct.save();
        res.status(200).json({ message: 'Product created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.json({ products: allProducts });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const { productId } = req.params;
        const foundProduct = await Product.findById(productId);

        // Check if the product was not found
        if (!foundProduct) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        }

        // Product successfully found
        res.json({ status: 'success', product: foundProduct });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateProduct = async (req, res) => {
    const { name, price, description, availability, images, category } = req.body;
    try {
        const { productId } = req.params; // Extracting product ID from the URL parameters
        const updatedProduct = await Product.findByIdAndUpdate(productId);

        if (!updatedProduct) {
            return res.status(401).json({ message: 'Product not found' });
        }

        updatedProduct.name = name || updatedProduct.name;
        updatedProduct.price = price || updatedProduct.price;
        updatedProduct.description = description || updatedProduct.description;
        updatedProduct.availability = availability || updatedProduct.availability;
        updatedProduct.images = images || updatedProduct.images;
        updatedProduct.category = category || updatedProduct.category;

        await updatedProduct.save();

        res.json({
            status: 'success',
            message: 'Product updated successfully',
            product: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Internal Server Error', error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const { productId } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};