import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = props => {
  const { isAllowed, component: Component, ...routeProps } = props;
  if (!isAllowed) {
    return <Redirect to="/sign_in" />;
  } else {
    return <Route {...routeProps} component={Component} />;
  }
};

export default AuthRoute