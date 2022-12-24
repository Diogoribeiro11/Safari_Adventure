import React from "react";
import { Route, Redirect, Navigate } from "react-router-dom";

const PublicRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isAuthenticated ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/public",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PublicRoute;
