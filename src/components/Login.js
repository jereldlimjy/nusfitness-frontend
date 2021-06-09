import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = ({ handleAlert, loggedIn, setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    const url = `${
      window.location.hostname === "localhost"
        ? "http://localhost:3000/"
        : "https://salty-reaches-24995.herokuapp.com/"
    }login`;

    fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          handleAlert("Successfully logged in!", "success");
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        handleAlert("Failed to login, please try again! :(", "danger");
        setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="container">
      <div className="card text-center w-40 mt-3">
        <h2>Login</h2>
        <form onSubmit={onSubmit} className="m-1">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="mb-2"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            id="email"
            name="email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            id="password"
            name="password"
            required
          />

          <button
            type="submit"
            onSubmit={onSubmit}
            className="btn btn-light mt-1"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
