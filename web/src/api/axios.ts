import axios, {
  type AxiosResponse,
  type AxiosError,
  type InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth";
import { translateError } from "@/utils/translations";
import { toCamelCase, toSnakeCase } from "@/utils/caseConverters";

let activeRequests = 0;
let listeners: Array<() => void> = [];

export const isLoading = () => activeRequests > 0;
export const onLoadingChange = (cb: () => void) => {
  listeners.push(cb);
  return () => {
    listeners = listeners.filter((l) => l !== cb);
  };
};
const notify = () => listeners.forEach((cb) => cb());

let unauthorizedNotified = false;
const notifyUnauthorizedOnce = (
  message = "Sessão expirada. Faça login novamente."
) => {
  if (unauthorizedNotified) return;
  unauthorizedNotified = true;
  toast.error(translateError(message));
  setTimeout(() => (unauthorizedNotified = false), 5000);
};

const api = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  activeRequests++;
  notify();

  if (config.data && typeof config.data === "object") {
    config.data = toSnakeCase(config.data);
  }

  if (!config.headers) config.headers = new AxiosHeaders();
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    activeRequests--;
    notify();

    if (response.data && typeof response.data === "object") {
      response.data = toCamelCase(response.data);
    }

    return response;
  },
  (error: AxiosError) => {
    activeRequests--;
    notify();

    const authStore = useAuthStore.getState();
    const NOT_AUTHORIZED = "Para acesso realize login";

    const data = error.response?.data as any;
    const message =
      data?.error ||
      (Array.isArray(data?.errors) ? data.errors.join(", ") : data?.errors);

    if (error.response?.status === 401) {
      authStore.clearUser?.();
      notifyUnauthorizedOnce(message || NOT_AUTHORIZED);

      return Promise.reject({ ...error, isUnauthorized: true });
    } else {
      toast.error(translateError(message));
    }

    return Promise.reject(error);
  }
);

export default api;
