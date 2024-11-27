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
        <div>
            <h2>Hello {user?.email}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
