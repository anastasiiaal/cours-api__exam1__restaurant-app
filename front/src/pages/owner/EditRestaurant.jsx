import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OwnerService from "../../api/OwnerService";

export default function EditRestaurant() {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        zipCode: "",
        city: "",
        image: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    // fetch current restaurant details
    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const data = await OwnerService.fetchRestaurant();
                setFormData({
                    name: data.name || "",
                    address: data.address || "",
                    zipCode: data.zipCode || "",
                    city: data.city || "",
                    image: data.image || "",
                });
            } catch (error) {
                console.error("Error fetching restaurant details:", error);
                setErrorMessage("Failed to load restaurant details.");
            }
        };
        fetchRestaurant();
    }, []);

    // handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        try {
            await OwnerService.updateRestaurant(formData);
            setSuccessMessage("Restaurant updated successfully!");
            setTimeout(() => navigate("/dashboard"), 1500); // back to dashboard after success
        } catch (error) {
            console.error("Error updating restaurant:", error);
            setErrorMessage("Failed to update restaurant. Please try again.");
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Edit Restaurant</h1>

            {errorMessage && (
                <p className="text-red-600 bg-red-100 p-3 rounded mb-4">
                    {errorMessage}
                </p>
            )}
            {successMessage && (
                <p className="text-green-600 bg-green-100 p-3 rounded mb-4">
                    {successMessage}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">ZIP Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                    />
                </div>

                <button type="submit">Save changes</button>
            </form>
        </div>
    );
}
