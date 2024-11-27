import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../store/features/auth/authSlice";

const DashboardLayout = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    const menu = user?.role === "ADMIN"
        ? [
            { label: "Restaurants", path: "/dashboard" },
            { label: "Add New", path: "/add-new" },
            { label: "Log Out", path: "logout", action: handleLogout },
        ]
        : user?.role === "OWNER"
            ? [
                { label: "My Restaurant", path: "/dashboard" },
                { label: "Dishes", path: "/dishes" },
                { label: "Orders", path: "/orders" },
                { label: "Log Out", path: "logout", action: handleLogout },
            ]
            : [];

    return (
        <div className="flex min-h-screen">
            <aside className="w-64 bg-gray-800 text-white p-4">
                <h2 className="text-xl font-bold mb-4">{user?.role} Panel</h2>
                <nav>
                    <ul>
                        {menu.map((item) =>
                            item.path === "logout" ? (
                                <li
                                    key={item.label}
                                    onClick={item.action}
                                    className="cursor-pointer py-2 mt-6 px-4 hover:bg-gray-700 rounded"
                                >
                                    {item.label}
                                </li>
                            ) : (
                                <li
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className="cursor-pointer py-2 px-4 hover:bg-gray-700 rounded"
                                >
                                    {item.label}
                                </li>
                            )
                        )}
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 bg-gray-100 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;
