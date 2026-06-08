"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award, Users, BarChart3 } from "lucide-react";

export default function StudentProgress() {
  const progressData = [
    { label: "Attendance Rate", student: 94, classAvg: 85, color: "bg-rose-600" },
    { label: "Assignment Completion", student: 85, classAvg: 78, color: "bg-blue-600" },
    { label: "Project Score", student: 96, classAvg: 82, color: "bg-teal-600" },
    { label: "Quiz Avg Score", student: 88, classAvg: 76, color: "bg-indigo-600" },
    { label: "Participation Index", student: 90, classAvg: 70, color: "bg-amber-600" },
  ];

  const weeklyScores = [72, 78, 82, 80, 88, 92, 88];
  const weeks = ["W1", "W2", "W3", "W4", "W5", "W6", "W7"];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Progress Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Track your academic progress vs. class benchmarks and performance telemetry.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Overall Rank", value: "#3 / 45", color: "text-rose-650 bg-rose-50 dark:bg-rose-950/20", icon: Award },
          { title: "Performance Score", value: "91.2%", color: "text-teal-600 bg-teal-50 dark:bg-teal-950/20", icon: TrendingUp },
          { title: "Class Average", value: "78.4%", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20", icon: Users },
          { title: "Learning Velocity", value: "+12.8%", color: "text-indigo-650 bg-indigo-50 dark:bg-indigo-950/20", icon: BarChart3 },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="border-muted shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">{s.title}</CardTitle>
                <div className={`p-2 rounded-lg ${s.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{s.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Student vs Class Average Comparison Bars */}
        <Card className="border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Performance vs. Class Average</CardTitle>
            <CardDescription>Comparison across core academic dimensions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-2">
            {progressData.map((d, i) => (
              <div key={i} className="space-y-2 text-xs">
                <div className="flex justify-between items-center font-medium">
                  <span>{d.label}</span>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1">
                      <span className={`w-2 h-2 rounded-full ${d.color} inline-block`} />
                      You: <strong>{d.student}%</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/30 inline-block" />
                      Class: {d.classAvg}%
                    </span>
                  </div>
                </div>
                {/* Student bar */}
                <div className="relative w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-muted-foreground/10 rounded-full" />
                  <div
                    className={`h-full rounded-full ${d.color} transition-all duration-500`}
                    style={{ width: `${d.student}%` }}
                  />
                  {/* Class avg marker */}
                  <div
                    className="absolute top-0 h-full w-0.5 bg-muted-foreground/50"
                    style={{ left: `${d.classAvg}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weekly Score Trend */}
        <Card className="border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Weekly Score Trend</CardTitle>
            <CardDescription>Assessment scores across 7 weeks of study</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex flex-col justify-between pt-4">
            <div className="relative w-full h-40 border-b border-l border-muted flex items-end">
              <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 400 150">
                <path
                  d={weeklyScores
                    .map((score, i) => {
                      const x = 30 + i * 55;
                      const y = 150 - (score / 100) * 150;
                      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
                    })
                    .join(" ")}
                  fill="none"
                  strokeWidth="3"
                  className="stroke-rose-600"
                />
                {weeklyScores.map((score, i) => (
                  <circle
                    key={i}
                    cx={30 + i * 55}
                    cy={150 - (score / 100) * 150}
                    r="5"
                    className="fill-rose-600 stroke-background stroke-2"
                  />
                ))}
              </svg>
              {weeks.map((w, i) => (
                <span
                  key={i}
                  className="absolute text-[10px] text-muted-foreground transform -translate-x-1/2"
                  style={{ left: `${30 + i * 55}px`, bottom: "-20px" }}
                >
                  {w}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground mt-5 pt-2">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-600 inline-block" />
                Personal Score Trajectory
              </span>
              <span className="font-semibold text-foreground">Latest: {weeklyScores[weeklyScores.length - 1]}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Journey Workflow */}
      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Learning Lifecycle Flow</CardTitle>
          <CardDescription>Visual overview of your academic journey from batch activation to feedback</CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          <div className="flex items-center justify-between gap-2 overflow-x-auto">
            {[
              { step: "Batch Activated", status: "done", color: "bg-emerald-600" },
              { step: "Live Classes", status: "done", color: "bg-emerald-600" },
              { step: "Assignments", status: "active", color: "bg-rose-600" },
              { step: "Projects", status: "active", color: "bg-rose-600" },
              { step: "Evaluation", status: "pending", color: "bg-muted-foreground/20" },
              { step: "Feedback", status: "pending", color: "bg-muted-foreground/20" },
            ].map((item, i, arr) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <div className="text-center">
                  <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center mx-auto mb-1.5 text-white font-bold text-xs shadow-sm`}>
                    {i + 1}
                  </div>
                  <span className={`text-[10px] font-semibold ${item.status === "pending" ? "text-muted-foreground/40" : "text-slate-700 dark:text-slate-300"}`}>
                    {item.step}
                  </span>
                </div>
                {i < arr.length - 1 && (
                  <div className={`h-px w-8 md:w-12 ${item.status === "done" ? "bg-emerald-400" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
