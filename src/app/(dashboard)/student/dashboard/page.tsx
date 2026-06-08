"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Award, BookOpen, Clock, ClipboardCheck, MessageSquareQuote } from "lucide-react";

export default function StudentDashboard() {
  const stats = [
    { title: "Attendance", value: "94%", desc: "High compliance", icon: ClipboardCheck, color: "text-rose-600 bg-rose-50 dark:bg-rose-950/20" },
    { title: "Homework Complete", value: "85%", desc: "17 of 20 tasks", icon: BookOpen, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20" },
    { title: "Projects Scored", value: "100%", desc: "Capstone complete", icon: Award, color: "text-teal-600 bg-teal-50 dark:bg-teal-950/20" },
    { title: "Syllabus Progress", value: "78%", desc: "3 of 4 core modules", icon: Users, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20" },
    { title: "Mentor Feedback", value: "4.8 / 5", desc: "Overall teaching score", icon: MessageSquareQuote, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/20" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Student Learning Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Welcome back! Review your coursework tracker, live session schedule, and academic metrics.
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
        {/* 60-Day Observation Phase Card */}
        <Card className="md:col-span-2 border-rose-200 shadow-sm bg-rose-50/5 dark:border-rose-950/30">
          <CardHeader className="border-b border-rose-100 dark:border-rose-950/30">
            <div className="flex items-center gap-2">
              <Badge className="bg-rose-600 text-white hover:bg-rose-700">Observation Phase</Badge>
              <span className="text-xs text-muted-foreground">First 60-Day Assessment Summary</span>
            </div>
            <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100 mt-2">Personal Growth & Adaptability Telemetry</CardTitle>
            <CardDescription>Qualitative review compiled by Dr. Rajesh Kumar (Mentor)</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4 text-xs">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-3 border rounded-lg bg-card">
                <p className="font-semibold text-muted-foreground">Learning Speed</p>
                <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">Fast Learner</p>
                <p className="text-[9px] text-muted-foreground mt-1">Excellent understanding of React paradigms.</p>
              </div>

              <div className="p-3 border rounded-lg bg-card">
                <p className="font-semibold text-muted-foreground">Attendance consistency</p>
                <p className="font-bold text-emerald-600 mt-0.5">94.2% (Excellent)</p>
                <p className="text-[9px] text-muted-foreground mt-1">Consistent attendance throughout the term.</p>
              </div>

              <div className="p-3 border rounded-lg bg-card">
                <p className="font-semibold text-muted-foreground">Assignment compliance</p>
                <p className="font-bold text-indigo-600 mt-0.5">Highly Consistent</p>
                <p className="text-[9px] text-muted-foreground mt-1">Submits assignments prior to deadline.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg bg-card">
                <p className="font-semibold text-slate-500">Key Strengths</p>
                <p className="text-slate-700 dark:text-slate-400 mt-1 font-medium">
                  &bull; React state hooks, typescript modeling, clean code architecture.
                </p>
              </div>
              <div className="p-3 border rounded-lg bg-card">
                <p className="font-semibold text-slate-500">Areas for Growth</p>
                <p className="text-slate-700 dark:text-slate-400 mt-1 font-medium">
                  &bull; Active engagement and verbal questioning in live review session chats.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-200 dark:border-rose-950/40 dark:bg-rose-950/20 text-xs">
              <p className="font-bold text-rose-800 dark:text-rose-400">Mentor Recommendations:</p>
              <p className="text-rose-900/80 dark:text-rose-350 mt-1 leading-relaxed">
                &quot;Amit is performing exceptionally well in coding tasks. I recommend he participates in workshop panel discussions to improve his communication skills. He is highly recommended for full-stack react developer internship programs.&quot;
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Schedule */}
        <Card className="border-muted shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Today&apos;s Class Schedule</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="p-3.5 border rounded-lg bg-muted/20 space-y-2">
              <div className="flex justify-between items-center">
                <Badge variant="secondary">Live Class</Badge>
                <span className="text-[10px] text-muted-foreground flex items-center font-mono">
                  <Clock className="h-3 w-3 mr-1" />
                  04:00 PM
                </span>
              </div>
              <p className="font-bold text-slate-800 dark:text-slate-200">React Hooks Custom Design Patterns</p>
              <p className="text-muted-foreground">Instructor: Dr. Rajesh Kumar</p>
              <Button size="sm" className="w-full bg-rose-600 hover:bg-rose-700 text-white cursor-pointer h-9 text-[11px] mt-1">
                Enter Zoom Meeting Room
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
