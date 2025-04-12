import Ingrediente from "../models/model.ingrediente.js";

export const getAllIngredientes = async (req, res) => {
    try {
        const ingredientes = await Ingrediente.find();
        res.json(ingredientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getIngredienteById = async (req, res) => {
    try {
        const ingrediente = await Ingrediente.findById(req.params.id);
        if (!ingrediente) {
            return res.status(404).json({ message: "Ingrediente not found" });
        }
        res.json(ingrediente);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createIngrediente = async (req, res) => {
    try {
        const newIngrediente = new Ingrediente(req.body);
        const savedIngrediente = await newIngrediente.save();
        res.status(201).json(savedIngrediente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateIngrediente = async (req, res) => {
    try {
        const updatedIngrediente = await Ingrediente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedIngrediente) {
            return res.status(404).json({ message: "Ingrediente not found" });
        }
        res.json(updatedIngrediente);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteIngrediente = async (req, res) => {
    try {
        const deletedIngrediente = await Ingrediente.findByIdAndDelete(req.params.id);
        if (!deletedIngrediente) {
            return res.status(404).json({ message: "Ingrediente not found" });
        }
        res.json({ message: "Ingrediente deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};