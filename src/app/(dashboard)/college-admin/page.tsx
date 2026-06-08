"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CollegeAdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/college-admin/dashboard");
  }, [router]);

  return null;
}
