import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Link, Navigate } from "react-router-dom";

import { useState } from "react/cjs/react.development";

const Login = () => {
  const initForm = { email: "", password: "" };

  const { store, actions } = useContext(Context);
  //states for the info, info error, validation y validation error
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [validation, setValidation] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState(false);

  console.log("Desde Home", store.body);

  const handleReset = () => {
    setLoginInfo(initForm);
  };

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  //this handle the submit behavior
  const handleSubmit = (e) => {
    e.preventDefault();

    setValidation(true);
    if (loginInfo.email == "" || loginInfo.password == "") {
      setError("All fields required");
      return;
    }
    setValidation(false);
    actions.setLogin(loginInfo);

    if (!store.body) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    handleReset();
  };

  return (
    <div className=" container">
      <div className="App row row-cols-2 g-3 mt-5">
        <div className="logSection col-6">
          <h2>Login</h2>
          {validation ? (
            <p className="text-center mt-3 alert alert-danger">{error}</p>
          ) : null}

          {validationError ? (
            <p className="text-center mt-3 p-1 alert alert-danger">
              Not valid Email or Password
            </p>
          ) : null}
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={loginInfo.email}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                value={loginInfo.password}
              />
            </div>
            <div className="d-grid mt-4">
              <button className="signButton">Login</button>
            </div>
            <div className="mt-4 text-center">
              <p className="fw-bold">
                No account? <Link to={"/register"}>Create one Now</Link>
              </p>
              {store.body ? (
                <Navigate to={`/private/${store.body.info_user.id}`} />
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
