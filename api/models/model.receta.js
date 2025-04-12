import { Schema, model } from "mongoose";
import ingredient from "./model.ingrediente.js"

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
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    serves: {
        type: String,
        required: true
    },
    ingredients : [{
        ingredient : {type: Schema.Types.ObjectId, ref: "ingredient"},
        quantity: Number,
        unit: String,
        descriptor: {
            type: String,
            default: ""
        }
    }],
    steps: [String]
});

const modelReceta = model('receta', recetaSchema);
export default modelReceta