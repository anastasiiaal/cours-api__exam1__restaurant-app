import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import OwnerService from "../../api/OwnerService";

export default function Dishes() {
    const navigate = useNavigate();
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDishes = async () => {
            try {
                const data = await OwnerService.getDishes();
                setDishes(data); // Assuming the API returns an array of dishes
            } catch (error) {
                console.error("Error fetching dishes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDishes();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My dishes</h1>
                <button onClick={() => navigate("/dishes/new")} className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 w-52">
                    Add new +
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {dishes.map((dish) => (
                        <div
                            key={dish.id}
                            className="relative bg-white rounded overflow-hidden shadow-lg"
                        >
                            <img
                                src={dish.image}
                                alt={dish.name}
                                className="w-full h-72 object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 text-white">
                                <h2 className="text-lg font-bold">{dish.name}</h2>
                                <p>{dish.price.toFixed(2)}€</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
