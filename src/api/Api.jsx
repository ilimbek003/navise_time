import axios from "axios";

export const api = axios.create({
  baseURL: "http://217.18.62.110",
});
function getToken() {
  return localStorage.getItem("time");
}
function setToken(token) {
  localStorage.setItem("time", token);
}

export const get = {
  userType: () => {
    return api
      .get(`/test/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching slider items:", error);
        throw error;
      });
  },
  attedance: () => {
    return api
      .get(`/attendance/attedance/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching slider items:", error);
        throw error;
      });
  },
};
