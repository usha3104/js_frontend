"use client";

import { useState } from "react";
import { Search, Eye, GraduationCap, Mail, Building2, Layers, CheckCircle2, XCircle, AlertCircle, RefreshCw } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Student {
  id: string;
  name: string;
  email: string;
  collegeId: string;
  collegeName: string;
  batchId: string;
  batchName: string;
  verificationStatus: "VERIFIED" | "PENDING" | "REJECTED";
  academicScore: string;
  documentUrl: string;
}

const mockColleges = [
  { id: "c1", name: "Tech University" },
  { id: "c2", name: "Science Institute" },
  { id: "c3", name: "Global Tech College" },
];

const mockBatches = [
  { id: "b1", name: "Web Dev - Cohort 1", collegeId: "c1" },
  { id: "b2", name: "Data Sci - Cohort 3", collegeId: "c1" },
  { id: "b3", name: "Python - Cohort 4", collegeId: "c2" },
];

const mockStudents: Student[] = [
  {
    id: "s1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    collegeId: "c1",
    collegeName: "Tech University",
    batchId: "b1",
    batchName: "Web Dev - Cohort 1",
    verificationStatus: "VERIFIED",
    academicScore: "GPA: 9.2 / 10th & 12th: 95%",
    documentUrl: "transcript_rahul_sharma.pdf",
  },
  {
    id: "s2",
    name: "Priya Patel",
    email: "priya@example.com",
    collegeId: "c1",
    collegeName: "Tech University",
    batchId: "b1",
    batchName: "Web Dev - Cohort 1",
    verificationStatus: "VERIFIED",
    academicScore: "GPA: 8.8 / 10th & 12th: 92%",
    documentUrl: "transcript_priya_patel.pdf",
  },
  {
    id: "s3",
    name: "Amit Kumar",
    email: "amit@example.com",
    collegeId: "c2",
    collegeName: "Science Institute",
    batchId: "b3",
    batchName: "Python - Cohort 4",
    verificationStatus: "VERIFIED",
    academicScore: "GPA: 7.9 / 10th & 12th: 85%",
    documentUrl: "transcript_amit_kumar.pdf",
  },
  {
    id: "s4",
    name: "Sneha Reddy",
    email: "sneha@example.com",
    collegeId: "c2",
    collegeName: "Science Institute",
    batchId: "b3",
    batchName: "Python - Cohort 4",
    verificationStatus: "PENDING",
    academicScore: "GPA: 9.5 / 10th & 12th: 97%",
    documentUrl: "transcript_sneha_reddy.pdf",
  },
  {
    id: "s5",
    name: "Vikram Singh",
    email: "vikram@example.com",
    collegeId: "c3",
    collegeName: "Global Tech College",
    batchId: "",
    batchName: "Unassigned",
    verificationStatus: "PENDING",
    academicScore: "GPA: 6.8 / 10th & 12th: 72%",
    documentUrl: "transcript_vikram_singh.pdf",
  },
  {
    id: "s6",
    name: "Ananya Gupta",
    email: "ananya@example.com",
    collegeId: "c3",
    collegeName: "Global Tech College",
    batchId: "",
    batchName: "Unassigned",
    verificationStatus: "REJECTED",
    academicScore: "GPA: 7.2 / 10th & 12th: 78%",
    documentUrl: "transcript_ananya_gupta.pdf",
  },
];

