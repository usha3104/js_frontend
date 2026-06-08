"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import {
  LayoutDashboard,
  Layers,
  ClipboardCheck,
  BookOpen,
  FolderGit2,
  Users,
  MessageSquareShare,
  Tv,
  FileArchive,
  Calendar,
  Video,
  FileCheck,
  LogOut,
  GraduationCap,
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
    href: "/mentor/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Assigned Batches",
    href: "/mentor/batches",
    icon: Layers,
  },
  {
    title: "Attendance Roster",
    href: "/mentor/attendance",
    icon: ClipboardCheck,
  },
  {
    title: "Assignments",
    href: "/mentor/assignments",
    icon: BookOpen,
  },
  {
    title: "Project Capstones",
    href: "/mentor/projects",
    icon: FolderGit2,
  },
  {
    title: "Students Directory",
    href: "/mentor/students",
    icon: Users,
  },
  {
    title: "Feedback Hub",
    href: "/mentor/feedback",
    icon: MessageSquareShare,
  },
  {
    title: "Live Sessions",
    href: "/mentor/live-sessions",
    icon: Tv,
  },
  {
    title: "Resources Library",
    href: "/mentor/resources",
    icon: FileArchive,
  },
  {
    title: "Scheduler Calendar",
    href: "/mentor/calendar",
    icon: Calendar,
  },
  {
    title: "Upload Recordings",
    href: "/mentor/recordings",
    icon: Video,
  },
  {
    title: "Evaluations Track",
    href: "/mentor/evaluations",
    icon: FileCheck,
  },
];

export default function MentorLayout({
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
      router.push("/mentor-login");
    } else if (user?.role !== "MENTOR") {
      router.push("/mentor-login");
    } else {
      setIsAuthorized(true);
    }
  }, [hasMounted, user, isAuthenticated, router]);

  if (!isAuthorized) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/mentor-login");
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50 flex">
      {/* Mentor Sidebar */}
      <aside className="w-64 border-r bg-card text-card-foreground flex flex-col h-screen fixed left-0 top-0 z-30">
        <div className="h-16 flex items-center px-6 border-b border-muted">
          <Link href="/mentor/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-[0_2px_8px_rgba(79,70,229,0.25)]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-indigo-900 dark:text-indigo-400">Mentor Portal</span>
          </Link>
        </div>

        <nav className="flex-1 flex flex-col gap-0.5 p-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-md px-3 py-1.5 text-xs transition-colors",
                  isActive
                    ? "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-semibold"
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
            <p className="text-xs font-semibold text-muted-foreground truncate">{user?.name || "Dr. Rajesh Kumar"}</p>
            <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold tracking-wider truncate">MENTOR INSTRUCTOR</p>
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
            <h1 className="text-xs font-semibold text-muted-foreground">M2I LMS &bull; Academic Mentorship</h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground bg-accent py-1 px-3 rounded-full">
              Live Instruction Workspace
            </span>
          </div>
        </header>
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
