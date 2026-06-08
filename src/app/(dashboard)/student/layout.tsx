"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import {
  LayoutDashboard,
  BookOpen,
  ClipboardCheck,
  Award,
  Video,
  Calendar,
  Users,
  User,
  MessageSquare,
  HelpCircle,
  FileText,
  LineChart,
  Lock,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/student/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Courses",
    href: "/student/courses",
    icon: BookOpen,
  },
  {
    title: "Assignments",
    href: "/student/assignments",
    icon: FileText,
  },
  {
    title: "Projects",
    href: "/student/projects",
    icon: Award,
  },
  {
    title: "Attendance History",
    href: "/student/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Feedback System",
    href: "/student/feedback",
    icon: MessageSquare,
  },
  {
    title: "My Mentors",
    href: "/student/mentors",
    icon: Users,
  },
  {
    title: "My Calendar",
    href: "/student/calendar",
    icon: Calendar,
  },
  {
    title: "My Profile",
    href: "/student/profile",
    icon: User,
  },
  {
    title: "Book Meetings",
    href: "/student/meetings",
    icon: HelpCircle,
  },
  {
    title: "Materials Library",
    href: "/student/resources",
    icon: Video,
  },
  {
    title: "Progress Telemetry",
    href: "/student/progress",
    icon: LineChart,
  },
  {
    title: "Hiring Portal (Soon)",
    href: "#",
    icon: Lock,
    disabled: true,
  },
];

export default function StudentLayout({
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
      router.push("/student-login");
    } else if (user?.role !== "STUDENT") {
      router.push("/student-login");
    } else {
      setIsAuthorized(true);
    }
  }, [hasMounted, user, isAuthenticated, router]);

  if (!isAuthorized) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/student-login");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50 flex">
      {/* Student Sidebar */}
      <aside className="w-64 border-r bg-card text-card-foreground flex flex-col h-screen fixed left-0 top-0 z-30">
        <div className="h-16 flex items-center px-6 border-b border-muted">
          <Link href="/student/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white shadow-[0_2px_8px_rgba(244,63,94,0.25)]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-rose-800 dark:text-rose-400">Student Hub</span>
          </Link>
        </div>

        <nav className="flex-1 flex flex-col gap-0.5 p-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return item.disabled ? (
              <div
                key={item.title}
                className="flex items-center gap-2.5 rounded-md px-3 py-1.5 text-xs text-muted-foreground/50 cursor-not-allowed select-none"
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-xs transition-colors",
                  isActive
                    ? "bg-rose-500/10 text-rose-700 dark:text-rose-400 font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-muted space-y-2">
          <div className="px-3 py-1.5">
            <p className="text-xs font-semibold text-muted-foreground truncate">{user?.name || "Amit Sharma"}</p>
            <p className="text-[10px] text-rose-600 dark:text-rose-400 font-semibold tracking-wider truncate">STUDENT ACADEMIC</p>
          </div>
          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/5 cursor-pointer text-xs h-9"
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
            <h1 className="text-xs font-semibold text-muted-foreground">M2I LMS &bull; Student Learning Portal</h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground bg-accent py-1 px-3 rounded-full">
              Amit Sharma &bull; SVKM Tech
            </span>
          </div>
        </header>
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
