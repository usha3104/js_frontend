"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle, Search, Edit3, Award, FileText, CheckCircle2, Loader2 } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  batch: string;
  dueDate: string;
  totalPoints: number;
}

interface StudentSubmission {
  id: string;
  assignmentTitle: string;
  studentName: string;
  batch: string;
  submittedAt: string;
  fileLink: string;
  status: "Pending Review" | "Graded";
  grade?: string;
  remarks?: string;
  score?: number;
}

const initialAssignments: Assignment[] = [
  { id: "a-1", title: "Assignment 1: React Component Hooks", batch: "CSE-B1-2026", dueDate: "2026-05-15", totalPoints: 100 },
  { id: "a-2", title: "Assignment 2: Express Routing & Schema Validation", batch: "CSE-B1-2026", dueDate: "2026-06-10", totalPoints: 100 },
  { id: "a-3", title: "Assignment 3: MQTT Protocols & UART Registers", batch: "ECE-B2-2026", dueDate: "2026-06-12", totalPoints: 100 },
];

const initialSubmissions: StudentSubmission[] = [
  { id: "sub-1", assignmentTitle: "Assignment 1: React Component Hooks", studentName: "Amit Sharma", batch: "CSE-B1-2026", submittedAt: "2026-05-14 04:30 PM", fileLink: "amit-hooks-submission.pdf", status: "Graded", grade: "A", score: 95, remarks: "Outstanding use of custom hooks!" },
  { id: "sub-2", assignmentTitle: "Assignment 1: React Component Hooks", studentName: "Priya Patel", batch: "CSE-B1-2026", submittedAt: "2026-05-15 10:15 AM", fileLink: "priya-patel-components.pdf", status: "Pending Review" },
  { id: "sub-3", assignmentTitle: "Assignment 3: MQTT Protocols & UART Registers", studentName: "Sneha Reddy", batch: "ECE-B2-2026", submittedAt: "2026-05-12 09:00 AM", fileLink: "sneha-iot-hw.pdf", status: "Pending Review" },
];

