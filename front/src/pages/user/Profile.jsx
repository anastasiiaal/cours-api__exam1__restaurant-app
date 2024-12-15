import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/features/auth/authSlice";

export default function Profile () {
    const { user, token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    console.log(token, user);

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">Hello {user?.name}!</h2>
                <button className="w-40" onClick={handleLogout}>Log out</button>
            </div>
        </div>
    );
};
