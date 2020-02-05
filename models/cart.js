const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String
    },
    categories:{
        type:String,
        required: true
    },
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model('Cart', cartSchema);