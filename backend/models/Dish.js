// models/Dish.js
import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: true
    }
});

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;
