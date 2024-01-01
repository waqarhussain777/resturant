// controllers/dishController.js
import Dish from '../models/Dish.js';

export const createDish = async (req, res) => {
    try {
        const newDish = new Dish(req.body);
        await newDish.save();
        res.status(201).json(newDish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getDishes = async (req, res) => {
    const { search, limit, offset } = req.query;
    let query = {};

    if (search) {
        query = { name: { $regex: search, $options: 'i' } }; // case-insensitive search
    }

    try {
        const dishes = await Dish.find(query).limit(limit).skip(offset);
        res.status(200).json(dishes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getDish = async (req, res) => {
    const { id } = req.params;
    try {
        const dish = await Dish.findById(id);
        if (!dish) {
            return res.status(404).send('Dish not found');
        }
        res.status(200).json(dish);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDish = async (req, res) => {
    const { id } = req.params;
    try {
        const dish = await Dish.findByIdAndUpdate(id, req.body, { new: true });
        if (!dish) {
            return res.status(404).send('Dish not found');
        }
        res.status(200).json(dish);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteDish = async (req, res) => {
    const { id } = req.params;
    try {
        const dish = await Dish.findByIdAndDelete(id);
        if (!dish) {
            return res.status(404).send('Dish not found');
        }
        res.status(200).send('Dish deleted successfully');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
