import axios from "axios";

// http://127.0.0.1:8000/api/

// https://condominio-quinta.herokuapp.com/api/

const api = axios.create({
  baseURL: `https://condominio-quinta.herokuapp.com/api/`,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

const refreshToken = () => {
  const refreshBody = { refresh: localStorage.getItem("refresh") };
  return api
    .post(`token/refresh/`, refreshBody)
    .then((response) => {
      localStorage.setItem("access", response.data.access);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
};

const isCorrectRefreshError = (status) => {
  return status === 401;
};

const authRequest = axios.create({
  baseURL: `https://condominio-quinta.herokuapp.com/api/`,
  timeout: 5000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access")}`,
    "Content-Type": "application/json",
  },
});
authRequest.interceptors.response.use(
  (response) => response, // this is for all successful requests.
  (error) => {
    //handle the request
    return errorInterceptor(error);
  }
);

const errorInterceptor = (error) => {
  const originalRequest = error.config;
  const status = error.response.status;
  if (isCorrectRefreshError(status)) {
    return refreshToken()
      .then((data) => {
        const headerAuthorization = `Bearer ${localStorage.getItem("access")}`;
        authRequest.defaults.headers["Authorization"] = headerAuthorization;
        originalRequest.headers["Authorization"] = headerAuthorization;
        return authRequest(originalRequest);
      })
      .catch((error) => {
        // if token refresh fails, logout the user to avoid potential security risks.
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("userLogged");
        localStorage.removeItem("role");
        authRequest.defaults.headers["Authorization"] = "";
        return Promise.reject(error);
      });
  }
  return Promise.reject(error);
};

export default api;
