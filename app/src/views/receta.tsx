import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Recipe {
    name: string;
    description: string;
    steps: string[];
}

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    useEffect(() => {
        axios.get(`http://localhost:4000/recetas/${id}`).then(res => setRecipe(res.data));
    }, [id]);

    if (!recipe) return <div className="text-center py-10">Loading...</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3 text-gray-800">{recipe.name}</h2>
            <p className="mb-4 text-gray-700">{recipe.description}</p>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Steps</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
                {recipe.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </div>
    );
};

export default RecipeDetails;