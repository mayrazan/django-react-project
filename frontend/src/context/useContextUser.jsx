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
  const [currentUser, setCurrentUser] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await getDataApi("users/");
      setCredentials(response);
    })();
  }, []);

  const redirectToHome = () => {
    if (login.email && login.password) {
      let result = credentials.filter((el) => el.email === login.email);
      localStorage.setItem("userLogged", JSON.stringify(result));
      const user = JSON.parse(localStorage.getItem("userLogged"));
      setCurrentUser(user);
    }
  };

  const handleLogin = () => {
    const result = registerUser(login);
    return result;
  };

  useEffect(() => {
    const tokenAccess = localStorage.getItem("access");
    const tokenRefresh = localStorage.getItem("refresh");
    if (tokenAccess || tokenRefresh) {
      setIsAuthenticated(true);
      setLoading(false);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

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
    currentUser,
    loading,
  };
}
