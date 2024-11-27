import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/features/auth/authActions";
import { Link } from "react-router-dom";

export default function Login () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <div className="mb-4">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit">
          Login
        </button>
        <div className="mt-4 text-center">
          <Link
            to="/register"
            className="text-orange-600 hover:underline text-sm"
          >
            Or Register
          </Link>
        </div>
      </form>
    </div>
  );
};
