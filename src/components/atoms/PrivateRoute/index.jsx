import React from "react";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = (props) => {
  return (
    <Route
      path={props.path}
      exact={props.exact}
      render={() => {
        return props.isLogin ? <props.component /> : <Redirect to="/login" />;
      }}
    />
  );
};

export default PrivateRoute;
