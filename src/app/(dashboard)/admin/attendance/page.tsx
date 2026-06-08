"use client";

import { useState } from "react";
import { Search, ClipboardCheck, Users, Calendar, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StudentAttendance {
  id: string;
  name: string;
  email: string;
  presentDays: number;
  totalDays: number;
  percentage: number;
}

interface BatchAttendance {
  batchId: string;
  batchName: string;
  collegeName: string;
  averageRate: number;
  sessionsConducted: number;
  students: StudentAttendance[];
}

const mockAttendanceData: BatchAttendance[] = [
  {
    batchId: "b1",
    batchName: "Web Dev - Cohort 1",
    collegeName: "Tech University",
    averageRate: 91.5,
    sessionsConducted: 40,
    students: [
      { id: "s1", name: "Rahul Sharma", email: "rahul@example.com", presentDays: 38, totalDays: 40, percentage: 95 },
      { id: "s2", name: "Priya Patel", email: "priya@example.com", presentDays: 35, totalDays: 40, percentage: 87.5 },
      { id: "s7", name: "Ketan Mehta", email: "ketan@example.com", presentDays: 24, totalDays: 40, percentage: 60 }, // Critical
    ],
  },
  {
    batchId: "b2",
    batchName: "Data Sci - Cohort 3",
    collegeName: "Tech University",
    averageRate: 94.6,
    sessionsConducted: 26,
    students: [
      { id: "s8", name: "Riya Sen", email: "riya@example.com", presentDays: 25, totalDays: 26, percentage: 96.1 },
      { id: "s9", name: "Kunal Shah", email: "kunal@example.com", presentDays: 24, totalDays: 26, percentage: 92.3 },
    ],
  },
  {
    batchId: "b3",
    batchName: "Python - Cohort 4",
    collegeName: "Science Institute",
    averageRate: 81.2,
    sessionsConducted: 12,
    students: [
      { id: "s3", name: "Amit Kumar", email: "amit@example.com", presentDays: 11, totalDays: 12, percentage: 91.6 },
      { id: "s4", name: "Sneha Reddy", email: "sneha@example.com", presentDays: 9, totalDays: 12, percentage: 75 }, // Warning
      { id: "s10", name: "Jatin Dev", email: "jatin@example.com", presentDays: 8, totalDays: 12, percentage: 66.6 }, // Critical
    ],
  },
];

export default function AttendancePage() {
  const [selectedBatchId, setSelectedBatchId] = useState<string>("b1");
  const [search, setSearch] = useState("");

  const currentBatchData = mockAttendanceData.find((b) => b.batchId === selectedBatchId) || mockAttendanceData[0];

  const filteredStudents = currentBatchData.students.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  // Stats Calculations for Selected Batch
  const totalStudents = currentBatchData.students.length;
  const criticalCount = currentBatchData.students.filter((s) => s.percentage < 75).length;
  const warningCount = currentBatchData.students.filter((s) => s.percentage >= 75 && s.percentage < 85).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Attendance analytics</h1>
          <p className="text-muted-foreground">
            Track student check-ins, session summaries, and alert thresholds.
          </p>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Attendance
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {currentBatchData.averageRate}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Class average across {currentBatchData.sessionsConducted} sessions
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Sessions Held
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
              <Calendar className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">
              {currentBatchData.sessionsConducted} lectures
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total logs uploaded by mentors
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Low Attendance Alerts
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-600">
              {criticalCount} critical / {warningCount} warning
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Threshold benchmarked at 75%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Batch selector and Search table */}
      <Card>
        <CardHeader className="pb-3 border-b mb-4">
          <div className="flex items-center gap-4 flex-wrap justify-between">
            <div className="flex items-center gap-3">
              <Label className="text-sm font-bold text-slate-700">Select Batch:</Label>
              <Select value={selectedBatchId} onValueChange={setSelectedBatchId}>
                <SelectTrigger className="w-[260px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockAttendanceData.map((b) => (
                    <SelectItem key={b.batchId} value={b.batchId}>
                      {b.batchName} ({b.collegeName})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-full max-w-xs">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search student logs..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Present Days</TableHead>
                  <TableHead>Total Sessions</TableHead>
                  <TableHead>Attendance Rate</TableHead>
                  <TableHead>Status Badge</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                      No logs found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((std) => {
                    let rateBadge = "success";
                    let label = "Good";
                    if (std.percentage < 75) {
                      rateBadge = "destructive";
                      label = "Critical";
                    } else if (std.percentage < 85) {
                      rateBadge = "warning";
                      label = "Warning";
                    }
                    return (
                      <TableRow key={std.id}>
                        <TableCell className="font-semibold text-slate-800">
                          <div>
                            <p>{std.name}</p>
                            <p className="text-[10px] text-muted-foreground font-normal">{std.email}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm font-semibold">{std.presentDays} days</TableCell>
                        <TableCell className="font-mono text-sm">{std.totalDays} sessions</TableCell>
                        <TableCell className="font-mono font-bold text-sm">
                          {std.percentage}%
                        </TableCell>
                        <TableCell>
                          <Badge variant={rateBadge as any}>
                            {label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
