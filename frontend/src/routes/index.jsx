import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
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
import Login from "../pages/Login";
// import LoginUser from "../components/shared/LoginContainer/LoginUser";
import LoginAdmin from "../components/shared/LoginContainer/LoginAdmin";
import { useUserContext } from "../context/ContextUser";
import Profile from "../pages/Profile";
import Tags from "../pages/AdminPages/Tags";

const Routes = () => {
  const { isAuthenticated, isAdmin } = useUserContext();
  // const user = JSON.parse(localStorage.getItem("userLogged"));
  // const isAdmin = user !== null && user !== undefined ? user[0].isAdmin : false;

  return (
    <BrowserRouter>
      <Switch>
        {isAuthenticated ? (
          <>
            <Route exact path="/meu-perfil" component={Profile} />
            {isAdmin ? (
              <>
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
                <Route
                  exact
                  path="/admin/cadastro-perturbacao"
                  component={Problems}
                />
                <Route exact path="/admin/avisos" component={Notifications} />
                <Route exact path="/admin/tags" component={Tags} />
                <Redirect to="/admin" />
              </>
            ) : (
              <>
                <Route
                  exact
                  path="/cadastro-chamado"
                  component={RegisterTicketUser}
                />
                <Route exact path="/" component={UserHome} />
                <Route exact path="/chamados" component={ViewTickets} />
                <Redirect to="/" />
              </>
            )}
          </>
        ) : (
          <>
            <Route exact path="/condominio" component={Login} />
            {/* <Route exact path="/login-usuario" component={LoginUser} /> */}
            <Route exact path="/login" component={LoginAdmin} />
            <Route exact path="/cadastro" component={RegisterUser} />
            <Redirect to="/condominio" />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
