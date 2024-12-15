import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        // fetch cart data for the current user
        if (user?.id) {
            const cartKey = `cart_${user.id}`;
            const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
            setCart(storedCart);
        }
    }, [user]);

    const removeItem = (dishId) => {
        const cartKey = `cart_${user.id}`;

        const updatedCart = cart.filter((item) => item.dishId !== dishId);
        setCart(updatedCart);
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
    };

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <>
                    <ul className="space-y-4">
                        {cart.map((item) => (
                            <li key={item.dishId} className="flex items-center p-4 justify-between bg-white shadow rounded">
                                <div className="flex items-center gap-7">
                                    <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded" />
                                    <div>
                                        <h2 className="font-bold">{item.name}</h2>
                                        <p>${item.price.toFixed(2)} x {item.quantity}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeItem(item.dishId)}
                                    className="w-32 bg-white text-orange-600 border border-orange-600 hover:bg-red-600 hover:text-white py-1 px-4 rounded transition"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6 p-4 flex flex-col items-end justify-between gap-5">
                        <h2 className="text-xl font-bold">Total: €{totalPrice.toFixed(2)}</h2>
                        <button
                            className="bg-orange-600 w-60 text-white px-6 py-2 rounded hover:bg-orange-700"
                        >
                            Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
