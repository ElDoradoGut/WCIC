import { useEffect, useState } from "react";
import axios from "axios";

const Loader = () => (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500 mx-auto"></div>
        <p>Loading ingredients...</p>
    </div>
);

const IngredientsPage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const res = await axios.get("http://localhost:4000/ingredientes");
                setIngredients(res.data);
            } catch (err) {
                setError("Failed to fetch ingredients.");
            }
            setLoading(false);
        };
        fetchIngredients();
    }, []);

    if (loading) return <Loader />;
    if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">All Ingredients</h2>
            <ul className="list-disc pl-5">
                {ingredients.map((ing: any) => (
                    <li key={ing._id}>{ing.name} - {ing.category}</li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientsPage;
