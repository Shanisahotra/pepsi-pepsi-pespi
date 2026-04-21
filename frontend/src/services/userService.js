import axios from "axios";

const API = "http://localhost:5000/api/block";

export const blockUserApi = (id, token) =>
  axios.put(
    `${API}/block/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const unblockUserApi = (id, token) =>
  axios.put(
    `${API}/unblock/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );