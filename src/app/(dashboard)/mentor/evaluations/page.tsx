"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileCheck, Star, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GradeEvaluation {
  id: string;
  studentName: string;
  batch: string;
  type: "Assignment" | "Capstone";
  title: string;
  score: number;
  grade: string;
  date: string;
}

const mockGrades: GradeEvaluation[] = [
  { id: "g-1", studentName: "Amit Sharma", batch: "CSE-B1-2026", type: "Assignment", title: "React Component Hook Patterns", score: 95, grade: "A", date: "2026-05-14" },
  { id: "g-2", studentName: "Priya Patel", batch: "CSE-B1-2026", type: "Assignment", title: "React Component Hook Patterns", score: 82, grade: "B+", date: "2026-05-16" },
  { id: "g-3", studentName: "Amit Sharma", batch: "CSE-B1-2026", type: "Capstone", title: "Full-Stack E-Commerce SaaS", score: 96, grade: "A", date: "2026-05-30" },
  { id: "g-4", studentName: "Sneha Reddy", batch: "ECE-B2-2026", type: "Assignment", title: "MQTT Protocols & UART Registers", score: 78, grade: "B-", date: "2026-05-20" },
];

export default function MentorEvaluations() {
  const [filterType, setFilterType] = useState("ALL");

  const filtered = filterType === "ALL"
    ? mockGrades
    : mockGrades.filter((g) => g.type === filterType);

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Evaluations & Grading</h2>
          <p className="text-sm text-muted-foreground">
            Monitor scores recorded for all coursework deliverables and final project capstones.
          </p>
        </div>
        <div className="w-48">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Tasks</SelectItem>
              <SelectItem value="Assignment">Assignments Only</SelectItem>
              <SelectItem value="Capstone">Capstones Only</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Evaluations Logged</CardTitle>
            <FileCheck className="h-4 w-4 text-indigo-650" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 Graded</div>
            <p className="text-[10px] text-muted-foreground mt-1">3 Assignments + 1 Capstone</p>
          </CardContent>
        </Card>

        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Class Average Score</CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.7 Pts</div>
            <p className="text-[10px] text-muted-foreground mt-1">Grade index average of B+ overall</p>
          </CardContent>
        </Card>

        <Card className="border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">Evaluated Students</CardTitle>
            <Users className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Active</div>
            <p className="text-[10px] text-muted-foreground mt-1">Students with graded items in log</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Evaluation Registry Logs</CardTitle>
          <CardDescription>Official scoring list (Read-Only log)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Deliverable Category</TableHead>
                <TableHead>Task Name</TableHead>
                <TableHead className="text-center">Awarded Points</TableHead>
                <TableHead className="text-center">Letter Grade</TableHead>
                <TableHead>Date Logged</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-semibold">{item.studentName}</TableCell>
                  <TableCell>
                    <Badge variant={item.type === "Capstone" ? "default" : "secondary"}>
                      {item.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{item.title}</TableCell>
                  <TableCell className="text-center font-bold text-indigo-650">{item.score} / 100</TableCell>
                  <TableCell className="text-center font-bold text-slate-805 dark:text-slate-205">{item.grade}</TableCell>
                  <TableCell className="font-mono text-xs">{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
