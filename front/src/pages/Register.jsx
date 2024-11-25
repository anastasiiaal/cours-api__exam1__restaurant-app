import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../store/features/auth/authActions";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState(""); // Add name state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }
    dispatch(register({ name, email, password }));
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <Link to="/login">Or Login</Link>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
