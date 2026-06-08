"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Layers,
  BarChart3,
  Calendar,
  LineChart,
  LogOut,
  GraduationCap,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/college-admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Students",
    href: "/college-admin/students",
    icon: Users,
  },
  {
    title: "Attendance",
    href: "/college-admin/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Batches",
    href: "/college-admin/batches",
    icon: Layers,
  },
  {
    title: "Reports",
    href: "/college-admin/reports",
    icon: FileSpreadsheet,
  },
  {
    title: "Analytics",
    href: "/college-admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Schedules",
    href: "/college-admin/schedules",
    icon: Calendar,
  },
  {
    title: "Progress Tracker",
    href: "/college-admin/progress",
    icon: LineChart,
  },
];

export default function CollegeAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuthStore();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    if (!isAuthenticated) {
      router.push("/college-admin-login");
    } else if (user?.role !== "COLLEGE_ADMIN") {
      router.push("/college-admin-login");
    } else {
      setIsAuthorized(true);
    }
  }, [hasMounted, user, isAuthenticated, router]);

  if (!isAuthorized) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/college-admin-login");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50 flex">
      {/* College Admin Sidebar */}
      <aside className="w-64 border-r bg-card text-card-foreground flex flex-col h-screen fixed left-0 top-0 z-30">
        <div className="h-16 flex items-center px-6 border-b border-muted">
          <Link href="/college-admin/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white shadow-[0_2px_8px_rgba(13,148,136,0.25)]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-teal-800 dark:text-teal-400">College Portal</span>
          </Link>
        </div>

        <nav className="flex-1 flex flex-col gap-1 p-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-teal-500/10 text-teal-700 dark:text-teal-400 font-medium"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-muted space-y-2">
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-muted-foreground truncate">{user?.name || "College Admin"}</p>
            <p className="text-[10px] text-teal-600 dark:text-teal-400 font-medium tracking-wide truncate">COLLEGE ADMIN</p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/5 cursor-pointer text-xs"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-16 border-b bg-card flex items-center justify-between px-8 sticky top-0 z-20">
          <div>
            <h1 className="text-sm font-semibold text-muted-foreground">M2I Learning Management System</h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground bg-accent py-1 px-3 rounded-full">
              Mock Institution Portal
            </span>
          </div>
        </header>
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
