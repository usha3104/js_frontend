"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MentorRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.push("/mentor/dashboard");
  }, [router]);

  return null;
}
