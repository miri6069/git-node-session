const mongoose = require("mongoose")
const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['סבונים', 'קרמים', 'בישום', 'נרות', 'מתנות', 'אחר'],
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    imageUrl: {
        type: String, // קישור לתמונה של המוצר
        required: true
    },
    inventoryStatus: {
        type: String,
        enum: ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'],

    },
    rating: {
        type: Number,
        max:5
    }
    //   stock: {
    //     type: Number,
    //     required: true,
    //     min: 0
    //   },
    //   isNew: {
    //     type: Boolean,
    //     default: false
    //   },
    //   isOnSale: {
    //     type: Boolean,
    //     default: false
    //   },
    //   salePrice: {
    //     type: Number,
    //     default: null
    //   },
    //   createdAt: {
    //     type: Date,
    //     default: Date.now
    //   }
},
    {
        timeseries: true
    })
module.exports = mongoose.model('Products', productsSchema)