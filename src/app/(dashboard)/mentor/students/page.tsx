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
import { Search, Edit3, ClipboardCheck, Loader2 } from "lucide-react";

interface StudentObservation {
  id: string;
  name: string;
  email: string;
  batch: string;
  engagementScore: number;
  mentorNotes: string;
  observations: {
    learningSpeed: string;
    attendanceConsistency: string;
    assignmentConsistency: string;
    adaptability: string;
    participationLevel: string;
    strengths: string;
    weaknesses: string;
  };
}

const initialStudents: StudentObservation[] = [
  {
    id: "s-1",
    name: "Amit Sharma",
    email: "amit.sharma@college.edu",
    batch: "CSE-B1-2026",
    engagementScore: 8.8,
    mentorNotes: "Excellent student. Excels at frontend frameworks.",
    observations: {
      learningSpeed: "Fast Learner",
      attendanceConsistency: "Excellent (94%)",
      assignmentConsistency: "Very Consistent",
      adaptability: "Strong Adaptability",
      participationLevel: "Active Participant",
      strengths: "Core JavaScript, TypeScript coding logic",
      weaknesses: "Can lead class discussions more actively",
    },
  },
  {
    id: "s-2",
    name: "Priya Patel",
    email: "priya.patel@college.edu",
    batch: "CSE-B1-2026",
    engagementScore: 7.9,
    mentorNotes: "Quiet, but submits quality work on time.",
    observations: {
      learningSpeed: "Moderate Pace",
      attendanceConsistency: "Good (88%)",
      assignmentConsistency: "Consistent",
      adaptability: "Moderate Adaptability",
      participationLevel: "Passive Participant",
      strengths: "Interface mock design, CSS layouts",
      weaknesses: "Requires practice with asynchronous NodeJS routers",
    },
  },
];

export default function MentorStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState<StudentObservation[]>(initialStudents);
  const [selectedStudent, setSelectedStudent] = useState<StudentObservation | null>(null);

  // Form states for observation update
  const [engagement, setEngagement] = useState(8.0);
  const [notes, setNotes] = useState("");
  const [speed, setSpeed] = useState("Fast Learner");
  const [attConsistency, setAttConsistency] = useState("Excellent");
  const [asgConsistency, setAsgConsistency] = useState("Consistent");
  const [adaptability, setAdaptability] = useState("Strong");
  const [participation, setParticipation] = useState("Active");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [saving, setSaving] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEdit = (student: StudentObservation) => {
    setSelectedStudent(student);
    setEngagement(student.engagementScore);
    setNotes(student.mentorNotes);
    setSpeed(student.observations.learningSpeed);
    setAttConsistency(student.observations.attendanceConsistency);
    setAsgConsistency(student.observations.assignmentConsistency);
    setAdaptability(student.observations.adaptability);
    setParticipation(student.observations.participationLevel);
    setStrengths(student.observations.strengths);
    setWeaknesses(student.observations.weaknesses);
    setIsOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    setSaving(true);
    setTimeout(() => {
      setStudents((prev) =>
        prev.map((s) =>
          s.id === selectedStudent.id
            ? {
                ...s,
                engagementScore: engagement,
                mentorNotes: notes,
                observations: {
                  learningSpeed: speed,
                  attendanceConsistency: attConsistency,
                  assignmentConsistency: asgConsistency,
                  adaptability: adaptability,
                  participationLevel: participation,
                  strengths: strengths,
                  weaknesses: weaknesses,
                },
              }
            : s
        )
      );
      setSaving(false);
      setIsOpen(false);
      setSelectedStudent(null);
    }, 800);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.batch.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Student Directory & 60-Day Telemetry</h2>
        <p className="text-sm text-muted-foreground">
          View your students, input private instructor notes, and track the initial 60-day observation benchmarks.
        </p>
      </div>

      <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-muted shadow-sm">
        <div className="relative flex-1 font-sans">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students by name, email, or batch..."
            className="pl-10 text-xs"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Tracked Roster</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Cohort Batch</TableHead>
                <TableHead className="text-center">Engagement Score</TableHead>
                <TableHead>Private Notes</TableHead>
                <TableHead className="text-right">Evaluate & Update</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-semibold">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-mono text-[10px]">
                      {student.batch}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className="bg-indigo-50 text-indigo-805 dark:bg-indigo-950/20 dark:text-indigo-400">
                      {student.engagementScore} / 10
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate italic text-xs text-muted-foreground">
                    {student.mentorNotes || "No notes added"}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenEdit(student)}
                      className="cursor-pointer text-xs"
                    >
                      <Edit3 className="h-3.5 w-3.5 mr-1" />
                      Update Metrics
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Observation Form Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Update 60-Day Observation Phase</DialogTitle>
            <DialogDescription>
              Submit details evaluating academic progression and adaptability for {selectedStudent?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="engagement-score">Engagement score (Max 10)</Label>
                <Input
                  id="engagement-score"
                  type="number"
                  step="0.1"
                  max={10}
                  value={engagement}
                  onChange={(e) => setEngagement(Number(e.target.value))}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="speed">Learning Speed</Label>
                <Input
                  id="speed"
                  value={speed}
                  onChange={(e) => setSpeed(e.target.value)}
                  placeholder="e.g. Fast Learner, Needs practice"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="att-c">Attendance Consistency</Label>
                <Input
                  id="att-c"
                  value={attConsistency}
                  onChange={(e) => setAttConsistency(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="asg-c">Assignment Consistency</Label>
                <Input
                  id="asg-c"
                  value={asgConsistency}
                  onChange={(e) => setAsgConsistency(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="adapt">Adaptability</Label>
                <Input
                  id="adapt"
                  value={adaptability}
                  onChange={(e) => setAdaptability(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="str">Core Strengths</Label>
                <Input
                  id="str"
                  value={strengths}
                  onChange={(e) => setStrengths(e.target.value)}
                  placeholder="Key strengths"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="weak">Areas for Growth</Label>
                <Input
                  id="weak"
                  value={weaknesses}
                  onChange={(e) => setWeaknesses(e.target.value)}
                  placeholder="Weaknesses"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">Private Mentor Notes & Recommendations</Label>
              <Textarea
                id="notes"
                placeholder="Submit final internship advice and feedback summaries..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={saving} className="bg-indigo-650 hover:bg-indigo-700 text-white w-full">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Locking Observation Metrics...
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Lock Telemetry
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
