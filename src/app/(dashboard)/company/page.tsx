"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function CompanyRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/company/dashboard");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground font-medium">Navigating to Partner Workspace...</p>
      </div>
    </div>
  );
}
