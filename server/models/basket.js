const mongoose = require("mongoose")
const products = require("./products")
const basketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        products: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min:1
        }
    }]
}, {})
module.exports = mongoose.model('Basket', basketSchema)