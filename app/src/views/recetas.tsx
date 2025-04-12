import { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { IRecetaList, IIngredient } from "../types";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState<IRecetaList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [ingredients, setIngredients] = useState<IIngredient[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const [filteredRecipes, setFilteredRecipes] = useState<IRecetaList[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [recipesRes, ingredientsRes] = await Promise.all([
                    axios.get<IRecetaList[]>("http://localhost:4000/recetas"),
                    axios.get<IIngredient[]>("http://localhost:4000/ingredientes")
                ]);
                setRecipes(recipesRes.data);
                setFilteredRecipes(recipesRes.data);
                setIngredients(ingredientsRes.data);
            } catch (err) {
                setError("Failed to fetch recipes or ingredients.");
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (selectedIngredients.length === 0) {
            setFilteredRecipes(recipes);
            return;
        }

        const fuse = new Fuse(recipes, {
            keys: ["description", "name"],
            threshold: 0.3,
        });

        const result = fuse.search(selectedIngredients.join(" ")).map(r => r.item);
        setFilteredRecipes(result);
    }, [selectedIngredients, recipes]);

    const toggleIngredient = (name: string) => {
        setSelectedIngredients(prev =>
            prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
        );
    };

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Select Ingredients</h2>
            <div className="flex flex-wrap gap-2 mb-6">
                {ingredients.map((ing) => (
                    <button
                        key={ing.name}
                        onClick={() => toggleIngredient(ing.name)}
                        className={`px-3 py-1 border rounded-full ${selectedIngredients.includes(ing.name)
                                ? "bg-purple-300 text-white"
                                : "bg-white border-purple-300 text-purple-500"
                            }`}
                    >
                        {ing.name}
                    </button>
                ))}
            </div>
            <h2 className="text-xl font-semibold mb-4">Matching Recipes</h2>
            <div className="space-y-4">
                {filteredRecipes.map((r) => (
                    <div key={r.name} className="border p-4 rounded-md bg-purple-50">
                        <h3 className="text-lg font-bold">{r.name}</h3>
                        <p>{r.description}</p>
                    </div>
                ))}
                {filteredRecipes.length === 0 && (
                    <p className="text-gray-500">No recipes matched your ingredients.</p>
                )}
            </div>
        </div>
    );
};


export default ListaRecetas;