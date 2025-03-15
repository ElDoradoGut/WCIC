import { model, Schema } from "mongoose";

const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    category: {
        type: String,
        required: true,
        enum: ['Eggs, Milk and Milk products',
            'Fats and Oils',
            'Fruits',
            'Vegtables',
            'Grain, Nuts and baking products',
            'Herbs and Spices',
            'Meats, Sausages and Fish',
            'Other'],
        default: 'Other'
    }
});

const modelIngredient = model('ingrediente', ingredientSchema);
export default modelIngredient;