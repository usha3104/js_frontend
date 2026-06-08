export type Role = "SUPER_ADMIN" | "M2I_ADMIN" | "COLLEGE_ADMIN" | "MENTOR" | "STUDENT" | "COMPANY";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  collegeId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface College {
  id: string;
  name: string;
  code: string;
  address: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface FormField {
  id: string;
  formId: string;
  fieldType:
    | "text"
    | "textarea"
    | "dropdown"
    | "checkbox"
    | "radio"
    | "multi-select"
    | "file"
    | "date"
    | "number"
    | "email";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
  validationRules?: Record<string, unknown>;
  order: number;
}

export interface Form {
  id: string;
  collegeId: string;
  title: string;
  description?: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  slug: string;
  fields: FormField[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  formId: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  status: "PENDING" | "UNDER_REVIEW" | "SHORTLISTED" | "REJECTED" | "SELECTED";
  answers: ApplicationAnswer[];
  evaluation?: Evaluation;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationAnswer {
  id: string;
  applicationId: string;
  fieldId: string;
  value: string | string[];
}

export interface Evaluation {
  id: string;
  applicationId: string;
  evaluatorId: string;
  evaluatorName: string;
  remarks: string;
  score: number;
  skillsScore?: number;
  resumeScore?: number;
  academicScore?: number;
  interviewScore?: number;
  status: "PENDING" | "COMPLETED";
  interviewDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  duration: number;
  modules: CourseModule[];
  createdAt: string;
  updatedAt: string;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl?: string;
  content?: string;
  order: number;
}

export interface Enrollment {
  id: string;
  studentId: string;
  courseId: string;
  course: Course;
  progress: number;
  status: "ENROLLED" | "IN_PROGRESS" | "COMPLETED";
  enrolledAt: string;
  completedAt?: string;
}

export interface Certificate {
  id: string;
  studentId: string;
  enrollmentId: string;
  courseTitle: string;
  issuedAt: string;
  certificateUrl?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface DashboardStats {
  totalColleges?: number;
  activeColleges?: number;
  totalStudents?: number;
  totalApplications?: number;
  pendingReviews?: number;
  selectedStudents?: number;
  activeCourses?: number;
}
