import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import AddNew from "./pages/admin/AddNew";
import Restaurants from "./pages/user/Restaurants";
import DashboardLayout from "./layouts/DashboardLayout";
import UserLayout from "./layouts/UserLayout";
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
            <Route path="dashboard" element={<div><p>My Restaurant</p></div>} />
            <Route path="dishes" element={<div><p>Dishes Here</p></div>} />
            <Route path="orders" element={<div><p>Orders Here</p></div>} />
            <Route index element={<Navigate to="/dashboard" />} />
          </Route>
        )}

        {isAuthenticated && user?.role === "USER" && (
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Navigate to="restaurants" />} />
            <Route path="restaurants" element={<Restaurants />} />
            <Route path="profile" element={<Profile />} />
            <Route path="orders" element={<div>Orders Page</div>} />
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
