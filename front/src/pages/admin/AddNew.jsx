import { useState } from "react";
import AdminService from "../../api/AdminService";

export default function AddNew() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        restaurantName: "",
        address: "",
        zipCode: "",
        city: "",
        image: "",
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // check if all fields are filled
    const isFormValid = () => {
        return Object.values(formData).every((field) => field.trim() !== "");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        try {
            const response = await AdminService.createOwnerWithRestaurant(formData);
            setSuccess(response.message || "Owner and restaurant created successfully!");
            setFormData({
                name: "",
                email: "",
                password: "",
                restaurantName: "",
                address: "",
                zipCode: "",
                city: "",
                image: "",
            });
        } catch (e) {
            setError("Email already used. Try another one.");
        }
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-lg"
            >
                <h2 className="text-2xl font-bold text-center mb-6">
                    Create New Owner & Restaurant
                </h2>

                {error && (
                    <p className="text-red-600 bg-red-100 p-3 rounded mb-4">{error}</p>
                )}
                {success && (
                    <p className="text-green-600 bg-green-100 p-3 rounded mb-4">
                        {success}
                    </p>
                )}

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Owner Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Owner's Full Name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Owner's Email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Password</label>
                    <input
                        type="text"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Restaurant Name</label>
                    <input
                        type="text"
                        name="restaurantName"
                        value={formData.restaurantName}
                        onChange={handleChange}
                        placeholder="Restaurant's Name"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Restaurant's Address"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">ZIP Code</label>
                    <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="ZIP Code"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-medium">City</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 font-medium">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        placeholder="Restaurant Image URL"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-2 px-4 rounded transition ${isFormValid()
                            ? "bg-orange-600 text-white hover:bg-orange-700"
                            : "bg-gray-300 hover:bg-gray-300 text-gray-800 cursor-not-allowed"
                        }`}
                    disabled={!isFormValid()}
                >
                    Create restaurant account
                </button>
            </form>
        </div>
    );
}
