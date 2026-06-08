"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Layers, Calendar, Users, BookOpen } from "lucide-react";

interface BatchRecord {
  id: string;
  code: string;
  courseName: string;
  type: "Private" | "Open";
  studentCount: number;
  startDate: string;
  status: "Created" | "Active" | "Under Evaluation" | "Completed" | "Archived";
  assignedMentor: string;
}

const mockBatches: BatchRecord[] = [
  { id: "b-1", code: "CSE-B1-2026", courseName: "Full Stack Web Development (React & Node)", type: "Private", studentCount: 45, startDate: "2026-01-15", status: "Active", assignedMentor: "Dr. Rajesh Kumar" },
  { id: "b-2", code: "ECE-B2-2026", courseName: "Embedded Systems & IoT Architectures", type: "Private", studentCount: 38, startDate: "2026-02-10", status: "Active", assignedMentor: "Prof. Ananya Sen" },
  { id: "b-3", code: "CSE-B3-2025", courseName: "Introduction to Computational Logic", type: "Private", studentCount: 42, startDate: "2025-08-10", status: "Under Evaluation", assignedMentor: "Dr. Rajesh Kumar" },
  { id: "b-4", code: "Open-Alpha-2026", courseName: "Advanced Cloud Native Microservices", type: "Open", studentCount: 150, startDate: "2026-03-01", status: "Active", assignedMentor: "Dr. Rajesh Kumar" },
  { id: "b-5", code: "MECH-B9-2025", courseName: "CAD Modelling & Product Prototyping", type: "Private", studentCount: 30, startDate: "2025-01-05", status: "Completed", assignedMentor: "Prof. S. R. Patel" },
];

export default function CollegeAdminBatches() {
  const getStatusBadge = (status: BatchRecord["status"]) => {
    switch (status) {
      case "Created":
        return <Badge variant="outline">Created</Badge>;
      case "Active":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-150 dark:bg-emerald-950/40 dark:text-emerald-450 border-emerald-300">Active</Badge>;
      case "Under Evaluation":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-150 dark:bg-amber-950/40 dark:text-amber-450 border-amber-300">Under Evaluation</Badge>;
      case "Completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-150 dark:bg-blue-950/40 dark:text-blue-450 border-blue-300">Completed</Badge>;
      case "Archived":
        return <Badge variant="secondary">Archived</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Batch Monitoring</h2>
        <p className="text-sm text-muted-foreground">
          Track active academic cohorts, assigned course tracks, mentors, and program lifecycle stages.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Campus Batches</CardTitle>
            <Layers className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Cohorts</div>
            <p className="text-[10px] text-muted-foreground mt-1">4 Private + 1 Open Enrolled</p>
          </CardContent>
        </Card>

        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Private Batches</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Batches</div>
            <p className="text-[10px] text-muted-foreground mt-1">Limited to college students</p>
          </CardContent>
        </Card>

        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Active Curriculums</CardTitle>
            <BookOpen className="h-4 w-4 text-indigo-650" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Tracks</div>
            <p className="text-[10px] text-muted-foreground mt-1">Computer Science & IoT courses</p>
          </CardContent>
        </Card>

        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Next Term Launch</CardTitle>
            <Calendar className="h-4 w-4 text-slate-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jul 2026</div>
            <p className="text-[10px] text-muted-foreground mt-1">Next batch registration pending</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Batch Lifecycle & Execution Summary</CardTitle>
          <CardDescription>Official registration mapping details (Read-Only)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Code</TableHead>
                <TableHead>Course Track</TableHead>
                <TableHead>Mapping Type</TableHead>
                <TableHead className="text-center">Enrolled Students</TableHead>
                <TableHead>Assigned Mentor</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead className="text-center">Status Badge</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBatches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-semibold">{batch.code}</TableCell>
                  <TableCell className="max-w-xs truncate">{batch.courseName}</TableCell>
                  <TableCell>
                    <Badge variant={batch.type === "Private" ? "default" : "secondary"}>
                      {batch.type} Batch
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center font-bold text-teal-600">{batch.studentCount}</TableCell>
                  <TableCell>{batch.assignedMentor}</TableCell>
                  <TableCell className="font-mono text-xs">{batch.startDate}</TableCell>
                  <TableCell className="text-center">{getStatusBadge(batch.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
