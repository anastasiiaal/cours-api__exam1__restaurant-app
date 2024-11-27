import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../store/features/auth/authSlice";

const DashboardLayout = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

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
            <aside className="w-64 bg-white text-gray-800 p-4">
                <h2 className="text-xl font-bold mb-6">{user?.role} Panel</h2>
                <nav>
                    <ul>
                        {menu.map((item) =>
                            item.path === "logout" ? (
                                <li
                                    key={item.label}
                                    onClick={item.action}
                                    className="cursor-pointer py-2 font-bold mt-6 px-4 text-orange-500 hover:text-orange-700 rounded flex items-center space-x-3"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 mr-2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 006.75 21h6.75a2.25 2.25 0 002.25-2.25V15M9 12h12m0 0l-3-3m3 3l-3 3"
                                        />
                                    </svg>
                                    {item.label}
                                </li>
                            ) : (
                                <li
                                    key={item.path}
                                    onClick={() => navigate(item.path)}
                                    className={`cursor-pointer font-bold py-2 px-4 rounded flex items-center space-x-3 mb-1 ${location.pathname === item.path
                                            ? "bg-orange-500 text-white"
                                            : "hover:bg-orange-500 hover:text-white"
                                        }`}
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
