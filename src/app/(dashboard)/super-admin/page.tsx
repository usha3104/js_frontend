"use client";

import {
  Building2,
  Users,
  FileText,
  ClipboardCheck,
  GraduationCap,
  CheckCircle2,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Colleges",
    value: "24",
    icon: Building2,
    change: "+2 this month",
    changeType: "positive",
  },
  {
    title: "Published Applications",
    value: "18",
    icon: FileText,
    change: "Across 12 colleges",
    changeType: "positive",
  },
  {
    title: "Active Forms",
    value: "8",
    icon: ClipboardCheck,
    change: "Registration active",
    changeType: "neutral",
  },
  {
    title: "Applications Received",
    value: "1,248",
    icon: Users,
    change: "+124 today",
    changeType: "positive",
  },
  {
    title: "Students Selected",
    value: "156",
    icon: CheckCircle2,
    change: "Evaluation completed",
    changeType: "positive",
  },
  {
    title: "Students Onboarded",
    value: "84",
    icon: GraduationCap,
    change: "Verified & Enrolled",
    changeType: "positive",
  },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Super Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform-wide monitoring and onboarding overview
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Registration Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg bg-muted/10">
              Registration application trends over time (Chart)
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Onboarding Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "College Onboarded", name: "Global Tech", time: "2 hours ago", status: "Completed" },
                { action: "Admin Created", name: "Admin (Global Tech)", time: "5 hours ago", status: "Active" },
                { action: "Form Published", name: "Summer Internship", time: "1 day ago", status: "Published" },
                { action: "Application Received", name: "John Smith", time: "1 day ago", status: "Pending" },
                { action: "Student Onboarded", name: "Sarah Connor", time: "2 days ago", status: "Success" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">{activity.status}</p>
                    <p className="text-[10px] text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
