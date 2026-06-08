"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Calendar, Star, AlertTriangle } from "lucide-react";

export default function StudentAttendance() {
  const attendancePercentage = 94.2;

  // Monthly stats mockup
  const months = [
    { name: "January", attended: 8, total: 8, percent: 100 },
    { name: "February", attended: 12, total: 12, percent: 100 },
    { name: "March", attended: 10, total: 12, percent: 83.3 },
    { name: "April", attended: 8, total: 8, percent: 100 },
    { name: "May", attended: 7, total: 8, percent: 87.5 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Attendance Log</h2>
        <p className="text-sm text-muted-foreground">
          View your aggregate lecture presence log, compliance rates, and weekly checks.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">My Attendance Rate</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-rose-650" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-650">{attendancePercentage}%</div>
            <p className="text-[10px] text-muted-foreground mt-1">SVKM Tech compliance benchmark: &gt;85%</p>
          </CardContent>
        </Card>

        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Attended Lectures</CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 Lectures</div>
            <p className="text-[10px] text-muted-foreground mt-1">Out of 48 total recorded sessions</p>
          </CardContent>
        </Card>

        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Absent Days</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Absences</div>
            <p className="text-[10px] text-muted-foreground mt-1">All absences approved by academic rep</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Monthly Attendance Curve</CardTitle>
          <CardDescription>Review session presence ratios mapped by calendar months</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          {months.map((m, idx) => (
            <div key={idx} className="space-y-1.5 text-xs">
              <div className="flex justify-between items-center font-medium">
                <span>{m.name}</span>
                <span className="text-muted-foreground">
                  {m.attended} / {m.total} lectures ({m.percent}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-rose-600"
                  style={{ width: `${m.percent}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
