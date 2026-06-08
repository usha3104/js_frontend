"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";
import {
  LayoutDashboard,
  Briefcase,
  Users2,
  BookmarkCheck,
  ShieldCheck,
  LogOut,
  LineChart,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  {
    title: "Company Dashboard",
    href: "/company/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Manage Openings",
    href: "/company/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidate Search",
    href: "/company/candidates",
    icon: Users2,
  },
  {
    title: "Observation Analytics",
    href: "/company/observations",
    icon: LineChart,
  },
  {
    title: "Shortlisted Talent",
    href: "/company/shortlisted",
    icon: BookmarkCheck,
  },
];

export default function CompanyLayout({
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
      router.push("/company-login");
    } else if (user?.role !== "COMPANY") {
      router.push("/company-login");
    } else {
      setIsAuthorized(true);
    }
  }, [hasMounted, user, isAuthenticated, router]);

  if (!isAuthorized) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push("/company-login");
  };

  return (
    <div className="min-h-screen bg-stone-50/50 dark:bg-slate-900/50 flex">
      {/* Company Sidebar */}
      <aside className="w-64 border-r bg-card text-card-foreground flex flex-col h-screen fixed left-0 top-0 z-30">
        <div className="h-16 flex items-center px-6 border-b border-muted">
          <Link href="/company/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-white shadow-[0_2px_8px_rgba(124,58,237,0.25)]">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-violet-800 dark:text-violet-400">Partner Portal</span>
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
                    ? "bg-violet-500/10 text-violet-700 dark:text-violet-400 font-medium"
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
            <p className="text-xs font-semibold text-muted-foreground truncate">{user?.name || "Acme Corp Recruiter"}</p>
            <p className="text-[10px] text-violet-600 dark:text-violet-400 font-medium tracking-wide truncate">HIRING PARTNER</p>
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
            <h1 className="text-sm font-semibold text-muted-foreground">M2I Recruitment Platform</h1>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="font-semibold text-foreground bg-accent py-1 px-3 rounded-full flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Verified Hiring Partner Workspace
            </span>
          </div>
        </header>
        <main className="p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
