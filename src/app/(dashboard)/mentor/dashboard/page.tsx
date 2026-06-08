"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, Users, ClipboardCheck, BookOpen, Clock, Activity } from "lucide-react";

export default function MentorDashboard() {
  const stats = [
    { title: "Assigned Batches", value: "3 Batches", desc: "2 Private + 1 Open", icon: Layers, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20" },
    { title: "Active Students", value: "78 Students", desc: "Across all cohorts", icon: Users, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20" },
    { title: "Avg Class Attendance", value: "92.4%", desc: "Highly compliant", icon: ClipboardCheck, color: "text-teal-600 bg-teal-50 dark:bg-teal-950/20" },
    { title: "Pending Reviews", value: "12 Submissions", desc: "Assignments & projects", icon: BookOpen, color: "text-rose-600 bg-rose-50 dark:bg-rose-950/20" },
    { title: "Engagement Score", value: "8.7 / 10", desc: "Class interaction rating", icon: Activity, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Mentor Workstation</h2>
        <p className="text-sm text-muted-foreground">
          Review class parameters, upcoming live classes, and pending student submissions.
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="border-muted shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {s.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${s.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{s.value}</div>
                <p className="text-[10px] text-muted-foreground mt-1">{s.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Today's Agenda */}
        <Card className="md:col-span-2 border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Today&apos;s Schedule & Agenda</CardTitle>
            <CardDescription>Scheduled sessions and active links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "React Hook Form Integration & Validation", type: "Live Class", time: "04:00 PM - 05:30 PM", batch: "CSE-B1-2026", status: "Upcoming", badgeColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
              { title: "Express Middleware & Auth Architecture", type: "Doubt Session", time: "06:30 PM - 07:30 PM", batch: "ECE-B2-2026", status: "Upcoming", badgeColor: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400" },
              { title: "Evaluation Sync Meeting with NetPy Reps", type: "Mentor Sync", time: "11:00 AM - 11:30 AM", batch: "ADMIN SYNC", status: "Completed", badgeColor: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-350" },
            ].map((ev, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 rounded-lg border bg-muted/20 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-[9px] font-mono">{ev.batch}</Badge>
                    <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${ev.badgeColor}`}>
                      {ev.type}
                    </span>
                  </div>
                  <p className="font-bold text-slate-800 dark:text-slate-200">{ev.title}</p>
                </div>
                <div className="text-right">
                  <span className="flex items-center text-[10px] text-muted-foreground font-mono">
                    <Clock className="h-3 w-3 mr-1 text-indigo-600" />
                    {ev.time}
                  </span>
                  <span className="text-[9px] font-bold text-indigo-600 block mt-1">{ev.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Task Tracker */}
        <Card className="border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Active Action Plan</CardTitle>
            <CardDescription>Instructor reminders</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="p-3 bg-indigo-50/50 border border-indigo-100 rounded-lg dark:bg-slate-900 dark:border-slate-800">
              <p className="font-bold text-indigo-950 dark:text-indigo-400">Score Capstones</p>
              <p className="text-muted-foreground mt-0.5">8 submissions pending evaluation for CSE-B1-2026.</p>
            </div>
            <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-lg dark:bg-slate-900 dark:border-slate-800">
              <p className="font-bold text-amber-800 dark:text-amber-450">Review Attendance</p>
              <p className="text-muted-foreground mt-0.5">Finalize May attendance log for NetPy Rep review.</p>
            </div>
            <div className="p-3 bg-teal-50/50 border border-teal-100 rounded-lg dark:bg-slate-900 dark:border-slate-800">
              <p className="font-bold text-teal-800 dark:text-teal-400">Share Docker Syllabus</p>
              <p className="text-muted-foreground mt-0.5">Upload multi-stage configuration guides in Resources.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
