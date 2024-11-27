import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/features/auth/authActions";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // Store errors
  const dispatch = useDispatch();

  const handleRegister = async (e) => {
    e.preventDefault();
  
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
  
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  
    try {
      await dispatch(register({ name, email, password }));
      setErrors({});
    } catch (error) {
      console.error("Register error:", error.message);
  
      // display the backend error
      setErrors({ form: error.message });
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white p-8 rounded shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h2>
        {errors.form && (
          <div className="text-red-500 text-sm mb-4">{errors.form}</div>
        )}
        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={`w-full px-4 py-2 border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-orange-600`}
          />
          {errors.name && (
            <div className="text-red-500 text-sm">{errors.name}</div>
          )}
        </div>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`w-full px-4 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-orange-600`}
          />
          {errors.email && (
            <div className="text-red-500 text-sm">{errors.email}</div>
          )}
        </div>
        <div className="mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full px-4 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none focus:ring-2 focus:ring-orange-600`}
          />
          {errors.password && (
            <div className="text-red-500 text-sm">{errors.password}</div>
          )}
        </div>
        
        <button type="submit">
          Register
        </button>

        <div className="mt-4 text-center">
          <Link 
            to="/login"
            className="text-orange-600 hover:underline text-sm"
          >
            Or Login
          </Link>
        </div>
      </form>
    </div>
  );
}
