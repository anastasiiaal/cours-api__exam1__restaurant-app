import { Outlet, useNavigate } from "react-router-dom";

export default function SimpleUserLayout() {
    const navigate = useNavigate();

    const menu = [
        { label: "Restaurants", path: "/restaurants" },
        { label: "Profile", path: "/profile" },
        { label: "Cart", path: "/orders" },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-orange-600 text-white py-5 px-8 flex justify-between">
                <a className="hidden sm:block text-2xl font-bold" href="/">Uber Eats</a>
                <nav className="w-full sm:w-auto">
                    <ul className="flex space-x-12 justify-center text-lg">
                        {menu.map((item) => (
                            <li
                                key={item.path}
                                onClick={() => navigate(item.path)}
                                className="cursor-pointer hover:underline font-semibold"
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
};

