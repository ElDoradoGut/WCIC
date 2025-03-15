import Receta from "../models/model.receta.js";

export const getRecetas = async (req, res) => {
    try {
        const recetas = await Receta.find().populate("ingredients.ingredient");
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRecetaById = async (req, res) => {
    try {
        const receta = await Receta.findById(req.params.id).populate("ingredients.ingredient");
        if (!receta) {
            return res.status(404).json({ message: "Receta not found" });
        }
        res.json(receta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRecetaByName = async (req, res) => {
    try {
        const receta = await Receta.findOne({ name: req.params.name }).populate("ingredients.ingredient");
        if (!receta) {
            return res.status(404).json({ message: "Receta not found" });
        }
        res.json(receta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getRecetasByIngredients = async (req, res) => {
    try {
        const ingredientNames = req.body.ingredients; // arreglo de ingredientes.
        const recetas = await Receta.find({
            "ingredients.ingredient": { $in: ingredientNames }
        }).populate("ingredients.ingredient");

        if (!recetas.length) {
            return res.status(404).json({ message: "No recetas found" });
        }
        res.json(recetas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createReceta = async (req, res) => {
    try {
        const newReceta = new Receta(req.body);
        await newReceta.save();
        res.status(201).json(newReceta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateReceta = async (req, res) => {
    try {
        const updatedReceta = await Receta.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("ingredients.ingredient");
        if (!updatedReceta) {
            return res.status(404).json({ message: "Receta not found" });
        }
        res.json(updatedReceta);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteReceta = async (req, res) => {
    try {
        const deletedReceta = await Receta.findByIdAndDelete(req.params.id);
        if (!deletedReceta) {
            return res.status(404).json({ message: "Receta not found" });
        }
        res.json({ message: "Receta deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};