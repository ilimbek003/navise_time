import axios from "axios";

export const api = axios.create({
  baseURL: "http://217.18.62.110",
});

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
  userInfo: () => {
    const token = localStorage.getItem("tokens");
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    return api
      .get(`/user/info`, {
        headers: headers,
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching slider items:", error);
        throw error;
      });
  },
  salary: () => {
    return api
      .get(`/attendance/salary`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching slider items:", error);
        throw error;
      });
  },
};
