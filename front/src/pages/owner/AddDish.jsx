import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OwnerService from "../../api/OwnerService";

export default function AddDish() {
    const [formData, setFormData] = useState({
        name: "",
        image: "",
        price: "",
        description: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.name || !formData.price) {
            setError("Name and price are required.");
            return;
        }

        try {
            await OwnerService.createDish(formData);
            navigate("/dishes");
        } catch (err) {
            setError("Failed to create the dish. Please try again.");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Add new dish</h1>
            {error && <p className="text-red-600 mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div>
                    <label className="block font-medium">Dish name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter dish name"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-600"
                    />
                </div>

                <div>
                    <label className="block font-medium">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Enter image URL"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-600"
                    />
                </div>

                <div>
                    <label className="block font-medium">Price, €</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-600"
                    />
                </div>

                <div>
                    <label className="block font-medium">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter dish description"
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-orange-600"
                        rows="4"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="button"
                >
                    Add dish
                </button>
            </form>
        </div>
    );
}
