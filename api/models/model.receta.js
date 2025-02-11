import { Schema, model } from "mongoose";
const IngredientSchema = new Schema({name: String})

const recetaSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    author: [{
        type: String,
        required: true,
        default: "Anonymous"
    }],
    minutes: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients : [IngredientSchema],
    steps: [String]
});

export const modelReceta = model('receta', recetaSchema);