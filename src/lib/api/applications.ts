import apiClient from "./client";
import type {
  Application,
  ApplicationAnswer,
  ApiResponse,
  PaginatedResponse,
} from "@/types";

interface SubmitApplicationDto {
  formId: string;
  answers: { fieldId: string; value: string | string[] }[];
}

interface UpdateApplicationStatusDto {
  status: Application["status"];
}

export const applicationsApi = {
  getAll: (formId?: string, status?: string, page = 1, limit = 10) =>
    apiClient.get<PaginatedResponse<Application>>("/applications", {
      params: { formId, status, page, limit },
    }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Application>>(`/applications/${id}`),

  submit: (data: SubmitApplicationDto) =>
    apiClient.post<ApiResponse<Application>>("/applications", data),

  saveDraft: (data: SubmitApplicationDto) =>
    apiClient.post<ApiResponse<Application>>("/applications/draft", data),

  updateStatus: (id: string, data: UpdateApplicationStatusDto) =>
    apiClient.patch<ApiResponse<Application>>(
      `/applications/${id}/status`,
      data
    ),

  getMyApplications: () =>
    apiClient.get<ApiResponse<Application[]>>("/applications/my"),

  uploadDocument: (applicationId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<ApiResponse<{ url: string }>>(
      `/applications/${applicationId}/documents`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  },
};
