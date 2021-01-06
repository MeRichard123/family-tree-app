import React from "react";
import { Route, Redirect } from "react-router-dom";

type PrivateTypes = {
  component: any;
  path: string;
};

const PrivateRoute = ({ component: Component, ...rest }: PrivateTypes) => {
  const isAuthenticated: boolean = false;
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
