import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "https://gs1-java-hikm.onrender.com";

const TOKEN_KEY = "@systhesis:token";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

async function loginAndGetToken() {
  const response = await axios.post(`${API_BASE_URL}/auth/login`, {
    email: "aluno@systhesis.com",
    senha: "aluno123",
  });

  const token =
    response.data?.token ||
    response.data?.accessToken ||
    response.data?.jwt ||
    response.data?.bearerToken;

  if (!token) {
    console.log("RESPOSTA LOGIN:", response.data);
    throw new Error("Token não encontrado na resposta do login.");
  }

  await AsyncStorage.setItem(TOKEN_KEY, token);

  return token;
}

api.interceptors.request.use(async (config) => {
  let token = await AsyncStorage.getItem(TOKEN_KEY);

  if (!token) {
    token = await loginAndGetToken();
  }

  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;

        await AsyncStorage.removeItem(TOKEN_KEY);

        const newToken = await loginAndGetToken();

        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);