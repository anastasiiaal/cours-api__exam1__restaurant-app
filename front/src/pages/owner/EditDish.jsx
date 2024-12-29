import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OwnerService from "../../api/OwnerService";

export default function EditDish() {
    const { id } = useParams(); // get the id from url
    const navigate = useNavigate();
    const [dish, setDish] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        description: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchDish = async () => {
            try {
                const response = await OwnerService.fetchDishById(id);
                setDish(response);
                setFormData({
                    name: response.name,
                    image: response.image,
                    price: response.price,
                    description: response.description || "",
                });
            } catch (err) {
                setError("Failed to fetch dish details.");
            }
        };

        fetchDish();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            await OwnerService.updateDishById(id, formData);
            setSuccess("Dish updated successfully!");
            setTimeout(() => navigate("/dishes"), 2000);
        } catch (err) {
            setError("Failed to update dish. Please try again.");
        }
    };

    if (!dish) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Edit Dish</h1>
            {error && <p className="text-red-600 bg-red-100 p-3 rounded mb-4">{error}</p>}
            {success && <p className="text-green-600 bg-green-100 p-3 rounded mb-4">{success}</p>}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div>
                    <label className="block mb-1 font-medium">Dish Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Price (€)</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 w-full"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}
