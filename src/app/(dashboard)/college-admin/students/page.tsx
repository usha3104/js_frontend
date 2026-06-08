"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Eye, Search, Filter } from "lucide-react";

interface StudentMock {
  id: string;
  name: string;
  email: string;
  batch: string;
  attendance: number;
  grade: string;
  observationScore: number;
  onboardingType: "College-Mapped" | "Individual";
  observations: {
    learningSpeed: string;
    consistency: string;
    adaptability: string;
    strengths: string;
    weaknesses: string;
    mentorNotes: string;
  };
}

const mockStudents: StudentMock[] = [
  {
    id: "stud-1",
    name: "Amit Sharma",
    email: "amit.sharma@college.edu",
    batch: "CSE-B1-2026",
    attendance: 94,
    grade: "A",
    observationScore: 8.5,
    onboardingType: "College-Mapped",
    observations: {
      learningSpeed: "Fast learner, masters React paradigms quickly",
      consistency: "Excellent, 100% homework submission",
      adaptability: "Strong, transitions between tech stacks smoothly",
      strengths: "Analytical skills, logic formulation",
      weaknesses: "Slightly passive in interactive live sessions",
      mentorNotes: "Highly recommended for corporate internships.",
    },
  },
  {
    id: "stud-2",
    name: "Priya Patel",
    email: "priya.patel@college.edu",
    batch: "CSE-B1-2026",
    attendance: 88,
    grade: "B+",
    observationScore: 7.9,
    onboardingType: "College-Mapped",
    observations: {
      learningSpeed: "Moderate, requires slight repetition for core algorithms",
      consistency: "Good, submissions on time",
      adaptability: "Steady, shows effort to learn Tailwind styling",
      strengths: "UI design, interface design layout",
      weaknesses: "Needs practice in database design schemas",
      mentorNotes: "Requires focus on backend node JS classes.",
    },
  },
  {
    id: "stud-3",
    name: "Rohan Gupta",
    email: "rohan.gupta@m2i.com",
    batch: "Open-Alpha-2026",
    attendance: 92,
    grade: "A-",
    observationScore: 8.2,
    onboardingType: "Individual",
    observations: {
      learningSpeed: "Fast, understands state management stores instantly",
      consistency: "Very Consistent, active during reviews",
      adaptability: "Flexible, comfortable with typescript rules",
      strengths: "TypeScript modeling, schema definitions",
      weaknesses: "CSS responsiveness takes slightly longer",
      mentorNotes: "Strong candidate for full-stack tasks.",
    },
  },
  {
    id: "stud-4",
    name: "Sneha Reddy",
    email: "sneha.reddy@college.edu",
    batch: "ECE-B2-2026",
    attendance: 81,
    grade: "B",
    observationScore: 6.8,
    onboardingType: "College-Mapped",
    observations: {
      learningSpeed: "Requires extra support on asynchronous JavaScript concepts",
      consistency: "Irregular during week 4, improved later",
      adaptability: "Needs transition time",
      strengths: "Strong logical math foundation",
      weaknesses: "Struggles with asynchronous callback states",
      mentorNotes: "Advised to attend additional weekly doubt clearing hours.",
    },
  },
];

export default function CollegeAdminStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentMock | null>(null);

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Student Directory</h2>
        <p className="text-sm text-muted-foreground">
          View academic metrics, roster details, and 60-day mentor observation records.
        </p>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-muted shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name, email, or batch..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-muted shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Enrolled Students Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Assigned Batch</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-center">Attendance</TableHead>
                <TableHead className="text-center">Current Grade</TableHead>
                <TableHead className="text-center">60-Day Score</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No students matching search query.
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-semibold">{student.name}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono text-[10px]">
                        {student.batch}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          student.onboardingType === "College-Mapped"
                            ? "bg-teal-50 text-teal-700 hover:bg-teal-50 dark:bg-teal-900/20 dark:text-teal-400"
                            : "bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-350"
                        }
                      >
                        {student.onboardingType}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`font-semibold ${
                          student.attendance < 85 ? "text-destructive" : "text-emerald-600"
                        }`}
                      >
                        {student.attendance}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center font-bold text-slate-700 dark:text-slate-300">
                      {student.grade}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary" className="bg-indigo-50 text-indigo-700 dark:bg-indigo-900/20 dark:text-indigo-400">
                        {student.observationScore} / 10
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedStudent(student)}
                            className="cursor-pointer"
                          >
                            <Eye className="h-4 w-4 mr-1 text-teal-650" />
                            View Records
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-lg font-bold">Academic Portfolio & 60-Day Review</DialogTitle>
                            <DialogDescription>
                              Detailed observation telemetry for {selectedStudent?.name} ({selectedStudent?.email})
                            </DialogDescription>
                          </DialogHeader>

                          {selectedStudent && (
                            <div className="grid gap-6 py-4">
                              {/* Summary Section */}
                              <div className="grid grid-cols-3 gap-4 border-b pb-4">
                                <div className="text-center p-3 bg-muted/40 rounded-lg">
                                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Attendance</p>
                                  <p className="text-xl font-bold mt-1 text-teal-600">{selectedStudent.attendance}%</p>
                                </div>
                                <div className="text-center p-3 bg-muted/40 rounded-lg">
                                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Letter Grade</p>
                                  <p className="text-xl font-bold mt-1 text-slate-800 dark:text-slate-100">{selectedStudent.grade}</p>
                                </div>
                                <div className="text-center p-3 bg-muted/40 rounded-lg">
                                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Obs. Score</p>
                                  <p className="text-xl font-bold mt-1 text-indigo-600">{selectedStudent.observationScore}/10</p>
                                </div>
                              </div>

                              {/* Observation Phase Details */}
                              <div className="space-y-4">
                                <h4 className="text-sm font-semibold border-l-2 border-indigo-500 pl-2">60-Day Observation Telemetry</h4>
                                <div className="grid grid-cols-2 gap-4 text-xs">
                                  <div className="space-y-1">
                                    <p className="font-semibold text-slate-500">Learning Speed & Style</p>
                                    <p className="bg-muted p-2 rounded text-slate-700 dark:text-slate-350">{selectedStudent.observations.learningSpeed}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="font-semibold text-slate-500">Consistency Metrics</p>
                                    <p className="bg-muted p-2 rounded text-slate-700 dark:text-slate-350">{selectedStudent.observations.consistency}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="font-semibold text-slate-500">Adaptability Quotient</p>
                                    <p className="bg-muted p-2 rounded text-slate-700 dark:text-slate-350">{selectedStudent.observations.adaptability}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="font-semibold text-slate-500">Key Strengths</p>
                                    <p className="bg-muted p-2 rounded text-slate-700 dark:text-slate-350">{selectedStudent.observations.strengths}</p>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                                  <div className="space-y-1">
                                    <p className="font-semibold text-slate-500">Growth Areas</p>
                                    <p className="bg-muted p-2 rounded text-slate-700 dark:text-slate-350">{selectedStudent.observations.weaknesses}</p>
                                  </div>
                                  <div className="space-y-1">
                                    <p className="font-semibold text-slate-500">Mentor Recommendations</p>
                                    <p className="bg-indigo-50/50 border border-indigo-150 p-2 rounded text-indigo-900 dark:bg-slate-900 dark:border-indigo-950 dark:text-indigo-400">
                                      {selectedStudent.observations.mentorNotes}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
