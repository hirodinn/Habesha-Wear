import axios from "axios";

axios.defaults.withCredentials = true;

const API_URL = "/api/users";

// Note: No header interceptor needed as we use HttpOnly cookies

export const login = async (email, password) => {
  // Backend maps POST /users/login
  const response = await axios.post(`${API_URL}/login`, { email, password });
  console.log(response);
  return response.data;
};

export const register = async (userData) => {
  // Backend maps POST /users/ (root of users route)
  const response = await axios.post(`${API_URL}/`, userData);
  return response.data;
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
  } catch (ex) {
    console.error("Logout failed", ex);
  }
};

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  } catch (error) {
    return null;
  }
};
