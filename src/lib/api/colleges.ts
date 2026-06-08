import apiClient from "./client";
import type {
  College,
  User,
  ApiResponse,
  PaginatedResponse,
  DashboardStats,
} from "@/types";

interface CreateCollegeDto {
  name: string;
  code: string;
  address: string;
}

interface CreateCollegeAdminDto {
  name: string;
  email: string;
  password: string;
  collegeId: string;
}

export const collegesApi = {
  getAll: (page = 1, limit = 10, search?: string) =>
    apiClient.get<PaginatedResponse<College>>("/colleges", {
      params: { page, limit, search },
    }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<College>>(`/colleges/${id}`),

  create: (data: CreateCollegeDto) =>
    apiClient.post<ApiResponse<College>>("/colleges", data),

  update: (id: string, data: Partial<CreateCollegeDto>) =>
    apiClient.put<ApiResponse<College>>(`/colleges/${id}`, data),

  toggleStatus: (id: string) =>
    apiClient.patch<ApiResponse<College>>(`/colleges/${id}/status`),

  createAdmin: (data: CreateCollegeAdminDto) =>
    apiClient.post<ApiResponse<User>>(`/colleges/${data.collegeId}/admins`, {
      name: data.name,
      email: data.email,
      password: data.password,
    }),

  getAdmins: (collegeId: string) =>
    apiClient.get<ApiResponse<User[]>>(`/colleges/${collegeId}/admins`),

  getStats: () => apiClient.get<ApiResponse<DashboardStats>>("/colleges/stats"),
};
