import axios from "axios";
// import secureStorage from "./src/components/helper/secureStorage";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { refreshTokenAxios } from '../src/_api/admin';

// Using import.meta.env for Vite environment variables
const baseUrl = (import.meta.env as any).VITE_API_URL || (import.meta.env as any).NEXT_PUBLIC_API_URL || '';

const axiosClient = axios.create({
  baseURL: baseUrl,
});

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    Cookies.remove("token");
    Cookies.remove("userToken");
    // Cookies.remove("userRole");
    // Cookies.remove("full_name");
    // Cookies.remove("is_profile_completed");
    // secureStorage.removeItem("type");
    window.location.replace("/login");
  }
};

// ✅ REQUEST
axiosClient.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = Cookies.get("token");
      if (token) {
        config.headers.Authorization = token;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ RESPONSE
axiosClient.interceptors.response.use(
  (response) => {
    // Case 1: Backend uses errCode pattern
    if (
      response.data?.isLoggedOut === true ||
      (response.data?.errCode === 1 &&
        (
          response.data?.errMsg?.includes("Session not found") ||
          response.data?.errMsg?.includes("Session Timeout") ||
          response.data?.errMsg?.includes("Invalid Token")
        ))
    ) {
      const isAuthRequest = response.config?.url?.includes("/auth/");
      const isLoginPage = typeof window !== "undefined" && (window.location.pathname === "/login" || window.location.pathname === "/register");

      if (!isAuthRequest && !isLoginPage) {
        toast.error("Session timeout, redirecting to login page", {
          id: "session-timeout",
        });
        redirectToLogin();
      }
      return Promise.reject(new Error(response.data.errMsg || "Session expired"));
    }

    return response;
  },
  async (error) => {
    // Case 2: HTTP status based auth failure
    const originalRequest = error.config;
    const status = error?.response?.status;
    const isAuthRequest = originalRequest?.url?.includes("/auth/");
    const isLoginPage = typeof window !== "undefined" && (window.location.pathname === "/login" || window.location.pathname === "/register");

    if (status === 401 && !originalRequest._retry && !isAuthRequest) {
      originalRequest._retry = true;
      try {
        const refreshToken = Cookies.get("refreshToken") || Cookies.get("token");
        if (refreshToken) {
          const data = await refreshTokenAxios(refreshToken);
          const newToken = data?.accessToken || data?.token || data?.data?.token;
          if (newToken) {
            Cookies.set("token", newToken, { expires: 1 });
            originalRequest.headers.Authorization = newToken;
            return axiosClient(originalRequest);
          }
        }
      } catch (e) {
        // Refresh failed, fall through to redirect
      }
    }

    if ((status === 401 || status === 403 || status === 419) && !isAuthRequest && !isLoginPage) {
      toast.error("Session timeout, redirecting to login page", {
        id: "session-timeout",
      });
      redirectToLogin();
    }

    return Promise.reject(error);
  }
);

export default axiosClient;