import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";
import loginStyles from "./styles/Login.module.sass";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, name };
    authService
      .signup(requestBody)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        const errorDescription = error.response
          ? error.response.data.message
          : error.message;
        setErrorMessage("❌ " + errorDescription);
      });
  };

  return (
    <div className={loginStyles.login}>
      <form onSubmit={handleSignupSubmit}>
        <fieldset>
          <label htmlFor="name" className="">
            Username
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleName}
            className=""
            autoComplete="off"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmail}
            className=""
            autoComplete="off"
          />
        </fieldset>

        <fieldset>
          <label htmlFor="password" className="">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePassword}
            className=""
            autoComplete="off"
          />
        </fieldset>

        <button type="submit">Sign up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p className="mt-10 mb-2">
        Already have an account?<Link to={"/login"}> Log in</Link>
      </p>
    </div>
  );
}

export default SignupPage;
