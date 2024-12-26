import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserService from "../../api/UserService";

export default function Cart() {
    const [cart, setCart] = useState({});
    const [restaurantNames, setRestaurantNames] = useState({});
    const { user } = useSelector((state) => state.auth);

    // fetch cart data and restaurant names to display
    useEffect(() => {
        if (user?.id) {
            const cartKey = `cart_${user.id}`;
            const storedCart = JSON.parse(localStorage.getItem(cartKey)) || {};
            setCart(storedCart);

            async function fetchRestaurantNames () {
                const names = {};
                for (const restaurantId of Object.keys(storedCart)) {
                    try {
                        // Use existing getRestaurantWithDishes from UserService
                        const restaurant = await UserService.getRestaurantWithDishes(restaurantId);
                        names[restaurantId] = restaurant.name; // Get the restaurant name
                    } catch (error) {
                        console.error(`Error fetching restaurant ${restaurantId}:`, error.message);
                        names[restaurantId] = "Unknown Restaurant";
                    }
                }
                setRestaurantNames(names);
            };

            fetchRestaurantNames();
        }
    }, [user]);

    // remove an item from the cart
    const removeItem = (restaurantId, dishId) => {
        const cartKey = `cart_${user.id}`;
        const updatedCart = { ...cart };

        // remove the dish
        updatedCart[restaurantId].items = updatedCart[restaurantId].items.filter(
            (item) => item.dishId !== dishId
        );

        // if no more items in the restaurant, remove the restaurant key
        if (updatedCart[restaurantId].items.length === 0) {
            delete updatedCart[restaurantId];
        }

        setCart(updatedCart);
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    };

    // calculate total price for a restaurant's dishes
    const calculateTotal = (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {Object.keys(cart).length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                // for each restaurat display its corresponding cart
                Object.keys(cart).map((restaurantId) => (
                    <div key={restaurantId} className="mb-8">
                        <h2 className="text-xl font-bold mb-4">
                            {restaurantNames[restaurantId] || "Loading..."}
                        </h2>
                        <ul className="space-y-4">
                            {cart[restaurantId].items.map((item) => (
                                <li
                                    key={item.dishId}
                                    className="flex items-center p-4 justify-between bg-white shadow rounded"
                                >
                                    <div className="flex items-center gap-7">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-24 w-24 object-cover rounded"
                                        />
                                        <div>
                                            <h2 className="font-bold">{item.name}</h2>
                                            <p>
                                                €{item.price.toFixed(2)} x {item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() =>
                                            removeItem(restaurantId, item.dishId)
                                        }
                                        className="w-32 bg-white text-orange-600 border border-orange-600 hover:bg-orange-600 hover:text-white py-1 px-4 rounded transition"
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6 p-4 flex flex-col items-end">
                            <h2 className="text-xl font-bold">
                                Total: €{calculateTotal(cart[restaurantId].items).toFixed(2)}
                            </h2>
                            <button
                                className="bg-orange-600 w-60 text-white px-6 py-2 rounded hover:bg-orange-700 mt-4"
                            >
                                Order
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
