const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    products: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
            name: String,
            price: Number,
            quantity: { type: Number, default: 1 },
        }
    ]
});

CartSchema.virtual("totalPrice").get(function () {
    return this.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
});

module.exports = mongoose.model("Cart", CartSchema);
