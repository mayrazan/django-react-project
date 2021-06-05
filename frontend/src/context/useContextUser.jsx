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
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState({
    accessToken: "",
    refreshToken: "",
  });
  const [isMessageVisible, setMessageVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await getDataApi("users/");
      setCredentials(response);
    })();
  }, []);

  const validateAccount = () => {
    return credentials.filter((el) =>
      el.email === login.email && el.password === login.password
        ? (setIsUser(true), setIsAdmin(true), setUserId(el.id))
        : false
    );
  };

  const redirectToHome = () => {
    if (validateAccount()) {
      setMessageVisible(false);
    } else {
      setMessageVisible(true);
    }
  };

  const handleLogin = () => {
    const result = registerUser(login);
    setToken({ accessToken: result.access, refreshToken: result.refresh });

    setIsAuthenticated(true);
    return result;
  };

  console.log(isAuthenticated);
  const onChangeEmail = (event) => {
    setLogin({ ...login, email: event.target.value });
  };

  const onChangePassword = (event) => {
    setLogin({ ...login, password: event.target.value });
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    api.defaults.headers["Authorization"] = "";
    setIsAuthenticated(false);
  };

  return {
    handleLogin,
    handleLogout,
    isAuthenticated,
    isUser,
    isAdmin,
    credentials,
    token,
    onChangeEmail,
    onChangePassword,
    isMessageVisible,
    redirectToHome,
    login,
    userId,
  };
}
