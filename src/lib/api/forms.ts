import apiClient from "./client";
import type { Form, FormField, ApiResponse, PaginatedResponse } from "@/types";

interface CreateFormDto {
  collegeId: string;
  title: string;
  description?: string;
}

interface CreateFieldDto {
  formId: string;
  fieldType: FormField["fieldType"];
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  validationRules?: Record<string, unknown>;
  order?: number;
}

export const formsApi = {
  getAll: (collegeId?: string) =>
    apiClient.get<PaginatedResponse<Form>>("/forms", {
      params: { collegeId },
    }),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Form>>(`/forms/${id}`),

  getBySlug: (slug: string) =>
    apiClient.get<ApiResponse<Form>>(`/forms/slug/${slug}`),

  create: (data: CreateFormDto) =>
    apiClient.post<ApiResponse<Form>>("/forms", data),

  update: (id: string, data: Partial<CreateFormDto>) =>
    apiClient.put<ApiResponse<Form>>(`/forms/${id}`, data),

  publish: (id: string) =>
    apiClient.patch<ApiResponse<Form>>(`/forms/${id}/publish`),

  close: (id: string) =>
    apiClient.patch<ApiResponse<Form>>(`/forms/${id}/close`),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/forms/${id}`),

  getFields: (formId: string) =>
    apiClient.get<ApiResponse<FormField[]>>(`/forms/${formId}/fields`),

  createField: (data: CreateFieldDto) =>
    apiClient.post<ApiResponse<FormField>>("/form-fields", data),

  updateField: (id: string, data: Partial<CreateFieldDto>) =>
    apiClient.put<ApiResponse<FormField>>(`/form-fields/${id}`, data),

  deleteField: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/form-fields/${id}`),

  reorderFields: (formId: string, fieldIds: string[]) =>
    apiClient.patch<ApiResponse<FormField[]>>(
      `/forms/${formId}/fields/reorder`,
      { fieldIds }
    ),
};
