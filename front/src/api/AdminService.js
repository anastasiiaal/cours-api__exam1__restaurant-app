import axiosInstance from "./axiosInstance";

class AdminService {
    async createOwnerWithRestaurant(data) {
        try {
            const response = await axiosInstance.post("/admin/create-owner", data);
            return response.data;
        } catch (error) {
            console.error("AdminService error:", error.response?.data || error.message);
            // pass the backend error message to the frontend
            throw new Error(error.response?.data?.message || "Failed to create owner and restaurant");
        }
    }
}

export default new AdminService();
