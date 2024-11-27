import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/features/auth/authActions";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // Error state for frontend and backend errors
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      await dispatch(login({ email, password }));
      setErrors({});
    } catch (error) {
      console.error("Error in Login Component:", error.message);
      setErrors({ form: error.message || "An unknown error occurred" });
    }
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
        {errors.form && (
          <p className="text-red-500 text-sm mb-4">{errors.form}</p>
        )}
        <div className="mb-4">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`input ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`input ${errors.password ? "border-red-500" : ""}`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <button type="submit" className="button">
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
}
