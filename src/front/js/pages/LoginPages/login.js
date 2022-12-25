import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Link, Navigate } from "react-router-dom";

import { useState } from "react/cjs/react.development";

const Login = () => {
  const formInicial = { email: "", password: "" };

  const { store, actions } = useContext(Context);
  const [loginInfo, setDatosLogin] = useState({ email: "", password: "" });
  const [validacion, setValidacion] = useState(false);
  const [error, setError] = useState("");
  const [errorValidadcion, setErrorValidacion] = useState(false);

  console.log("Desde Home", store.datos);

  const handleReset = () => {
    setDatosLogin(formInicial);
  };

  const handleChange = (e) => {
    setDatosLogin({
      ...loginInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValidacion(true);
    if (loginInfo.email == "" || loginInfo.password == "") {
      setError("Todos los campos son obligatorios");
      return;
    }
    setValidacion(false);
    actions.setLogin(loginInfo);

    if (!store.datos) {
      setErrorValidacion(true);
      return;
    }
    setErrorValidacion(false);
    handleReset();
  };

  return (
    <div className=" container">
      <div className="App row row-cols-2 g-3 mt-5">
        <div className="logSection col-6">
          <h2>Login</h2>
          {validacion ? (
            <p className="text-center mt-3 alert alert-danger">{error}</p>
          ) : null}

          {errorValidadcion ? (
            <p className="text-center mt-3 p-1 alert alert-danger">
              Not valid Email or Password
            </p>
          ) : null}
          <form onSubmit={handleSubmit} >
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
              {store.datos ? (
                <Navigate to={`/private/${store.datos.info_user.id}`} />
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