export default function MentorAssignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [submissions, setSubmissions] = useState<StudentSubmission[]>(initialSubmissions);
  const [newTitle, setNewTitle] = useState("");
  const [newBatch, setNewBatch] = useState("CSE-B1-2026");
  const [newDueDate, setNewDueDate] = useState("2026-06-15");
  const [newPoints, setNewPoints] = useState(100);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Grading states
  const [selectedSub, setSelectedSub] = useState<StudentSubmission | null>(null);
  const [score, setScore] = useState<number>(90);
  const [gradeLetter, setGradeLetter] = useState("A-");
  const [remarks, setRemarks] = useState("");
  const [isGradingOpen, setIsGradingOpen] = useState(false);
  const [savingGrade, setSavingGrade] = useState(false);

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const added: Assignment = {
      id: `a-${Date.now()}`,
      title: newTitle,
      batch: newBatch,
      dueDate: newDueDate,
      totalPoints: newPoints,
    };
    setAssignments((prev) => [...prev, added]);
    setNewTitle("");
    setIsCreateOpen(false);
  };

  const handleOpenGrading = (sub: StudentSubmission) => {
    setSelectedSub(sub);
    setScore(sub.score || 90);
    setGradeLetter(sub.grade || "A-");
    setRemarks(sub.remarks || "");
    setIsGradingOpen(true);
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    setSavingGrade(true);
    setTimeout(() => {
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === selectedSub.id
            ? { ...s, status: "Graded", score, grade: gradeLetter, remarks }
            : s
        )
      );
      setSavingGrade(false);
      setIsGradingOpen(false);
      setSelectedSub(null);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Assignment Center</h2>
          <p className="text-sm text-muted-foreground">
            Create task specs, publish coursework deliverables, and review student uploads.
          </p>
        </div>

        {/* Create Assignment Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-650 hover:bg-indigo-700 text-white cursor-pointer text-xs">
              <PlusCircle className="mr-2 h-4 w-4" />
              Publish Assignment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Publish New Coursework</DialogTitle>
              <DialogDescription>
                Define the requirements, batch mapping, and deadlines.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateAssignment} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="title">Coursework Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Assignment 4: Docker Composition"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="batch">Target Cohort</Label>
                  <select
                    id="batch"
                    value={newBatch}
                    onChange={(e) => setNewBatch(e.target.value)}
                    className="w-full h-10 border rounded-md px-3 text-xs bg-background"
                  >
                    <option value="CSE-B1-2026">CSE-B1-2026</option>
                    <option value="ECE-B2-2026">ECE-B2-2026</option>
                    <option value="Open-Alpha-2026">Open-Alpha-2026</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="points">Total Points</Label>
                  <Input
                    id="points"
                    type="number"
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="due">Submission Deadline</Label>
                <Input
                  id="due"
                  type="date"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                />
              </div>

              <DialogFooter className="pt-2">
                <Button type="submit" className="bg-indigo-650 hover:bg-indigo-700 text-white">Publish Coursework</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Active Assignments Checklist */}
        <Card className="md:col-span-1 border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Active Assignments</CardTitle>
            <CardDescription>Curriculum requirements currently published</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {assignments.map((asg) => (
              <div key={asg.id} className="p-3.5 rounded-lg border bg-muted/20 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="font-mono text-[9px]">{asg.batch}</Badge>
                  <span className="font-semibold text-muted-foreground">{asg.totalPoints} Pts</span>
                </div>
                <p className="font-bold text-slate-800 dark:text-slate-150">{asg.title}</p>
                <p className="text-[10px] text-muted-foreground">Due: {asg.dueDate}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Student Submissions Table */}
        <Card className="md:col-span-2 border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Pending & Completed Submissions</CardTitle>
            <CardDescription>Student document uploads ready for evaluation</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Coursework</TableHead>
                  <TableHead className="text-center">Submitted At</TableHead>
                  <TableHead className="text-center">Marks Status</TableHead>
                  <TableHead className="text-right">Evaluate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell>
                      <div>
                        <p className="font-semibold">{sub.studentName}</p>
                        <p className="text-[9px] text-muted-foreground">{sub.batch}</p>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[150px] truncate">{sub.assignmentTitle}</TableCell>
                    <TableCell className="text-center text-[10px] font-mono">{sub.submittedAt}</TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={sub.status === "Graded" ? "secondary" : "default"}
                        className={
                          sub.status === "Graded"
                            ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-450"
                        }
                      >
                        {sub.status === "Graded" ? `${sub.score} Pts (${sub.grade})` : "Pending Evaluation"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenGrading(sub)}
                        className="cursor-pointer text-xs"
                      >
                        <Edit3 className="h-3.5 w-3.5 mr-1" />
                        {sub.status === "Graded" ? "Edit Grade" : "Evaluate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Grading Dialog */}
      <Dialog open={isGradingOpen} onOpenChange={setIsGradingOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Evaluate Student Work</DialogTitle>
            <DialogDescription>
              Submit scores and qualitative feedback for {selectedSub?.studentName}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveGrade} className="space-y-4 py-2">
            <div className="p-3 rounded-lg border bg-muted/40 text-xs flex items-center justify-between">
              <div>
                <p className="font-semibold text-muted-foreground uppercase">Uploaded File</p>
                <p className="font-bold text-slate-800 dark:text-slate-150 mt-0.5">{selectedSub?.fileLink}</p>
              </div>
              <Button size="sm" variant="secondary" type="button" className="text-[10px]">
                <FileText className="h-3.5 w-3.5 mr-1 text-indigo-650" />
                View Document
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="score">Awarded Score (Max 100)</Label>
                <Input
                  id="score"
                  type="number"
                  max={100}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="letter-grade">Letter Grade</Label>
                <Input
                  id="letter-grade"
                  placeholder="e.g. A, B+, C"
                  value={gradeLetter}
                  onChange={(e) => setGradeLetter(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="remarks">Mentor Remarks</Label>
              <Textarea
                id="remarks"
                placeholder="Write student performance notes, strength areas, and improvement suggestions..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={savingGrade} className="bg-indigo-650 hover:bg-indigo-700 text-white w-full">
                {savingGrade ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Recording Grade...
                  </>
                ) : (
                  <>
                    <Award className="mr-2 h-4 w-4" />
                    Submit Evaluation
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
