"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { useAuthStore } from "@/stores/auth-store";
import { Loader2 } from "lucide-react";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  const isSuperAdminPath = pathname === "/super-admin" || pathname.startsWith("/super-admin/");
  const isAdminPath = pathname === "/admin" || pathname.startsWith("/admin/");
  const isCollegeAdminPath = pathname === "/college-admin" || pathname.startsWith("/college-admin/");
  const isMentorPath = pathname === "/mentor" || pathname.startsWith("/mentor/");
  const isStudentPath = pathname === "/student" || pathname.startsWith("/student/");
  const isCompanyPath = pathname === "/company" || pathname.startsWith("/company/");

  const isLoginPage =
    pathname === "/login" ||
    pathname === "/super-admin-login" ||
    pathname === "/admin-login" ||
    pathname === "/college-admin-login" ||
    pathname === "/mentor-login" ||
    pathname === "/student-login" ||
    pathname === "/company-login";

  useEffect(() => {
    // Small delay to allow Zustand persist to rehydrate
    const timer = setTimeout(() => {
      if (!isAuthenticated) {
        // Redirect to specific login page based on path
        if (isSuperAdminPath) {
          router.push("/super-admin-login");
        } else if (isAdminPath) {
          router.push("/admin-login");
        } else if (isCollegeAdminPath) {
          router.push("/college-admin-login");
        } else if (isMentorPath) {
          router.push("/mentor-login");
        } else if (isStudentPath) {
          router.push("/student-login");
        } else if (isCompanyPath) {
          router.push("/company-login");
        } else {
          if (!isLoginPage) {
            router.push("/login");
          } else {
            setIsChecking(false);
          }
        }
      } else {
        // Enforce strict role isolation guard
        const role = user?.role;
        let isAuthorized = true;

        if (isSuperAdminPath && role !== "SUPER_ADMIN") {
          isAuthorized = false;
        } else if (isAdminPath && role !== "M2I_ADMIN") {
          isAuthorized = false;
        } else if (isCollegeAdminPath && role !== "COLLEGE_ADMIN") {
          isAuthorized = false;
        } else if (isMentorPath && role !== "MENTOR") {
          isAuthorized = false;
        } else if (isStudentPath && role !== "STUDENT") {
          isAuthorized = false;
        } else if (isCompanyPath && role !== "COMPANY") {
          isAuthorized = false;
        }

        // If they are on a login page and are authenticated, redirect to their home dashboard
        if (isLoginPage) {
          if (role === "SUPER_ADMIN") router.push("/super-admin");
          else if (role === "M2I_ADMIN") router.push("/admin/dashboard");
          else if (role === "COLLEGE_ADMIN") router.push("/college-admin/dashboard");
          else if (role === "MENTOR") router.push("/mentor/dashboard");
          else if (role === "STUDENT") router.push("/student/dashboard");
          else if (role === "COMPANY") router.push("/company/dashboard");
        } else if (!isAuthorized) {
          // Redirect unauthorized users to their correct home dashboard
          if (role === "SUPER_ADMIN") router.push("/super-admin");
          else if (role === "M2I_ADMIN") router.push("/admin/dashboard");
          else if (role === "COLLEGE_ADMIN") router.push("/college-admin/dashboard");
          else if (role === "MENTOR") router.push("/mentor/dashboard");
          else if (role === "STUDENT") router.push("/student/dashboard");
          else if (role === "COMPANY") router.push("/company/dashboard");
          else router.push("/login");
        } else {
          setIsChecking(false);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user, pathname, router, isSuperAdminPath, isAdminPath, isCollegeAdminPath, isMentorPath, isStudentPath, isCompanyPath, isLoginPage]);

  if (isChecking) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium">Verifying authorization...</p>
        </div>
      </div>
    );
  }

  // Bypass the default global sidebar/header layout for the new independent role route groups
  const isCustomRoleRoute = isCollegeAdminPath || isMentorPath || isStudentPath || isCompanyPath;

  if (isCustomRoleRoute) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  // Fallback to default Super Admin / M2I Admin layout structure
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
