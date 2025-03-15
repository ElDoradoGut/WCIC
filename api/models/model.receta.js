import { Schema, model } from "mongoose";
const ingredient = require("./model.ingrediente.js");

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
    ingredients : [{
        ingredient : {type: Schema.Types.ObjectId, ref: "ingredient"},
        quantity: Number,
        unit: String
    }],
    steps: [String]
});

const modelReceta = model('receta', recetaSchema);