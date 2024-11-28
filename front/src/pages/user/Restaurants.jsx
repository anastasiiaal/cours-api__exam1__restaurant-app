import { useEffect, useState } from "react";
import UserService from "../../api/UserService";

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const data = await UserService.getRestaurants();
                setRestaurants(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchRestaurants();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Restaurants</h1>
            {restaurants.length > 0 ? (
                <ul className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {restaurants.map((restaurant) => (
                        <li
                            key={restaurant.id}
                            className="restaurant-item relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition"
                        >
                            <a href="">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition"
                                    style={{ backgroundImage: `url(${restaurant.image})` }}
                                ></div>
                                <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                                <div className="relative z-10 flex flex-col justify-end h-full p-4 text-white">
                                    <h2 className="text-xl font-bold">{restaurant.name}</h2>
                                    <p className="text-sm">{restaurant.city}</p>
                                </div>
                            </a>
                            
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No restaurants available.</p>
            )}
            
        </div>

    );
}
