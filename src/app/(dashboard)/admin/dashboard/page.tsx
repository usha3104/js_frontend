"use client";

import {
  Users,
  Layers,
  UserCheck,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
  {
    title: "Total Students",
    value: "1,248",
    icon: Users,
    description: "Verified & allocated",
    change: "+48 this week",
    color: "text-blue-600 bg-blue-50",
  },
  {
    title: "Active Batches",
    value: "18",
    icon: Layers,
    description: "In progress learning",
    change: "Across 6 colleges",
    color: "text-indigo-600 bg-indigo-50",
  },
  {
    title: "Active Mentors",
    value: "32",
    icon: UserCheck,
    description: "Industry experts",
    change: "5 on standby",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    title: "Attendance Overview",
    value: "92.4%",
    icon: Calendar,
    description: "Average attendance rate",
    change: "+1.2% vs last month",
    color: "text-amber-600 bg-amber-50",
  },
  {
    title: "Performance Metrics",
    value: "84.2%",
    icon: Award,
    description: "Pass rate in evaluations",
    change: "+0.8% batch average",
    color: "text-purple-600 bg-purple-50",
  },
];

const recentActivities = [
  {
    id: 1,
    type: "mentor_assigned",
    user: "Harish Kumar (Mentor)",
    detail: "assigned to Batch 'Web Dev A' (Global Tech)",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: 2,
    type: "course_published",
    user: "React Native Advanced",
    detail: "published successfully as active curriculum",
    time: "4 hours ago",
    status: "info",
  },
  {
    id: 3,
    type: "student_verified",
    user: "Sneha Reddy (Student)",
    detail: "documents verified & allocated to Python Batch B",
    time: "1 day ago",
    status: "success",
  },
  {
    id: 4,
    type: "batch_completed",
    user: "Machine Learning Basic",
    detail: "marked as completed. Sent to Under Evaluation",
    time: "2 days ago",
    status: "warning",
  },
  {
    id: 5,
    type: "college_added",
    user: "Global Engineering College",
    detail: "onboarded successfully with 5 departments",
    time: "3 days ago",
    status: "success",
  },
];

const activeBatchesQuickView = [
  { name: "Full Stack Web Dev - Cohort 1", college: "Tech University", students: 45, progress: 85, status: "Active" },
  { name: "Python Basics - Cohort 4", college: "Science Institute", students: 30, progress: 40, status: "Active" },
  { name: "React Native Mobile - Cohort 2", college: "Global Tech", students: 28, progress: 10, status: "Created" },
  { name: "Data Science Advanced - Cohort 3", college: "Tech University", students: 35, progress: 95, status: "Under Evaluation" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          NetPy Representative overview of colleges, batches, courses, and students.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1 font-medium">
                  {stat.description}
                </div>
                <div className="text-[10px] text-primary/80 mt-1 font-bold">
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Active Batches Quick View */}
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              Active Batches Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeBatchesQuickView.map((batch, i) => (
                <div key={i} className="space-y-2 border-b pb-3 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{batch.name}</p>
                      <p className="text-xs text-muted-foreground">{batch.college}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={
                        batch.status === "Active" ? "success" :
                        batch.status === "Under Evaluation" ? "warning" : "default"
                      }>
                        {batch.status}
                      </Badge>
                      <span className="text-xs font-bold">{batch.students} Students</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>Curriculum completion</span>
                      <span>{batch.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500" 
                        style={{ width: `${batch.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-indigo-600" />
              Recent Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((act) => (
                <div key={act.id} className="flex items-start gap-3 text-sm">
                  <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${
                    act.status === "success" ? "bg-green-500" :
                    act.status === "warning" ? "bg-amber-500" : "bg-blue-500"
                  }`} />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-xs">
                      {act.user}
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      {act.detail}
                    </p>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {act.time}
                    </span>
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
