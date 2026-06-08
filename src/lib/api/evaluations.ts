import apiClient from "./client";
import type { Evaluation, ApiResponse, PaginatedResponse } from "@/types";

interface CreateEvaluationDto {
  applicationId: string;
  remarks: string;
  score: number;
  skillsScore?: number;
  resumeScore?: number;
  academicScore?: number;
  interviewScore?: number;
  interviewDate?: string;
}

interface UpdateEvaluationDto {
  remarks?: string;
  score?: number;
  skillsScore?: number;
  resumeScore?: number;
  academicScore?: number;
  interviewScore?: number;
  interviewDate?: string;
}

export const evaluationsApi = {
  getByApplication: (applicationId: string) =>
    apiClient.get<ApiResponse<Evaluation[]>>(
      `/evaluations/application/${applicationId}`
    ),

  create: (data: CreateEvaluationDto) =>
    apiClient.post<ApiResponse<Evaluation>>("/evaluations", data),

  update: (id: string, data: UpdateEvaluationDto) =>
    apiClient.put<ApiResponse<Evaluation>>(`/evaluations/${id}`, data),

  complete: (id: string) =>
    apiClient.patch<ApiResponse<Evaluation>>(`/evaluations/${id}/complete`),

  getPending: () =>
    apiClient.get<PaginatedResponse<Evaluation>>("/evaluations/pending"),
};
