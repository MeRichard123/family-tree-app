import React from "react";
import { Route, Redirect } from "react-router-dom";

type PrivateTypes = {
  component: any;
  path: string;
};

const PrivateRoute = ({ component: Component, ...rest }: PrivateTypes) => {
  let data = localStorage.getItem("isAuthenticated");

  const { isAuthenticated } = JSON.parse(data || "{}");
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthenticated ? (
          <Component {...routeProps} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute;
