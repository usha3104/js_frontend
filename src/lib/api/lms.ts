import apiClient from "./client";
import type {
  Enrollment,
  Course,
  Certificate,
  ApiResponse,
  PaginatedResponse,
  DashboardStats,
} from "@/types";

interface OnboardStudentDto {
  applicationId: string;
  courseId?: string;
}

interface EnrollStudentDto {
  studentId: string;
  courseId: string;
}

export const onboardingApi = {
  onboardStudent: (data: OnboardStudentDto) =>
    apiClient.post<ApiResponse<{ studentId: string }>>(
      "/onboarding",
      data
    ),

  getPendingOnboarding: () =>
    apiClient.get<PaginatedResponse<unknown>>("/onboarding/pending"),

  getStats: () =>
    apiClient.get<ApiResponse<DashboardStats>>("/onboarding/stats"),
};

export const coursesApi = {
  getAll: () => apiClient.get<ApiResponse<Course[]>>("/courses"),

  getById: (id: string) =>
    apiClient.get<ApiResponse<Course>>(`/courses/${id}`),

  create: (data: Partial<Course>) =>
    apiClient.post<ApiResponse<Course>>("/courses", data),

  update: (id: string, data: Partial<Course>) =>
    apiClient.put<ApiResponse<Course>>(`/courses/${id}`, data),

  delete: (id: string) =>
    apiClient.delete<ApiResponse<void>>(`/courses/${id}`),
};

export const enrollmentsApi = {
  getMyEnrollments: () =>
    apiClient.get<ApiResponse<Enrollment[]>>("/enrollments/my"),

  enrollStudent: (data: EnrollStudentDto) =>
    apiClient.post<ApiResponse<Enrollment>>("/enrollments", data),

  updateProgress: (id: string, progress: number) =>
    apiClient.patch<ApiResponse<Enrollment>>(`/enrollments/${id}/progress`, {
      progress,
    }),

  complete: (id: string) =>
    apiClient.patch<ApiResponse<Enrollment>>(`/enrollments/${id}/complete`),
};

export const certificatesApi = {
  getMyCertificates: () =>
    apiClient.get<ApiResponse<Certificate[]>>("/certificates/my"),

  issueCertificate: (enrollmentId: string) =>
    apiClient.post<ApiResponse<Certificate>>(
      `/certificates/issue/${enrollmentId}`
    ),
};
