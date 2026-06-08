"use client";

import {
  BarChart3,
  TrendingUp,
  Users,
  Building2,
  Award,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Platform Revenue",
    value: "$48,250",
    icon: BarChart3,
    change: "+12% from last month",
  },
  {
    title: "Growth Rate",
    value: "23.5%",
    icon: TrendingUp,
    change: "+4.2% from last quarter",
  },
  {
    title: "Active Students",
    value: "1,847",
    icon: Users,
    change: "+156 this month",
  },
  {
    title: "Colleges",
    value: "24",
    icon: Building2,
    change: "22 active, 2 inactive",
  },
];

const monthlyData = [
  { month: "Jan", colleges: 18, students: 1200, revenue: 32000 },
  { month: "Feb", colleges: 19, students: 1350, revenue: 35000 },
  { month: "Mar", colleges: 20, students: 1420, revenue: 38000 },
  { month: "Apr", colleges: 21, students: 1580, revenue: 41000 },
  { month: "May", colleges: 22, students: 1650, revenue: 43500 },
  { month: "Jun", colleges: 24, students: 1847, revenue: 48250 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Platform performance and growth metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <span className="w-8 text-sm font-medium">{data.month}</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Colleges: {data.colleges}</span>
                      <span>Students: {data.students}</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{
                          width: `${(data.students / 1847) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex items-center gap-4">
                  <span className="w-8 text-sm font-medium">{data.month}</span>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Revenue</span>
                      <span>${(data.revenue / 1000).toFixed(1)}k</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{
                          width: `${(data.revenue / 48250) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Colleges by Enrollment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Tech University", students: 450, growth: "+12%" },
                { name: "Science Institute", students: 320, growth: "+8%" },
                { name: "Arts College", students: 180, growth: "-2%" },
                { name: "Engineering Hub", students: 290, growth: "+15%" },
                { name: "Business School", students: 210, growth: "+5%" },
              ].map((college, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {i + 1}
                    </span>
                    <span className="text-sm font-medium">{college.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{college.students}</p>
                    <p
                      className={`text-xs ${
                        college.growth.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {college.growth}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Platform Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: "Total Courses", value: "48", icon: Award },
                { label: "Avg Completion Rate", value: "78%", icon: TrendingUp },
                { label: "Active Sessions", value: "234", icon: Clock },
                { label: "Certificates Issued", value: "892", icon: Award },
              ].map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{metric.label}</span>
                    </div>
                    <span className="text-sm font-medium">{metric.value}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
