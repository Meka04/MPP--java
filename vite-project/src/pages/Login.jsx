import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      localStorage.setItem("role", "Employee");
      localStorage.setItem("id", 1);
      onLogin("Employee");

      if (response.ok) {
        // ✅ Check HTTP status
        const data = await response.text();
        console.log("Login successful", data);

        if (onLogin) {
          onLogin(data);
        }

        navigate("/employees");
      } else {
        const errorMessage = await response.text();
        setMessage(errorMessage || "Invalid username or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;
