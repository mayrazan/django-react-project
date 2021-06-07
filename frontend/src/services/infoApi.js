import api from "./api";
const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods":
      "HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, X-Auth-Token, X-JSON, Authorization",
    "Content-type":
      "Application/json, application/x-www-form-urlencoded, multipart/form-data, text/plain, Accept",
  },
};

export async function getDataApi(url) {
  const response = await api.get(url, config.headers, {
    credentials: true,
    origin: true,
    exposedHeaders: "*",
  });
  return response.data;
}

export async function getUser(id) {
  const response = await api.get(`users/${id}/`, config.headers, {
    withCredentials: true,
  });
  return response.data;
}

export async function getUserTickets(id) {
  const response = await api.get(`tickets/users/${id}/`, config.headers, {
    withCredentials: true,
  });
  return response.data;
}

export async function registerInfo(url, form = {}) {
  const response = await api.post(url, form);
  return response.data;
}

export function registerUser(form = {}) {
  return api
    .post(`token/`, form)
    .then((response) => {
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}

export async function updateTicket(id, item = {}) {
  const response = await api.put(`tickets/${id}/`, item);
  return response.data;
}

export async function updateTicketPatch(id, item = {}) {
  const response = await api.patch(`tickets/${id}/`, item);
  return response.data;
}

export async function updateUser(id, item = {}) {
  const response = await api.put(`users/${id}/`, item);
  return response.data;
}

export async function updateProblems(id, item = {}) {
  const response = await api.put(`problems/${id}/`, item);
  return response.data;
}

export async function deleteInfo(id) {
  const response = await api.delete(`tickets/${id}`);
  return response.data;
}

export async function deleteManager(id) {
  const response = await api.delete(`users/${id}`);
  return response.data;
}

export async function deleteUser(id) {
  const response = await api.delete(`users/${id}`);
  return response.data;
}

export async function updateProfile(id, item = {}) {
  const response = await api.patch(`users/${id}/`, item);
  return response.data;
}
