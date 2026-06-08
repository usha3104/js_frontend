import apiClient from "./client";
import type { User, LoginCredentials, AuthTokens, ApiResponse } from "@/types";
import { mockAuth } from "../mock-data";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
        "/auth/login",
        credentials
      );
      return response;
    } catch (error: any) {
      // If network error, OR a 404/502 (happens if frontend port 3001 clashes with API), use mock data
      const isOffline = !error.response || error.code === 'ERR_NETWORK' || [404, 502].includes(error.response?.status);
      
      if (isOffline) {
        console.warn("Backend not reachable. Falling back to mock auth.");
        try {
          const mockResult = await mockAuth.login(credentials.email, credentials.password);
          return { data: { data: mockResult, success: true, message: "Mock login successful" } } as any;
        } catch (mockError: any) {
          throw { response: { data: { message: mockError.message } } };
        }
      }
      throw error;
    }
  },

  register: async (data: Partial<User> & { password: string }) => {
    try {
      const response = await apiClient.post<ApiResponse<{ user: User; tokens: AuthTokens }>>(
        "/auth/register",
        data
      );
      return response;
    } catch (error: any) {
      const isOffline = !error.response || error.code === 'ERR_NETWORK' || [404, 502].includes(error.response?.status);
      
      if (isOffline) {
        console.warn("Backend not reachable. Falling back to mock auth.");
        try {
          const mockResult = await mockAuth.register(data);
          return { data: { data: mockResult, success: true, message: "Mock registration successful" } } as any;
        } catch (mockError: any) {
          throw { response: { data: { message: mockError.message } } };
        }
      }
      throw error;
    }
  },

  forgotPassword: (email: string) =>
    apiClient.post<ApiResponse<void>>("/auth/forgot-password", { email }),

  resetPassword: (token: string, password: string) =>
    apiClient.post<ApiResponse<void>>("/auth/reset-password", {
      token,
      password,
    }),

  getProfile: () => apiClient.get<ApiResponse<User>>("/auth/profile"),

  updateProfile: (data: Partial<User>) =>
    apiClient.put<ApiResponse<User>>("/auth/profile", data),

  changePassword: (currentPassword: string, newPassword: string) =>
    apiClient.post<ApiResponse<void>>("/auth/change-password", {
      currentPassword,
      newPassword,
    }),

  logout: () => apiClient.post<ApiResponse<void>>("/auth/logout"),
};
