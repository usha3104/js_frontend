"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Layers, GraduationCap, Users } from "lucide-react";

interface MentorBatch {
  id: string;
  code: string;
  course: string;
  type: "Private (College-Specific)" | "Open (Direct Applicants)";
  collegeName?: string;
  students: number;
  progress: number;
  status: "Active" | "Under Evaluation" | "Completed";
}

const mockMentorBatches: MentorBatch[] = [
  { id: "mb-1", code: "CSE-B1-2026", course: "Full Stack Web Development (React & Node)", type: "Private (College-Specific)", collegeName: "SVKM Institute of Technology", students: 45, progress: 75, status: "Active" },
  { id: "mb-2", code: "ECE-B2-2026", course: "Embedded Systems & IoT Architectures", type: "Private (College-Specific)", collegeName: "Vellore College of Engineering", students: 38, progress: 40, status: "Active" },
  { id: "mb-3", code: "Open-Alpha-2026", course: "Advanced Cloud Native Microservices", type: "Open (Direct Applicants)", students: 150, progress: 20, status: "Active" },
];

export default function MentorBatches() {
  const getStatusColor = (status: MentorBatch["status"]) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400";
      case "Under Evaluation":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-405";
      case "Completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Assigned Cohorts</h2>
        <p className="text-sm text-muted-foreground">
          View active curricula, type configurations, and student counts for your assigned batches.
        </p>
      </div>

      <div className="space-y-4">
        {mockMentorBatches.map((b) => (
          <Card key={b.id} className="border-muted shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row justify-between items-start pb-4 border-b border-muted">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="outline" className="font-mono text-[10px]">{b.code}</Badge>
                  <Badge className={b.type.startsWith("Private") ? "bg-indigo-50 text-indigo-750 dark:bg-indigo-950/20 dark:text-indigo-400" : "bg-teal-50 text-teal-800 dark:bg-teal-950/20 dark:text-teal-400"}>
                    {b.type}
                  </Badge>
                  {b.collegeName && (
                    <span className="text-[10px] text-muted-foreground font-medium">Mapped: {b.collegeName}</span>
                  )}
                </div>
                <CardTitle className="text-base font-bold text-slate-850 dark:text-slate-100">{b.course}</CardTitle>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(b.status)}>{b.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 grid md:grid-cols-3 gap-6 items-center">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-muted rounded-lg">
                  <Users className="h-4.5 w-4.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Active Roster</p>
                  <p className="text-sm font-bold">{b.students} Enrolled Students</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-muted rounded-lg">
                  <GraduationCap className="h-4.5 w-4.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Curriculum Status</p>
                  <p className="text-sm font-bold">{b.progress}% Syllabus Completed</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span>Syllabus Completion Bar</span>
                  <span>{b.progress}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${b.progress}%` }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
