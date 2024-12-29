import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OwnerService from "../../api/OwnerService";

export default function Dashboard() {
    const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                const data = await OwnerService.fetchRestaurant();
                setRestaurant(data);
            } catch (err) {
                setError(err);
            }
        };

        fetchRestaurantData();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">My Restaurant</h1>
            {error && <p className="text-red-500">{error}</p>}
            {restaurant ? (
                <div className="flex flex-col  space-y-4">
                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        className="w-1/3 rounded-lg shadow-md object-cover"
                    />
                    <h2 className="text-2xl font-semibold">{restaurant.name}</h2>
                    <p>{restaurant.address}</p>
                    <p>
                        {restaurant.zipCode}, {restaurant.city}
                    </p>
                    <Link to={"/edit-restaurant"} className="w-48 text-center bg-orange-600 border text-white hover:bg-orange-700 hover:text-white py-2 px-4 rounded transition">Edit</Link>
                </div>
            ) : (
                !error && <p>Loading restaurant data...</p>
            )}
        </div>
    );
}
