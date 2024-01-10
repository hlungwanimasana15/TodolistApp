import "../../src/compounents/styles.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  // Routing to login page
  const navigate = useNavigate();

  const localData = () => {
    let userlist = localStorage.getItem("users");

    if (userlist) {
      return JSON.parse(userlist);
    } else {
      return [];
    }
  };

  const routeToLogin = () => {
    navigate("/login");
  };

  const [userInfo, setUserInfo] = useState(localData() || []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const labelStyle = {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333", // Adjust color as needed
  };

  const inputStyle = {
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const loginLinkStyle = {
    cursor: "pointer",
    color: "#007bff",
    fontSize: "14px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = localData();

    let newUser = {
      name,
      email,
      password,
    };

    const updatedUsers = Array.isArray(users) ? users : [];

    //Push the new user data into an array "users"
    updatedUsers.push(newUser);
    //Store the new user data into local storage
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUserInfo((prevUserInfo) => [...prevUserInfo, newUser]);
    alert("user registered");
    setName("");
    setEmail("");
    setPassword("");
    console.log(userInfo);

    navigate("/login");
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(userInfo));
  }, [userInfo]);

  console.log(userInfo);

  return (
    <div
      className="auth-form-container"
      style={{ maxWidth: "300px", margin: "0 auto" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="name" style={labelStyle}>
          Full Name
        </label>
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          style={inputStyle}
          name="name"
          required
        />

        <label htmlFor="email" style={labelStyle}>
          Email
        </label>
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="youremail@gmail.com"
          style={inputStyle}
          name="email"
          required
        />

        <label htmlFor="password" style={labelStyle}>
          Password
        </label>
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="*******"
          style={inputStyle}
          name="password"
          required
        />

        <button type="submit" style={buttonStyle}>
          Register
        </button>

        <br />

        <span onClick={() => navigate("/login")} style={loginLinkStyle}>
          Already have an account? Login here.
        </span>
      </form>
    </div>
  );
};

export default Registration;
