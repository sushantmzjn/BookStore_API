const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    categories: {
        type: String,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    }
});

module.exports = mongoose.model('Book', bookSchema);