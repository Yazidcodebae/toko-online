import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { authenticatedRoutes, unAuthenticatedRoutes } from "./commons/router";
import { PrivateRoute } from "./components/atoms";

const Router = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <BrowserRouter>
      <Switch>
        {unAuthenticatedRoutes.map((route, i) => {
          return (
            <Route
              path={route.path}
              exact
              component={route.component}
              key={i}
            />
          );
        })}
        {authenticatedRoutes.map((route, i) => {
          return (
            <PrivateRoute
              path={route.path}
              component={route.component}
              isLogin={!!token}
              exact
              key={i}
            />
          );
        })}
        {!token ? <Redirect to="/login" /> : <Redirect to="/product" />}
        <Route path="*" component={() => <div>404</div>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
