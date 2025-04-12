export interface IRecetaList {
    name: string;
    author: string[];
    description: string;
}

export interface IRecipe {
    name: string;
    author: string[];
    minutes: number;
    description: string;
    serves: string;
    ingredients: {
        ingredient: IIngredient;
        quantity: number;
        unit: string;
    }[];
    steps: string[];
}
export interface IIngredient {
    name: string;
    description?: string;
    category:
    | 'Eggs, Milk and Milk products'
    | 'Fats and Oils'
    | 'Fruits'
    | 'Vegetables'
    | 'Grain, Nuts and baking products'
    | 'Herbs and Spices'
    | 'Meats, Sausages and Fish'
    | 'Other';
}