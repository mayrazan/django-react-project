import api from "./api";

export async function getDataApi(url) {
  const response = await api.get(url);
  return response.data;
}

export async function registerInfo(url, form = {}) {
  const response = await api.post(url, form);
  return response.data;
}

export async function updateTicket(id, item = {}) {
  const response = await api.put(`tickets/${id}`, item);
  return response.data;
}

export async function updateUser(id, item = {}) {
  const response = await api.put(`users/${id}`, item);
  return response.data;
}

export async function updateProblems(id, item = {}) {
  const response = await api.put(`problems/${id}`, item);
  return response.data;
}

export async function deleteInfo(id) {
  const response = await api.delete(`tickets/${id}`);
  return response.data;
}
