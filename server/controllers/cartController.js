const Cart = require("../models/cartModel");

exports.getCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.json({ userId, products: [] });
        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addToCart = async (req, res) => {
    const { userId, product } = req.body;
    try {
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, products: [{ ...product, quantity: 1 }] });
        } else {
            const index = cart.products.findIndex((p) => p._id.toString() === product._id);
            if (index > -1) {
                cart.products[index].quantity += 1;
            } else {
                cart.products.push({ ...product, quantity: 1 });
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateQuantity = async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const item = cart.products.find((p) => p._id.toString() === productId);
        if (!item) return res.status(404).json({ message: "Product not in cart" });

        item.quantity = quantity;
        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.removeFromCart = async (req, res) => {
    const { userId } = req.params;
    const { productId } = req.body;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.products = cart.products.filter((p) => p._id.toString() !== productId);
        await cart.save();

        res.json(cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
