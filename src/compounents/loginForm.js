import "../../src/compounents/styles.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const localData = () => {
  let userlist = localStorage.getItem("users");

  if (userlist) {
    return JSON.parse(userlist);;
  } else {
    return [];
  }
};

const LoginForm = () => {
  const navigate = useNavigate();

  const routeToRegister = () => {
    navigate("/registration");
  };

  const [isUsersState, setUsersState] = useState(false);
  const [users, setUsers] = useState(localData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {

    const users = localData();
    const user = users.find((user) => email === user.email && password === user.password
    );

    if (user) {
      console.log(user)
      console.log("login succefull");
      navigate("../home");
      
    } else {
      console.log("Invalid email or password");
    }
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    const usersInfo = localStorage.getItem("users");
    if (usersInfo) {
      const parsedTodo = JSON.parse(usersInfo);
      setUsers(parsedTodo);
    }
  }, []);

  return (
    <form
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
      onSubmit={handleSubmit}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label
          style={{ marginBottom: "5px", fontWeight: "bold" }}
          htmlFor="email"
        >
          Email
        </label>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@gmail.com"
          style={{
            padding: "8px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          name="email"
          required
        />

        <label
          style={{ marginBottom: "5px", fontWeight: "bold" }}
          htmlFor="password"
        >
          Password
        </label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*******"
          style={{
            padding: "8px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          name="password"
          required
        />

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Log In
        </button>
      </div>

      <div
        style={{
          marginTop: "10px",
          textAlign: "center",
          fontSize: "14px",
          color: "#555",
        }}
      >
        <span onClick={routeToRegister} style={{ cursor: "pointer" }}>
          Don't have an account? Register here
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
