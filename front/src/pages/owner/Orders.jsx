import { useState, useEffect } from "react";
import OwnerService from "../../api/OwnerService";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await OwnerService.getRestaurantOrders();
                // console.log("orders:", data.data);
                setOrders(data.data);
            } catch (err) {
                setError(err.message || "Failed to fetch orders");
            }
        };

        fetchOrders();
    }, []);

    // handle order delete
    const handleDelete = async (id) => {
        try {
            if (!window.confirm("Are you sure you want to delete this order?")) return;
            await OwnerService.deleteOrderById(id);

            // update state to remove deleted order
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
        } catch (err) {
            setError(err.message || "Failed to delete order.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Past Orders</h1>

            {error && (
                <p className="text-red-600 bg-red-100 p-3 rounded mb-4">{error}</p>
            )}

            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded shadow-lg p-6 relative">
                            <div className="mb-4">
                                <p className="text-xl font-bold mb-1">
                                    {new Date(order.date).toLocaleDateString()}
                                </p>
                                <h3 className="text-lg font-bold">{order.User.name} <span className="text-sm text-gray-500">({order.User.email})</span></h3>
                            </div>
                            <ul className="space-y-4">
                                {JSON.parse(order.items).map((item, index) => (
                                    <li key={index} className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-10 w-10 object-cover rounded"
                                        />
                                        <div>
                                            <h4 className="font-bold">{item.name}</h4>
                                            <p>
                                                €{item.price.toFixed(2)} x {item.quantity}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="text-right font-bold text-lg">
                                Total: €{order.total.toFixed(2)}
                            </div>
                            <div className="absolute top-0 right-0 p-4">
                                <button
                                    onClick={() => handleDelete(order.id)}
                                    className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
