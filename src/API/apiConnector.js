import axios from "axios";
import { getAccessToken, setToken, removeToken, getRefreshToken } from "./token";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        removeToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${BASE_URL}api/auth/refresh-token`, {
          refreshToken,
        });

        const newAccessToken = response.data.accessToken;
        setToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        removeToken();
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export const APIConnector = async (method, url, bodyData = null, headers = {}, params = {}) => {
  const response = await axiosInstance.request({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });

  return response.data;
};
