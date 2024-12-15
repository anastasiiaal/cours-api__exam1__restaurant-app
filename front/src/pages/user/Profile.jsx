import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";
import UserService from "../../api/UserService";

export default function Profile() {
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        setSuccessMessage("");
        setErrorMessage("");

        try {
            const response = await UserService.updateProfile(formData);
            setSuccessMessage("Profile updated successfully!");
            setFormData({
                name: response.user.name,
                email: response.user.email,
            });
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-end">
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-40"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 flex justify-between">
                <div className="col bg-white p-6 shadow rounded w-[48%]">
                    <h3 className="text-lg font-bold mb-4">Edit Profile</h3>

                    {successMessage && (
                        <p className="text-green-600 bg-green-100 p-3 rounded mb-4">
                            {successMessage}
                        </p>
                    )}
                    {errorMessage && (
                        <p className="text-red-600 bg-red-100 p-3 rounded mb-4">
                            {errorMessage}
                        </p>
                    )}

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                            placeholder="Enter your email"
                        />
                    </div>

                    <button
                        onClick={handleSaveChanges}
                        className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
                    >
                        Save Changes
                    </button>
                </div>

                <div className="col bg-white p-6 shadow rounded w-[48%]">
                    mdp ici
                </div>
            </div>
        </>
    );
}
