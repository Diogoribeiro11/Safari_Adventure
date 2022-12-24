import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { store, actions } = useContext(Context);
  const history = useNavigate();

  const formInicial = {
    name: "",
    last_name: "",
    country: "",
    email: "",
    password: "",
    password_2: "",
    is_active: "",
  };

  const [signupData, guardarDatosFormulario] = useState({
    name: "",
    last_name: "",
    country: "",
    email: "",
    password: "",
    password_2: "",
    is_active: "",
  });
  const [validacion, setValidacion] = useState(false);
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);

  const handleChange = (e) => {
    guardarDatosFormulario({
      ...signupData,
      [e.target.name]: e.target.value,
      [e.target.last_name]: e.target.value,
      [e.target.country]: e.target.value,
    });
  };

  const handleReset = () => {
    guardarDatosFormulario(formInicial);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setValidacion(true);
    if (
      signupData.name.trim() == "" ||
      signupData.last_name.trim() == "" ||
      signupData.country.trim() == "" ||
      signupData.email.trim() == "" ||
      signupData.password == "" ||
      signupData.password_2 == ""
    ) {
      setError("All the fields are required");
      return;
    }
    setValidacion(false);

    if (signupData.password !== signupData.password_2) {
      setErrorPassword(true);
      return;
    }
    setErrorPassword(false);

    actions.setRegister(signupData);
    alert("User Register success");
    history.push("/");

    handleReset();
  };

  return (
    <div className=" container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <h2 className="text-center display-4">Sign Up</h2>
          {validacion ? (
            <p className="text-center mt-3 alert alert-danger">{error}</p>
          ) : null}
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-2">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={handleChange}
                value={signupData.name}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                onChange={handleChange}
                value={signupData.last_name}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">country</label>
              <input
                type="text"
                className="form-control"
                name="country"
                onChange={handleChange}
                value={signupData.country}
              />
            </div>

            <div className="mb-2">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                value={signupData.email}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                value={signupData.password}
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password_2"
                onChange={handleChange}
                value={signupData.password_2}
              />
              {errorPassword ? (
                <p className="text-danger mt-2">*password doesn't match</p>
              ) : null}
            </div>
            <div className="d-grid mt-4">
              <button className="btn btn-success">Register</button>
            </div>
            <div className="mt-4 text-center">
              <p className="fw-bold">
                <Link to={"/"}>LOG IN</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
