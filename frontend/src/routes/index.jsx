import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/AdminPages/Home";
import Sindico from "../pages/AdminPages/Sindico";
import Tickets from "../pages/AdminPages/Tickets";
import ViewTicket from "../pages/AdminPages/ViewTicket";

const Routes = () => {
  return (
    <BrowserRouter forceRefresh>
      <Switch>
        <Route exact path="/admin" component={Home} />
        <Route exact path="/admin/sindico" component={Sindico} />
        <Route exact path="/admin/chamados" component={Tickets} />
        <Route
          exact
          path="/admin/visualizar-chamado/:id"
          component={ViewTicket}
        />
        <Redirect to="/admin" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
