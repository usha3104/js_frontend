"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { Loader2 } from "lucide-react";

export default function DashboardRedirect() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Role-based redirection
    switch (user?.role) {
      case "SUPER_ADMIN":
        router.push("/super-admin");
        break;
      case "M2I_ADMIN":
        router.push("/admin");
        break;
      case "COLLEGE_ADMIN":
        router.push("/college-admin");
        break;
      case "MENTOR":
        router.push("/mentor");
        break;
      case "STUDENT":
        router.push("/student");
        break;
      case "COMPANY":
        router.push("/company/dashboard");
        break;
      default:
        router.push("/login");
    }
  }, [user, isAuthenticated, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">Loading your dashboard...</p>
      </div>
    </div>
  );
}
