
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
        role: role.toUpperCase(),
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "ADMIN") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      alert("Invalid login credentials");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ padding: "10px", margin: "10px 0", width: "100%" }}
        >
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        {role === "user" && (
          <p className="login-footer">
            Don't have an account?{" "}
            <span
              className="register-link"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