const verifyVariants = {
  VERIFIED: "success" as const,
  PENDING: "warning" as const,
  REJECTED: "destructive" as const,
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [collegeFilter, setCollegeFilter] = useState("all");

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [isAllocateOpen, setIsAllocateOpen] = useState(false);

  // Form states
  const [allocateBatchId, setAllocateBatchId] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const handleProfileOpen = (student: Student) => {
    setSelectedStudent(student);
    setIsProfileOpen(true);
  };

  const handleVerifyOpen = (student: Student) => {
    setSelectedStudent(student);
    setRejectReason("");
    setIsVerifyOpen(true);
  };

  const handleVerifyAction = (status: "VERIFIED" | "REJECTED") => {
    if (!selectedStudent) return;
    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id ? { ...s, verificationStatus: status } : s
      )
    );
    setIsVerifyOpen(false);
    setSelectedStudent(null);
  };

  const handleAllocateOpen = (student: Student) => {
    setSelectedStudent(student);
    setAllocateBatchId(student.batchId);
    setIsAllocateOpen(true);
  };

  const handleAllocateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const batch = mockBatches.find((b) => b.id === allocateBatchId);

    setStudents(
      students.map((s) =>
        s.id === selectedStudent.id
          ? {
              ...s,
              batchId: allocateBatchId,
              batchName: batch?.name || "Unassigned",
            }
          : s
      )
    );
    setIsAllocateOpen(false);
    setSelectedStudent(null);
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || s.verificationStatus === statusFilter;
    const matchesCollege = collegeFilter === "all" || s.collegeId === collegeFilter;
    return matchesSearch && matchesStatus && matchesCollege;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Verify registrations, view academic portfolios, and allocate students to study cohorts.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[240px] max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search student by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>

            <Select value={collegeFilter} onValueChange={setCollegeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Colleges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                {mockColleges.map((c) => (
                  <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Verification Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="VERIFIED">Verified</SelectItem>
                <SelectItem value="PENDING">Pending Verification</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Assigned Batch</TableHead>
                  <TableHead>Verification Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                      No students found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-semibold text-slate-800">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="h-4 w-4 text-indigo-600" />
                          <div>
                            <p>{student.name}</p>
                            <p className="text-[10px] text-muted-foreground font-normal flex items-center gap-1">
                              <Mail className="h-2.5 w-2.5" /> {student.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{student.collegeName}</TableCell>
                      <TableCell>
                        {student.batchName === "Unassigned" ? (
                          <span className="text-muted-foreground italic text-xs">Unallocated</span>
                        ) : (
                          <Badge variant="outline" className="bg-slate-50">
                            {student.batchName}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={verifyVariants[student.verificationStatus]}>
                          {student.verificationStatus.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button variant="ghost" size="icon" onClick={() => handleProfileOpen(student)} title="Student Profile">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleVerifyOpen(student)} 
                            title="Verify Credentials"
                            disabled={student.verificationStatus === "VERIFIED"}
                            className="text-amber-600 hover:text-amber-700 disabled:opacity-30"
                          >
                            <CheckCircle2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAllocateOpen(student)} className="text-xs">
                            Allocate Batch
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* STUDENT PROFILE DETAILS MODAL */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Student Profile Details</DialogTitle>
            <DialogDescription>
              Detailed student history, academic profile, and registration uploads.
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b pb-4">
                <div className="h-12 w-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                  {selectedStudent.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">{selectedStudent.name}</h3>
                  <p className="text-xs text-muted-foreground">{selectedStudent.email}</p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-muted-foreground block text-[10px]">Onboarded College</Label>
                    <span className="font-semibold">{selectedStudent.collegeName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-muted-foreground block text-[10px]">Allocated Batch</Label>
                    <span className="font-semibold">{selectedStudent.batchName}</span>
                  </div>
                </div>

                <div className="border rounded-lg p-3 space-y-1.5 bg-slate-50/50">
                  <Label className="font-bold text-slate-700">Academic Records</Label>
                  <p className="text-slate-600">{selectedStudent.academicScore}</p>
                </div>

                <div className="border rounded-lg p-3 space-y-1.5 bg-slate-50/50">
                  <Label className="font-bold text-slate-700">Submitted Documents</Label>
                  <p className="text-indigo-600 font-mono underline cursor-pointer">{selectedStudent.documentUrl}</p>
                </div>

                <div className="flex justify-between items-center border rounded-lg p-3 bg-slate-50/50">
                  <span className="font-semibold text-slate-700">Verification Status:</span>
                  <Badge variant={verifyVariants[selectedStudent.verificationStatus]}>
                    {selectedStudent.verificationStatus}
                  </Badge>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t">
                <Button onClick={() => setIsProfileOpen(false)}>Close Profile</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* VERIFY MODAL */}
      <Dialog open={isVerifyOpen} onOpenChange={setIsVerifyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Document Verification Flow</DialogTitle>
            <DialogDescription>
              Verify academic documents submitted by {selectedStudent?.name}.
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4">
              <div className="border rounded-lg p-3.5 bg-slate-50 space-y-1">
                <p className="text-xs text-muted-foreground font-semibold">Document Name:</p>
                <p className="text-sm font-mono text-indigo-700 underline">{selectedStudent.documentUrl}</p>
                <p className="text-xs text-muted-foreground font-semibold mt-3">Self-Reported Scores:</p>
                <p className="text-xs font-semibold">{selectedStudent.academicScore}</p>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="remarks">Rejection Remarks (Required if rejecting)</Label>
                <Input
                  id="remarks"
                  placeholder="Enter reason if documents are invalid..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                />
              </div>

              <DialogFooter className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => handleVerifyAction("REJECTED")}
                  disabled={!rejectReason}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Verification
                </Button>
                <Button
                  type="button"
                  variant="default"
                  onClick={() => handleVerifyAction("VERIFIED")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Approve Verification
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* BATCH ALLOCATION MODAL */}
      <Dialog open={isAllocateOpen} onOpenChange={setIsAllocateOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Batch Cohort Allocation</DialogTitle>
            <DialogDescription>
              Allocate {selectedStudent?.name} to an active learning cohort at {selectedStudent?.collegeName}.
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <form onSubmit={handleAllocateSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label>Select Cohort Batch</Label>
                <Select value={allocateBatchId} onValueChange={setAllocateBatchId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a batch..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unassigned">Unassign Batch</SelectItem>
                    {mockBatches
                      .filter((b) => b.collegeId === selectedStudent.collegeId)
                      .map((b) => (
                        <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAllocateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Allocate Student</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
