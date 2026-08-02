import { APIConnector } from "../apiConnector";

const AUTH_ENDPOINTS = {
  REGISTER: "api/auth/register",
  LOGIN: "api/auth/login",
};

export async function registerUser(body) {
  return await APIConnector("POST", AUTH_ENDPOINTS.REGISTER, body);
}

export async function loginUser(body) {
  return await APIConnector("POST", AUTH_ENDPOINTS.LOGIN, body);
}
