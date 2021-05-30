import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../pages/AdminPages/Home";
import RegisterTicket from "../pages/AdminPages/RegisterTicket";
import Manager from "../pages/AdminPages/Manager";
import Tickets from "../pages/AdminPages/Tickets";
import ViewTicket from "../pages/AdminPages/ViewTicket";
import RegisterManagerPage from "../pages/AdminPages/RegisterManagerPage";
import Renter from "../pages/AdminPages/Renter";
import ViewRenter from "../pages/AdminPages/ViewRenter";
import RegisterUser from "../pages/UserPages/RegisterUser";
import RegisterTicketUser from "../pages/UserPages/RegisterTicket";
import UserHome from "../pages/UserPages/Home";
import ViewTickets from "../pages/UserPages/ViewTickets";
import Problems from "../pages/AdminPages/Problems";
import Notifications from "../pages/AdminPages/Notifications";

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
        <Route exact path="/admin/condominos" component={Renter} />
        <Route
          exact
          path="/admin/visualizar-condomino/:id"
          component={ViewRenter}
        />
        <Route exact path="/admin/cadastro-problemas" component={Problems} />
        <Route exact path="/admin/avisos" component={Notifications} />
        <Route exact path="/cadastro" component={RegisterUser} />
        <Route exact path="/cadastro-chamado" component={RegisterTicketUser} />
        <Route exact path="/" component={UserHome} />
        <Route exact path="/chamados" component={ViewTickets} />
        <Redirect to="/admin" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
