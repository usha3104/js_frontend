"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Layers, ClipboardCheck, Award, TrendingUp } from "lucide-react";

export default function CollegeAdminDashboard() {
  const kpiData = [
    {
      title: "Total Students",
      value: "450",
      description: "Enrolled across all programs",
      icon: Users,
      color: "text-teal-600 bg-teal-50 dark:bg-teal-950/20",
    },
    {
      title: "Active Batches",
      value: "6",
      description: "Batches executing this semester",
      icon: Layers,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20",
    },
    {
      title: "Attendance Trend",
      value: "88.2%",
      description: "+1.4% from last month",
      icon: ClipboardCheck,
      color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20",
    },
    {
      title: "Course Completion",
      value: "72.4%",
      description: "Average syllabus coverage",
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20",
    },
    {
      title: "Performance Index",
      value: "B+ Avg",
      description: "Overall academic score",
      icon: Award,
      color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20",
    },
  ];

  // Dummy monthly progress percentages for chart
  const monthlyCoverage = [15, 30, 48, 62, 72, 85];
  const monthlyAttendance = [82, 85, 87, 86, 88, 89];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">College Administration Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Real-time institutional oversight, batch monitoring, and enrollment telemetry.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {kpiData.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <Card key={idx} className="border-muted shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {kpi.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${kpi.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-[10px] text-muted-foreground mt-1">{kpi.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Interactive Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Attendance Curves</CardTitle>
            <CardDescription>Average weekly attendance percentages over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex flex-col justify-between pt-4">
            {/* SVG Chart */}
            <div className="relative w-full h-40 border-b border-l border-muted flex items-end">
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 400 150">
                <path
                  d="M 50 120 L 110 100 L 170 80 L 230 90 L 290 70 L 350 60"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  className="stroke-teal-600"
                />
                {monthlyAttendance.map((val, i) => (
                  <circle
                    key={i}
                    cx={50 + i * 60}
                    cy={150 - (val / 100) * 150}
                    r="4"
                    className="fill-teal-600 stroke-background stroke-2"
                  />
                ))}
              </svg>
              {months.map((m, i) => (
                <span
                  key={i}
                  className="absolute text-[10px] text-muted-foreground transform -translate-x-1/2"
                  style={{ left: `${50 + i * 60}px`, bottom: "-20px" }}
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground mt-4 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-teal-600 inline-block" />
                Target Benchmark (85%)
              </span>
              <span className="font-semibold text-foreground">Current Average: 88.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Course Completion Analytics</CardTitle>
            <CardDescription>Syllabus coverage progress comparison</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex flex-col justify-between pt-4">
            {/* SVG Chart */}
            <div className="relative w-full h-40 border-b border-l border-muted flex items-end">
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 400 150">
                <path
                  d="M 50 135 L 110 110 L 170 80 L 230 65 L 290 50 L 350 30"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  className="stroke-indigo-600"
                />
                {monthlyCoverage.map((val, i) => (
                  <circle
                    key={i}
                    cx={50 + i * 60}
                    cy={150 - (val / 100) * 150}
                    r="4"
                    className="fill-indigo-600 stroke-background stroke-2"
                  />
                ))}
              </svg>
              {months.map((m, i) => (
                <span
                  key={i}
                  className="absolute text-[10px] text-muted-foreground transform -translate-x-1/2"
                  style={{ left: `${50 + i * 60}px`, bottom: "-20px" }}
                >
                  {m}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground mt-4 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
                Expected Target Pace (70%)
              </span>
              <span className="font-semibold text-foreground">Current Average: 72.4%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Read-only Section */}
      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Institutional Activity Log</CardTitle>
          <CardDescription>Recent updates and notifications from assigned batches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { text: "Mentor Rajesh upload recorded session for Batch B2-2026", time: "2 hours ago", badge: "Live Recording", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
              { text: "Batch B1-2025 transitioned to 'Under Evaluation' lifecycle status", time: "5 hours ago", badge: "Batch Lifecycle", color: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400" },
              { text: "Attendance reports compiled and locked for May 2026", time: "1 day ago", badge: "Attendance", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" },
              { text: "Student Amit Sharma completed milestone project: E-Commerce Capstone", time: "2 days ago", badge: "Submissions", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" },
            ].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30 text-sm">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${log.color}`}>
                    {log.badge}
                  </span>
                  <span className="text-slate-700 dark:text-slate-350">{log.text}</span>
                </div>
                <span className="text-xs text-muted-foreground">{log.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
