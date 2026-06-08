"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ClipboardCheck, Users, AlertTriangle } from "lucide-react";

interface AttendanceRecord {
  id: string;
  name: string;
  email: string;
  batch: string;
  totalClasses: number;
  present: number;
  absent: number;
  percentage: number;
  status: "Exemplary" | "Good" | "Critical";
}

const mockAttendance: AttendanceRecord[] = [
  { id: "att-1", name: "Amit Sharma", email: "amit.sharma@college.edu", batch: "CSE-B1-2026", totalClasses: 48, present: 45, absent: 3, percentage: 94, status: "Exemplary" },
  { id: "att-2", name: "Priya Patel", email: "priya.patel@college.edu", batch: "CSE-B1-2026", totalClasses: 48, present: 42, absent: 6, percentage: 88, status: "Good" },
  { id: "att-3", name: "Sneha Reddy", email: "sneha.reddy@college.edu", batch: "ECE-B2-2026", totalClasses: 48, present: 39, absent: 9, percentage: 81, status: "Critical" },
  { id: "att-4", name: "Vikram Malhotra", email: "vikram.m@college.edu", batch: "ECE-B2-2026", totalClasses: 48, present: 46, absent: 2, percentage: 96, status: "Exemplary" },
  { id: "att-5", name: "Karan Johar", email: "karan.j@college.edu", batch: "CSE-B1-2026", totalClasses: 48, present: 36, absent: 12, percentage: 75, status: "Critical" },
];

export default function CollegeAdminAttendance() {
  const [selectedBatch, setSelectedBatch] = useState<string>("ALL");

  const filteredAttendance = selectedBatch === "ALL"
    ? mockAttendance
    : mockAttendance.filter((rec) => rec.batch === selectedBatch);

  const getStatusBadge = (status: "Exemplary" | "Good" | "Critical") => {
    switch (status) {
      case "Exemplary":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400">Exemplary (&gt;90%)</Badge>;
      case "Good":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-950/40 dark:text-blue-400">Satisfactory (80-90%)</Badge>;
      case "Critical":
        return <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-450">Critical (&lt;85% Required)</Badge>;
    }
  };

  const criticalCount = mockAttendance.filter((a) => a.percentage < 85).length;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Attendance Telemetry</h2>
        <p className="text-sm text-muted-foreground">
          View real-time attendance logs, compliance thresholds, and low-attendance warnings.
        </p>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Campus-Wide Attendance</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.2%</div>
            <p className="text-[10px] text-muted-foreground mt-1">Average across all active batches</p>
          </CardContent>
        </Card>

        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Total Tracked Classes</CardTitle>
            <Users className="h-4 w-4 text-blue-605" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48 Lectures</div>
            <p className="text-[10px] text-muted-foreground mt-1">Class sessions recorded this semester</p>
          </CardContent>
        </Card>

        <Card className="border-muted shadow-sm border-rose-200 bg-rose-50/10 dark:border-rose-950/20 dark:bg-rose-950/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-rose-700 dark:text-rose-450 uppercase">Critical Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">{criticalCount} Students</div>
            <p className="text-[10px] text-rose-750 dark:text-rose-400 mt-1">Attendance level is below 85% benchmark</p>
          </CardContent>
        </Card>
      </div>

      {/* Table & Batch Filtering */}
      <Card className="border-muted shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Attendance Roster</CardTitle>
            <CardDescription>Filter by class batches to view detailed check-in metrics</CardDescription>
          </div>
          <div className="w-48">
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Batches</SelectItem>
                <SelectItem value="CSE-B1-2026">CSE-B1-2026</SelectItem>
                <SelectItem value="ECE-B2-2026">ECE-B2-2026</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Assigned Batch</TableHead>
                <TableHead className="text-center">Lectures Run</TableHead>
                <TableHead className="text-center">Attended</TableHead>
                <TableHead className="text-center">Absent</TableHead>
                <TableHead className="text-center">Percentage</TableHead>
                <TableHead className="text-center">Status Flag</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAttendance.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{rec.name}</p>
                      <p className="text-[10px] text-muted-foreground">{rec.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {rec.batch}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{rec.totalClasses}</TableCell>
                  <TableCell className="text-center font-medium text-emerald-600">{rec.present}</TableCell>
                  <TableCell className="text-center font-medium text-rose-500">{rec.absent}</TableCell>
                  <TableCell className="text-center font-bold">
                    <span className={rec.percentage < 85 ? "text-destructive" : "text-emerald-600"}>
                      {rec.percentage}%
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{getStatusBadge(rec.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
