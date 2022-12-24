import React, { useContext, useState, useEffect } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";

const PrivateRoute = ({ children }) => {
  const { store, actions } = useContext(Context);
  // const { state} = useLocation()

  console.log(store.user);

  return store.datos?.token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
