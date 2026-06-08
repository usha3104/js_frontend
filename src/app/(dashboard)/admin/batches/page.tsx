"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Layers, Eye, Users, Calendar, ArrowRight } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Batch {
  id: string;
  name: string;
  collegeId: string;
  collegeName: string;
  courseId: string;
  courseTitle: string;
  mentorId: string;
  mentorName: string;
  studentCount: number;
  studentIds: string[];
  status: "Created" | "Active" | "Under Evaluation" | "Completed" | "Archived";
  startDate: string;
  endDate: string;
}

// Helper mock structures for assignments
const mockColleges = [
  { id: "c1", name: "Tech University" },
  { id: "c2", name: "Science Institute" },
  { id: "c3", name: "Global Tech College" },
];

const mockCourses = [
  { id: "co1", title: "Full Stack Web Development" },
  { id: "co2", title: "Python Programming & Scripting" },
  { id: "co3", title: "Data Science Essentials" },
];

const mockMentors = [
  { id: "m1", name: "Harish Kumar", spec: "Web Development" },
  { id: "m2", name: "Pankaj Sharma", spec: "Data Science" },
  { id: "m3", name: "Neha Roy", spec: "Python Programming" },
];

const mockStudents = [
  { id: "s1", name: "Rahul Sharma", email: "rahul@example.com", collegeId: "c1" },
  { id: "s2", name: "Priya Patel", email: "priya@example.com", collegeId: "c1" },
  { id: "s3", name: "Amit Kumar", email: "amit@example.com", collegeId: "c2" },
  { id: "s4", name: "Sneha Reddy", email: "sneha@example.com", collegeId: "c2" },
  { id: "s5", name: "Vikram Singh", email: "vikram@example.com", collegeId: "c3" },
  { id: "s6", name: "Ananya Gupta", email: "ananya@example.com", collegeId: "c3" },
];

const mockBatches: Batch[] = [
  {
    id: "b1",
    name: "Web Dev - Cohort 1",
    collegeId: "c1",
    collegeName: "Tech University",
    courseId: "co1",
    courseTitle: "Full Stack Web Development",
    mentorId: "m1",
    mentorName: "Harish Kumar",
    studentCount: 2,
    studentIds: ["s1", "s2"],
    status: "Active",
    startDate: "2024-01-20",
    endDate: "2024-04-20",
  },
  {
    id: "b2",
    name: "Data Sci - Cohort 3",
    collegeId: "c1",
    collegeName: "Tech University",
    courseId: "co3",
    courseTitle: "Data Science Essentials",
    mentorId: "m2",
    mentorName: "Pankaj Sharma",
    studentCount: 0,
    studentIds: [],
    status: "Under Evaluation",
    startDate: "2024-02-10",
    endDate: "2024-06-10",
  },
  {
    id: "b3",
    name: "Python - Cohort 4",
    collegeId: "c2",
    collegeName: "Science Institute",
    courseId: "co2",
    courseTitle: "Python Programming & Scripting",
    mentorId: "m3",
    mentorName: "Neha Roy",
    studentCount: 2,
    studentIds: ["s3", "s4"],
    status: "Created",
    startDate: "2024-06-15",
    endDate: "2024-08-15",
  },
];

const statusVariants: Record<Batch["status"], "default" | "success" | "warning" | "info" | "outline"> = {
  Created: "default",
  Active: "success",
  "Under Evaluation": "warning",
  Completed: "info",
  Archived: "outline",
};

