"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import {
  LayoutDashboard,
  Building2,
  BarChart3,
  FileText,
  Users,
  ClipboardCheck,
  GraduationCap,
  BookOpen,
  Settings,
  Layers,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/super-admin",
    icon: LayoutDashboard,
    roles: ["SUPER_ADMIN"],
  },
  {
    title: "Colleges",
    href: "/super-admin/colleges",
    icon: Building2,
    roles: ["SUPER_ADMIN"],
  },
  {
    title: "College Admins",
    href: "/super-admin/college-admins",
    icon: Users,
    roles: ["SUPER_ADMIN"],
  },
  {
    title: "Registration Forms",
    href: "/super-admin/registration-forms",
    icon: FileText,
    roles: ["SUPER_ADMIN"],
  },
  {
    title: "Applications",
    href: "/super-admin/applications",
    icon: ClipboardCheck,
    roles: ["SUPER_ADMIN"],
  },
  {
    title: "Onboarding",
    href: "/super-admin/onboarding",
    icon: GraduationCap,
    roles: ["SUPER_ADMIN"],
  },
  {
    title: "Reports",
    href: "/super-admin/reports",
    icon: BarChart3,
    roles: ["SUPER_ADMIN"],
  },
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    roles: ["M2I_ADMIN"],
  },
  {
    title: "Colleges",
    href: "/admin/colleges",
    icon: Building2,
    roles: ["M2I_ADMIN"],
  },
  {
    title: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
    roles: ["M2I_ADMIN"],
  },
  {
    title: "Batches",
    href: "/admin/batches",
    icon: Layers,
    roles: ["M2I_ADMIN"],
  },
  {
    title: "Mentors",
    href: "/admin/mentors",
    icon: Users,
    roles: ["M2I_ADMIN"],
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: GraduationCap,
    roles: ["M2I_ADMIN"],
  },
  {
    title: "Attendance",
    href: "/admin/attendance",
    icon: ClipboardCheck,
    roles: ["M2I_ADMIN"],
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
    roles: ["M2I_ADMIN"],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["M2I_ADMIN"],
  },
  {
    title: "Dashboard",
    href: "/college-admin",
    icon: LayoutDashboard,
    roles: ["COLLEGE_ADMIN"],
  },
  {
    title: "Applicants",
    href: "/college-admin/applicants",
    icon: Users,
    roles: ["COLLEGE_ADMIN"],
  },
  {
    title: "Students",
    href: "/college-admin/students",
    icon: GraduationCap,
    roles: ["COLLEGE_ADMIN"],
  },
  {
    title: "Dashboard",
    href: "/student",
    icon: LayoutDashboard,
    roles: ["STUDENT"],
  },
  {
    title: "My Application",
    href: "/student/application",
    icon: FileText,
    roles: ["STUDENT"],
  },
  {
    title: "Courses",
    href: "/student/courses",
    icon: BookOpen,
    roles: ["STUDENT"],
  },
  {
    title: "Progress",
    href: "/student/progress",
    icon: BarChart3,
    roles: ["STUDENT"],
  },
  {
    title: "Certificates",
    href: "/student/certificates",
    icon: GraduationCap,
    roles: ["STUDENT"],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role || "")
  );

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">M2I LMS</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {filteredNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
      <div className="absolute bottom-4 left-4 right-4">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
        >
          <Settings className="h-5 w-5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
