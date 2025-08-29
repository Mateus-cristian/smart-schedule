import axios from "axios";

// Use variável de ambiente para facilitar deploy em produção
const api = axios.create({
  baseURL: "http://localhost:3000",
});

let activeRequests = 0;
const listeners: (() => void)[] = [];

export function onLoadingChange(listener: () => void) {
  listeners.push(listener);
}

function notify() {
  listeners.forEach((fn) => fn());
}

// Loader global
api.interceptors.request.use((config) => {
  activeRequests++;
  notify();

  // Só adiciona o token se existir (rotas protegidas)
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = token;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    activeRequests--;
    notify();
    return response;
  },
  (error) => {
    activeRequests--;
    notify();
    throw error;
  }
);

export function isLoading() {
  return activeRequests > 0;
}

export default api;