export default function BatchesPage() {
  const [batches, setBatches] = useState<Batch[]>(mockBatches);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [collegeFilter, setCollegeFilter] = useState("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isStudentsOpen, setIsStudentsOpen] = useState(false);

  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formCollegeId, setFormCollegeId] = useState("");
  const [formCourseId, setFormCourseId] = useState("");
  const [formMentorId, setFormMentorId] = useState("");
  const [formStatus, setFormStatus] = useState<Batch["status"]>("Created");
  const [formStartDate, setFormStartDate] = useState("");
  const [formEndDate, setFormEndDate] = useState("");
  const [formStudentIds, setFormStudentIds] = useState<string[]>([]);

  const resetForm = () => {
    setFormName("");
    setFormCollegeId("");
    setFormCourseId("");
    setFormMentorId("");
    setFormStatus("Created");
    setFormStartDate("");
    setFormEndDate("");
    setFormStudentIds([]);
  };

  const handleCreateOpen = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formCollegeId || !formCourseId || !formMentorId) return;

    const college = mockColleges.find((c) => c.id === formCollegeId);
    const course = mockCourses.find((c) => c.id === formCourseId);
    const mentor = mockMentors.find((m) => m.id === formMentorId);

    const newBatch: Batch = {
      id: Date.now().toString(),
      name: formName,
      collegeId: formCollegeId,
      collegeName: college?.name || "Unknown",
      courseId: formCourseId,
      courseTitle: course?.title || "Unknown",
      mentorId: formMentorId,
      mentorName: mentor?.name || "Unknown",
      studentCount: formStudentIds.length,
      studentIds: formStudentIds,
      status: formStatus,
      startDate: formStartDate || new Date().toISOString().split("T")[0],
      endDate: formEndDate || new Date().toISOString().split("T")[0],
    };

    setBatches([newBatch, ...batches]);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleEditOpen = (batch: Batch) => {
    setSelectedBatch(batch);
    setFormName(batch.name);
    setFormCollegeId(batch.collegeId);
    setFormCourseId(batch.courseId);
    setFormMentorId(batch.mentorId);
    setFormStatus(batch.status);
    setFormStartDate(batch.startDate);
    setFormEndDate(batch.endDate);
    setFormStudentIds(batch.studentIds);
    setIsEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch || !formName || !formCollegeId || !formCourseId || !formMentorId) return;

    const college = mockColleges.find((c) => c.id === formCollegeId);
    const course = mockCourses.find((c) => c.id === formCourseId);
    const mentor = mockMentors.find((m) => m.id === formMentorId);

    setBatches(
      batches.map((b) =>
        b.id === selectedBatch.id
          ? {
              ...b,
              name: formName,
              collegeId: formCollegeId,
              collegeName: college?.name || "Unknown",
              courseId: formCourseId,
              courseTitle: course?.title || "Unknown",
              mentorId: formMentorId,
              mentorName: mentor?.name || "Unknown",
              status: formStatus,
              startDate: formStartDate,
              endDate: formEndDate,
            }
          : b
      )
    );
    setIsEditOpen(false);
    setSelectedBatch(null);
    resetForm();
  };

  const handleStudentsOpen = (batch: Batch) => {
    setSelectedBatch(batch);
    setFormStudentIds(batch.studentIds);
    setIsStudentsOpen(true);
  };

  const handleStudentsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBatch) return;

    setBatches(
      batches.map((b) =>
        b.id === selectedBatch.id
          ? {
              ...b,
              studentIds: formStudentIds,
              studentCount: formStudentIds.length,
            }
          : b
      )
    );
    setIsStudentsOpen(false);
    setSelectedBatch(null);
    resetForm();
  };

  const handleStudentCheck = (studentId: string, checked: boolean) => {
    if (checked) {
      setFormStudentIds([...formStudentIds, studentId]);
    } else {
      setFormStudentIds(formStudentIds.filter((id) => id !== studentId));
    }
  };

  const handleViewOpen = (batch: Batch) => {
    setSelectedBatch(batch);
    setIsViewOpen(true);
  };

  const filteredBatches = batches.filter((b) => {
    const matchesSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.courseTitle.toLowerCase().includes(search.toLowerCase()) ||
      b.mentorName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    const matchesCollege = collegeFilter === "all" || b.collegeId === collegeFilter;
    return matchesSearch && matchesStatus && matchesCollege;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Batches</h1>
          <p className="text-muted-foreground">
            Manage training batches, assign courses and mentors, and track student enrolment.
          </p>
        </div>
        <Button onClick={handleCreateOpen}>
          <Plus className="mr-2 h-4 w-4" />
          Create Batch
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[240px] max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search batch, course, mentor..."
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
                <SelectValue placeholder="All Lifecycle Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Created">Created</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Under Evaluation">Under Evaluation</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch Name</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Assigned Mentor</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                      No batches found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBatches.map((batch) => (
                    <TableRow key={batch.id}>
                      <TableCell className="font-semibold text-slate-800">
                        <div className="flex items-center gap-2">
                          <Layers className="h-4 w-4 text-indigo-600" />
                          {batch.name}
                        </div>
                      </TableCell>
                      <TableCell>{batch.collegeName}</TableCell>
                      <TableCell className="text-sm font-medium">{batch.courseTitle}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-slate-50 border-slate-200">
                          {batch.mentorName}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{batch.studentCount} Pupils</TableCell>
                      <TableCell>
                        <Badge variant={statusVariants[batch.status]}>
                          {batch.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button variant="ghost" size="icon" onClick={() => handleViewOpen(batch)} title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEditOpen(batch)} title="Edit Batch">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleStudentsOpen(batch)} className="text-xs">
                            Students
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

      {/* CREATE MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create Batch</DialogTitle>
            <DialogDescription>
              Set up a new training cohort, choose the college, course curriculum, and assign an expert mentor.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name">Batch Name *</Label>
              <Input
                id="name"
                placeholder="e.g. Web Dev - Cohort 1"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Select College *</Label>
                <Select value={formCollegeId} onValueChange={setFormCollegeId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose college..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockColleges.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Select Course *</Label>
                <Select value={formCourseId} onValueChange={setFormCourseId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose course..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Select Mentor *</Label>
                <Select value={formMentorId} onValueChange={setFormMentorId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose mentor..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMentors.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name} ({m.spec})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Lifecycle Status</Label>
                <Select value={formStatus} onValueChange={(val: Batch["status"]) => setFormStatus(val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Created">Created</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Under Evaluation">Under Evaluation</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="start">Start Date *</Label>
                <Input
                  id="start"
                  type="date"
                  value={formStartDate}
                  onChange={(e) => setFormStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="end">End Date *</Label>
                <Input
                  id="end"
                  type="date"
                  value={formEndDate}
                  onChange={(e) => setFormEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Batch</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Batch Information</DialogTitle>
            <DialogDescription>
              Update values for {selectedBatch?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="edit-name">Batch Name *</Label>
              <Input
                id="edit-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>College *</Label>
                <Select value={formCollegeId} onValueChange={setFormCollegeId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockColleges.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Course *</Label>
                <Select value={formCourseId} onValueChange={setFormCourseId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Assigned Mentor *</Label>
                <Select value={formMentorId} onValueChange={setFormMentorId}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {mockMentors.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.name} ({m.spec})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label>Lifecycle Status</Label>
                <Select value={formStatus} onValueChange={(val: Batch["status"]) => setFormStatus(val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Created">Created</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Under Evaluation">Under Evaluation</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="edit-start">Start Date *</Label>
                <Input
                  id="edit-start"
                  type="date"
                  value={formStartDate}
                  onChange={(e) => setFormStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-end">End Date *</Label>
                <Input
                  id="edit-end"
                  type="date"
                  value={formEndDate}
                  onChange={(e) => setFormEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ALLOCATE STUDENTS MODAL */}
      <Dialog open={isStudentsOpen} onOpenChange={setIsStudentsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Allocate Students to Batch</DialogTitle>
            <DialogDescription>
              Select which students from the same college belong to this batch.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleStudentsSubmit} className="space-y-4">
            <div className="space-y-2 border rounded-lg p-3 bg-slate-50/50 max-h-60 overflow-y-auto">
              {mockStudents
                .filter((s) => !selectedBatch?.collegeId || s.collegeId === selectedBatch.collegeId)
                .map((student) => {
                  const isChecked = formStudentIds.includes(student.id);
                  return (
                    <div key={student.id} className="flex items-center space-x-3 bg-white p-2 rounded border">
                      <Checkbox
                        id={`std-${student.id}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => handleStudentCheck(student.id, !!checked)}
                      />
                      <div className="flex-1 text-xs">
                        <Label htmlFor={`std-${student.id}`} className="font-semibold block cursor-pointer">
                          {student.name}
                        </Label>
                        <span className="text-[10px] text-muted-foreground">{student.email}</span>
                      </div>
                    </div>
                  );
                })}
              {mockStudents.filter((s) => !selectedBatch?.collegeId || s.collegeId === selectedBatch.collegeId).length === 0 && (
                <p className="text-xs text-muted-foreground text-center">No students available for this college.</p>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsStudentsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Update Student Roster</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* VIEW BATCH DETAILS MODAL */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-600" />
              Batch Details: {selectedBatch?.name}
            </DialogTitle>
          </DialogHeader>
          {selectedBatch && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <Label className="text-xs text-muted-foreground font-semibold">Associated College</Label>
                  <p className="font-medium text-slate-800">{selectedBatch.collegeName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground font-semibold">Curriculum Course</Label>
                  <p className="font-medium text-slate-800">{selectedBatch.courseTitle}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground font-semibold">Assigned Mentor</Label>
                  <p className="font-medium text-slate-800">{selectedBatch.mentorName}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground font-semibold">Lifecycle Status</Label>
                  <div>
                    <Badge variant={statusVariants[selectedBatch.status]}>{selectedBatch.status}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-xs text-muted-foreground">Start Date</Label>
                    <p className="text-xs font-semibold">{selectedBatch.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <Label className="text-xs text-muted-foreground">End Date</Label>
                    <p className="text-xs font-semibold">{selectedBatch.endDate}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-semibold">Enrolled Students ({selectedBatch.studentIds.length})</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedBatch.studentIds.map((id) => {
                    const student = mockStudents.find((s) => s.id === id);
                    if (!student) return null;
                    return (
                      <div key={id} className="flex justify-between items-center text-xs p-2 border.5 rounded bg-slate-50">
                        <div>
                          <span className="font-bold text-slate-700">{student.name}</span>
                          <span className="text-[10px] text-muted-foreground ml-2">({student.email})</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] bg-white text-indigo-700 border-indigo-200">
                          Active Learner
                        </Badge>
                      </div>
                    );
                  })}
                  {selectedBatch.studentIds.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">No students allocated to this batch yet.</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t">
                <Button onClick={() => setIsViewOpen(false)}>Close Window</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
