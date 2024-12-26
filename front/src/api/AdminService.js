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

    async getAllRestaurants() {
        try {
            const response = await axiosInstance.get("/admin/restaurants");
            return response.data.data;
        } catch (error) {
            console.error("Error fetching restaurants:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Failed to fetch restaurants");
        }
    }

    async deleteRestaurant(id) {
        try {
            const response = await axiosInstance.delete(`/admin/restaurants/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting restaurant:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Failed to delete restaurant");
        }
    }
}

export default new AdminService();
