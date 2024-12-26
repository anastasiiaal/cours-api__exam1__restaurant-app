import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserService from "../../api/UserService";
import { useSelector } from "react-redux";

export default function RestaurantDetails() {
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const data = await UserService.getRestaurantWithDishes(id);
                setRestaurant(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching restaurant details:", error.message);
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    const { user } = useSelector((state) => state.auth);

    function addToCart(dish, restaurantId) {
        const userId = user?.id;
    
        if (!userId) {
            alert("User is not logged in. Cannot add to cart.");
            return;
        }
    
        const cartKey = `cart_${userId}`;
        let cart = JSON.parse(localStorage.getItem(cartKey)) || {};

        // check if this restaurant already exists in the cart
        if (!cart[restaurantId]) {
            cart[restaurantId] = {
                restaurantId: restaurantId,
                items: [],
            };
        }
    
        // check if the dish is already in the cart for this restaurant
        const existingItem = cart[restaurantId].items.find(
            (item) => item.dishId === dish.id
        );
    
        if (existingItem) {
            // increase nb if dish already exists
            existingItem.quantity += 1;
        } else {
            // else add new dish to the cart
            cart[restaurantId].items.push({
                dishId: dish.id,
                name: dish.name,
                image: dish.image,
                price: dish.price,
                quantity: 1,
            });
        }
    
        // save updated cart back to localStorage
        localStorage.setItem(cartKey, JSON.stringify(cart));
        alert(`${dish.name} has been added to the cart!`);
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!restaurant) {
        return <p>Restaurant not found.</p>;
    }

    return (
        <div>
            <div
                className="h-64 bg-cover bg-center text-white flex items-center justify-center"
                style={{
                    backgroundImage: `url(${restaurant.image})`,
                }}
            >
                <div className="bg-black bg-opacity-60 p-4 w-full h-full flex flex-col items-center justify-end">
                    <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                    <p>{restaurant.address}, {restaurant.city}, {restaurant.zipCode}</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4">Dishes</h2>
                {restaurant.Dishes && restaurant.Dishes.length > 0 ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {restaurant.Dishes.map((dish) => (
                            <li key={dish.id} className="bg-white shadow p-4 rounded">
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-48 object-cover rounded mb-2"
                                />
                                <h3 className="text-lg font-bold">{dish.name}</h3>
                                <p className="text-gray-600">{dish.description}</p>
                                <p className="text-orange-600 font-bold">{dish.price} €</p>
                                <button 
                                    onClick={() => addToCart(dish, restaurant.id)}
                                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 mt-2"
                                >
                                    Add to cart
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No dishes available.</p>
                )}
            </div>
        </div>
    );
}
