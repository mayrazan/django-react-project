import axios from "axios";

// const proxyURL = "https://cors-anywhere.herokuapp.com/";

const api = axios.create({
  baseURL: `https://60aa6cf566f1d00017772d5d.mockapi.io/api/`,
});

export default api;
