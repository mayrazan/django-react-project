import { useState, useEffect } from "react";
import api from "../services/api";
import { registerUser, getDataApi } from "../services/infoApi";

export default function useContextUser() {
  const [credentials, setCredentials] = useState([]);
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMessageVisible, setMessageVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getDataApi("users/");
      setCredentials(response);
    })();
  }, []);

  let userAdmin = "";
  let isAdminLogged = null;
  const redirectToHome = () => {
    if (login.email && login.password) {
      let result = credentials.filter((el) => el.email === login.email);
      localStorage.setItem("userLogged", JSON.stringify(result));

      if (result.length > 0) {
        let userJsonString = localStorage.getItem("userLogged");
        if (userJsonString) {
          userAdmin = JSON.parse(userJsonString);
        }
        isAdminLogged = userAdmin.map((el) => el.isAdmin);

        if (isAdminLogged[0]) {
          handleLogin();
          localStorage.setItem("role", JSON.stringify(true));
        } else {
          handleLogin();
          localStorage.setItem("role", JSON.stringify(false));
        }
      } else {
        setMessageVisible(true);
        alert("login invalido");
        localStorage.removeItem("userLogged");
        window.location = "/condominio";
      }
    } else {
      setMessageVisible(true);
      alert("login invalido");
      window.location = "/condominio";
    }
  };

  const handleLogin = () => {
    (async () => {
      const success = await registerUser(login);
      if (success) {
        window.location = "/";
      }
    })();
  };

  let userJSON = JSON.parse(localStorage.getItem("role"));

  useEffect(() => {
    const tokenAccess = localStorage.getItem("access");
    const tokenRefresh = localStorage.getItem("refresh");

    if (userJSON) {
      if (userJSON === true) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }

    if (tokenAccess && tokenRefresh) {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      setIsAuthenticated(false);
      localStorage.removeItem("userLogged");
      localStorage.removeItem("role");
    }
  }, [userJSON]);

  const onChangeEmail = (event) => {
    setLogin({ ...login, email: event.target.value });
  };

  const onChangePassword = (event) => {
    setLogin({ ...login, password: event.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("userLogged");
    localStorage.removeItem("role");
    api.defaults.headers["Authorization"] = "";
    setIsAuthenticated(false);
  };

  return {
    handleLogin,
    handleLogout,
    isAuthenticated,
    credentials,
    onChangeEmail,
    onChangePassword,
    redirectToHome,
    login,
    loading,
    isAdmin,
    isMessageVisible,
  };
}
