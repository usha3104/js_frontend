"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { CheckCircle2, FileText, Loader2, Upload } from "lucide-react";

interface StudentAssignment {
  id: string;
  title: string;
  dueDate: string;
  points: number;
  status: "Pending Submission" | "Submitted" | "Graded";
  grade?: string;
  score?: number;
  remarks?: string;
}

const initialAssignments: StudentAssignment[] = [
  { id: "as-1", title: "Assignment 1: React Component Hook Structures", dueDate: "2026-05-15", points: 100, status: "Graded", score: 95, grade: "A", remarks: "Outstanding custom hook structures." },
  { id: "as-2", title: "Assignment 2: Express Server Routes & CORS Middlewares", dueDate: "2026-06-10", points: 100, status: "Pending Submission" },
  { id: "as-3", title: "Assignment 3: MQTT Brokers & Esp32 Wiring Configurations", dueDate: "2026-06-15", points: 100, status: "Pending Submission" },
];

export default function StudentAssignments() {
  const [assignments, setAssignments] = useState<StudentAssignment[]>(initialAssignments);
  const [selectedAsg, setSelectedAsg] = useState<StudentAssignment | null>(null);
  const [fileName, setFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAsg || !fileName.trim()) return;

    setSubmitting(true);
    setSuccess(false);

    setTimeout(() => {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === selectedAsg.id
            ? { ...a, status: "Submitted" }
            : a
        )
      );
      setSubmitting(false);
      setSuccess(true);
      setFileName("");
      setTimeout(() => {
        setSuccess(false);
        setSelectedAsg(null);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Coursework Assignments</h2>
        <p className="text-sm text-muted-foreground">
          Track deadlines, review instructor scoring remarks, and upload your coursework.
        </p>
      </div>

      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">My Assignments Checklist</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment Title</TableHead>
                <TableHead>Lock Date</TableHead>
                <TableHead className="text-center">Points Value</TableHead>
                <TableHead className="text-center">Submission Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignments.map((asg) => (
                <TableRow key={asg.id}>
                  <TableCell className="font-semibold">{asg.title}</TableCell>
                  <TableCell className="font-mono text-xs">{asg.dueDate}</TableCell>
                  <TableCell className="text-center">{asg.points} Pts</TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={asg.status === "Graded" ? "secondary" : asg.status === "Submitted" ? "outline" : "default"}
                      className={
                        asg.status === "Graded"
                          ? "bg-emerald-50 text-emerald-805 dark:bg-emerald-950/20 dark:text-emerald-400"
                          : asg.status === "Submitted"
                          ? "bg-blue-50 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400"
                          : "bg-amber-105 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400"
                      }
                    >
                      {asg.status === "Graded" ? `Graded: ${asg.score}/${asg.points} (${asg.grade})` : asg.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    {asg.status === "Pending Submission" ? (
                      <Dialog open={selectedAsg?.id === asg.id} onOpenChange={(open) => !open && setSelectedAsg(null)}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedAsg(asg)}
                            className="cursor-pointer text-xs"
                          >
                            <Upload className="h-3.5 w-3.5 mr-1" />
                            Submit Work
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Submit Coursework Deliverable</DialogTitle>
                            <DialogDescription>{asg.title}</DialogDescription>
                          </DialogHeader>
                          <form onSubmit={handleSubmit} className="space-y-4 py-2">
                            <div className="space-y-2 text-xs">
                              <Label htmlFor="file-upload">Upload File Name / Link</Label>
                              <Input
                                id="file-upload"
                                placeholder="e.g. amit-express-middleware-hw.zip"
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                              />
                            </div>

                            <DialogFooter>
                              <Button type="submit" disabled={submitting} className="w-full bg-rose-650 hover:bg-rose-700 text-white">
                                {submitting ? (
                                  <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Uploading files...
                                  </>
                                ) : (
                                  <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Submit Assignment
                                  </>
                                )}
                              </Button>
                            </DialogFooter>
                          </form>
                        </DialogContent>
                      </Dialog>
                    ) : asg.status === "Graded" ? (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="cursor-pointer text-xs">
                            <FileText className="h-3.5 w-3.5 mr-1 text-rose-650" />
                            View Score Card
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Grading Evaluation Details</DialogTitle>
                            <DialogDescription>{asg.title}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4 text-xs">
                            <div className="flex justify-between items-center border-b pb-3 text-sm font-bold">
                              <span>Awarded Score</span>
                              <span className="text-emerald-600">{asg.score} / {asg.points} ({asg.grade})</span>
                            </div>
                            <div className="space-y-1">
                              <p className="font-semibold text-slate-500">Instructor Feedback & Remarks</p>
                              <p className="bg-muted p-3 rounded-lg border italic">{asg.remarks}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    ) : (
                      <span className="text-xs text-muted-foreground font-mono">Under Review</span>
                    )}
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
