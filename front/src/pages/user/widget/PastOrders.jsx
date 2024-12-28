import { useState, useEffect } from "react";
import UserService from "../../../api/UserService";

export default function PastOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await UserService.getMyOrders();
                setOrders(data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch orders:", err.message);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p className="text-red-600">{error}</p>;
    if (orders.length === 0) return <p>No past orders found.</p>;
console.log(orders);

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Past Orders</h2>
            <ul className="space-y-4">
                {orders.map((order) => (
                    <li
                        key={order.id}
                        className="bg-white shadow rounded p-4 flex justify-between items-center"
                    >
                        <div>
                            <h3 className="font-bold text-lg">{order.Restaurant?.name || "Unknown Restaurant"}</h3>
                            <p className="text-sm text-gray-500">
                                {new Date(order.date).toLocaleDateString()}
                            </p>
                        </div>
                        <p className="font-bold text-orange-600">
                            €{order.total.toFixed(2)}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
