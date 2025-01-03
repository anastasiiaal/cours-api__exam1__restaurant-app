import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AddNew from "./pages/admin/AddNew";
import OwnerDashboard from "./pages/owner/Dashboard";
import EditRestaurant from "./pages/owner/EditRestaurant";
import OwnerDishes from "./pages/owner/Dishes";
import AddDish from "./pages/owner/AddDish";
import Orders from "./pages/owner/Orders";
import EditDish from "./pages/owner/EditDish";
import UserLayout from "./layouts/UserLayout";
import Restaurants from "./pages/user/Restaurants";
import RestaurantDetails from "./pages/user/RestaurantDetails";
import Cart from "./pages/user/Cart";
import Profile from "./pages/user/Profile";

export default function App () {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {/* shared routes */}
        <Route
          path="/login"
          element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <Register /> : <Navigate to="/" />}
        />

        {/* role-based routes */}
        {isAuthenticated && user?.role === "ADMIN" && (
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="add-new" element={<AddNew />} />
            <Route index element={<Navigate to="/dashboard" />} />
          </Route>
        )}

        {isAuthenticated && user?.role === "OWNER" && (
          <Route path="/" element={<DashboardLayout />}>
            <Route path="dashboard" element={<OwnerDashboard />} />
            <Route path="edit-restaurant" element={<EditRestaurant />} />
            <Route path="dishes" element={<OwnerDishes />} />
            <Route path="dishes/new" element={<AddDish />} />
            <Route path="orders" element={<Orders />} />
            <Route path="dishes/:id" element={<EditDish />} />
            <Route index element={<Navigate to="/dashboard" />} />
          </Route>
        )}

        {isAuthenticated && user?.role === "USER" && (
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Navigate to="restaurants" />} />
            <Route path="restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id" element={<RestaurantDetails />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<Cart />} />
          </Route>
        )}

        {/* default redirect */}
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};
