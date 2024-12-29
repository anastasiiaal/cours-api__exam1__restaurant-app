import axiosInstance from "./axiosInstance";

class OwnerService {
    async fetchRestaurant() {
        try {
            const response = await axiosInstance.get("/owner/restaurant");
            return response.data;
        } catch (error) {
            console.error("Error fetching restaurant data:", error);
            throw error.response?.data?.message || "Failed to fetch restaurant data";
        }
    }

    async getDishes() {
        try {
            const response = await axiosInstance.get("/owner/dishes");
            return response.data;
        } catch (error) {
            console.error("Error fetching dishes:", error);
            throw error;
        }
    }

    async createDish(dishData) {
        try {
            const response = await axiosInstance.post("/owner/dish/new", dishData);
            return response.data;
        } catch (error) {
            console.error("Error creating new dish:", error);
            throw error;
        }
    }

    async getRestaurantOrders() {
        try {
            const response = await axiosInstance.get("/owner/orders");
            return response.data;
        } catch (error) {
            console.error("Error fetching your restaurant orders:", error);
            throw error;
        }
    }

    async fetchDishById(id) {
        try {
            const response = await axiosInstance.get(`/owner/dish/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching your dish:", error);
            throw error;
        }
    }

    async updateDishById(id, data) {
        try {
            const response = await axiosInstance.patch(`/owner/dish/${id}`, data);
            return response.data;
        } catch (error) {
            console.error("Error editing your dish:", error);
            throw error;
        }
    }

    async deleteDishById(id) {
        try {
            const response = await axiosInstance.delete(`/owner/dish/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error deleting dish:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || "Failed to delete dish");
        }
    }
}

export default new OwnerService();
