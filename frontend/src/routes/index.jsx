import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Sindico from "../pages/Sindico";

const Routes = () => {
  return (
    <BrowserRouter forceRefresh>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/sindico" component={Sindico} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
