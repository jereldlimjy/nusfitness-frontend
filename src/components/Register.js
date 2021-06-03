import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Register = ({ handleAlert, loggedIn, setLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const heroku = "https://salty-reaches-24995.herokuapp.com/register";
  const localHost = "http://localhost:3000/register";
  const onSubmit = (e) => {
    e.preventDefault();
    fetch(localHost, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user._id) {
          handleAlert("Successfully registered!", "success");
          setLoggedIn(true);
          history.push("/");
        } else {
          handleAlert("Failed to register, please try again! :(", "danger");
          setEmail("");
          setPassword("");
        }
      });
  };

  return (
    <div className="container">
      <div className="card text-center w-40 mt-3">
        <h2>Register</h2>
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
