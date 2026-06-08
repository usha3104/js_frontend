"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart3, LineChart, PieChart, TrendingUp, HelpCircle } from "lucide-react";

export default function CollegeAdminAnalytics() {
  const cohortGrades = [
    { grade: "A", count: 125, percentage: "27.7%", color: "bg-emerald-500" },
    { grade: "B+", count: 154, percentage: "34.2%", color: "bg-teal-500" },
    { grade: "B", count: 98, percentage: "21.7%", color: "bg-blue-500" },
    { grade: "C", count: 52, percentage: "11.5%", color: "bg-amber-500" },
    { grade: "D/F", count: 21, percentage: "4.9%", color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Institutional Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Detailed metrics of class cohorts, student distributions, and learning statistics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Grade Distribution */}
        <Card className="md:col-span-2 border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Grade Distribution Breakdown</CardTitle>
            <CardDescription>Overall student scoring percentages for the current academic session</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {cohortGrades.map((g, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded ${g.color} inline-block`} />
                    Grade {g.grade}
                  </span>
                  <span className="text-muted-foreground">{g.count} Students ({g.percentage})</span>
                </div>
                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${g.color}`}
                    style={{ width: g.percentage }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Highlights */}
        <Card className="border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Academic Index</CardTitle>
            <CardDescription>Summary stats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-b pb-4">
              <span className="text-xs text-muted-foreground uppercase font-semibold">Top Performing Batch</span>
              <p className="text-lg font-bold text-teal-650 mt-0.5">CSE-B1-2026</p>
              <p className="text-[10px] text-muted-foreground">Average class performance: A-</p>
            </div>
            <div className="border-b pb-4">
              <span className="text-xs text-muted-foreground uppercase font-semibold">Struggling Cohort</span>
              <p className="text-lg font-bold text-amber-600 mt-0.5">ECE-B2-2026</p>
              <p className="text-[10px] text-muted-foreground">Average attendance: 81.2%</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase font-semibold">LMS Engagement Rate</span>
              <p className="text-lg font-bold text-blue-650 mt-0.5">91.4% Active</p>
              <p className="text-[10px] text-muted-foreground">Students active in the past 7 days</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cohort comparison Table */}
      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Cohort Comparative Telemetry</CardTitle>
          <CardDescription>Compare metrics side-by-side across all institutional cohorts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cohort Code</TableHead>
                <TableHead className="text-center">Active Enrolled</TableHead>
                <TableHead className="text-center">Avg Attendance</TableHead>
                <TableHead className="text-center">Assignment Submit Ratio</TableHead>
                <TableHead className="text-center">Capstone Completion Rate</TableHead>
                <TableHead className="text-center">Status Flag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { code: "CSE-B1-2026", count: 45, att: "94.2%", assign: "98.5%", capstone: "91.1%", status: "Exemplary" },
                { code: "ECE-B2-2026", count: 38, att: "81.2%", assign: "82.4%", capstone: "78.4%", status: "Warning" },
                { code: "CSE-B3-2025", count: 42, att: "88.6%", assign: "91.2%", capstone: "85.7%", status: "Good" },
                { code: "MECH-B9-2025", count: 30, att: "90.1%", assign: "94.0%", capstone: "100.0%", status: "Completed" },
              ].map((c, i) => (
                <TableRow key={i}>
                  <TableCell className="font-semibold">{c.code}</TableCell>
                  <TableCell className="text-center font-semibold">{c.count}</TableCell>
                  <TableCell className="text-center">{c.att}</TableCell>
                  <TableCell className="text-center">{c.assign}</TableCell>
                  <TableCell className="text-center">{c.capstone}</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="outline"
                      className={
                        c.status === "Exemplary"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-350 dark:bg-emerald-950/20 dark:text-emerald-400"
                          : c.status === "Warning"
                          ? "bg-rose-50 text-rose-800 border-rose-350 dark:bg-rose-950/20 dark:text-rose-450"
                          : c.status === "Completed"
                          ? "bg-blue-50 text-blue-800 border-blue-350 dark:bg-blue-950/20 dark:text-blue-400"
                          : "bg-slate-50 text-slate-800 border-slate-300 dark:bg-slate-900 dark:text-slate-300"
                      }
                    >
                      {c.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
