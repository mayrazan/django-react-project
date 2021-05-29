import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/AdminPages/Home";
import RegisterTicket from "../pages/AdminPages/RegisterTicket";
import Manager from "../pages/AdminPages/Manager";
import Tickets from "../pages/AdminPages/Tickets";
import ViewTicket from "../pages/AdminPages/ViewTicket";
import RegisterManagerPage from "../pages/AdminPages/RegisterManagerPage";

const Routes = () => {
  return (
    <BrowserRouter forceRefresh>
      <Switch>
        <Route exact path="/admin" component={Home} />
        <Route exact path="/admin/sindicos" component={Manager} />
        <Route exact path="/admin/chamados" component={Tickets} />
        <Route
          exact
          path="/admin/visualizar-chamado/:id"
          component={ViewTicket}
        />
        <Route
          exact
          path="/admin/cadastro-chamado"
          component={RegisterTicket}
        />
        <Route
          exact
          path="/admin/cadastro-sindico"
          component={RegisterManagerPage}
        />
        <Redirect to="/admin" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
