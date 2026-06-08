"use client";

import { useState } from "react";
import { Search, Eye, Users, Mail, Phone, Award, Star, UserPlus, X } from "lucide-react";
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

interface Mentor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  status: "ACTIVE" | "ON_STANDBY" | "INACTIVE";
  rating: number;
  assignedBatches: string[];
  collegeIds: string[];
}

const mockMentors: Mentor[] = [
  {
    id: "m1",
    name: "Harish Kumar",
    email: "harish@netpy.com",
    phone: "+91 99887 76655",
    specialization: "Full Stack Web Development",
    status: "ACTIVE",
    rating: 4.8,
    assignedBatches: ["Web Dev - Cohort 1"],
    collegeIds: ["c1"],
  },
  {
    id: "m2",
    name: "Pankaj Sharma",
    email: "pankaj@netpy.com",
    phone: "+91 99887 76656",
    specialization: "Data Science Essentials",
    status: "ACTIVE",
    rating: 4.6,
    assignedBatches: ["Data Sci - Cohort 3"],
    collegeIds: ["c1"],
  },
  {
    id: "m3",
    name: "Neha Roy",
    email: "neha@netpy.com",
    phone: "+91 99887 76657",
    specialization: "Python Programming & Scripting",
    status: "ON_STANDBY",
    rating: 4.5,
    assignedBatches: ["Python - Cohort 4"],
    collegeIds: ["c2"],
  },
  {
    id: "m4",
    name: "Siddharth Sen",
    email: "siddharth@netpy.com",
    phone: "+91 99887 76658",
    specialization: "Mobile Development (React Native)",
    status: "ON_STANDBY",
    rating: 4.9,
    assignedBatches: [],
    collegeIds: [],
  },
];

const mockAllColleges = [
  { id: "c1", name: "Tech University" },
  { id: "c2", name: "Science Institute" },
  { id: "c3", name: "Global Tech College" },
];

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>(mockMentors);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);

  // Assignment states
  const [assignCollegeId, setAssignCollegeId] = useState("");
  const [assignBatchName, setAssignBatchName] = useState("");

  const handleViewOpen = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsViewOpen(true);
  };

  const handleAssignOpen = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setAssignCollegeId(mentor.collegeIds[0] || "");
    setAssignBatchName("");
    setIsAssignOpen(true);
  };

  const handleAssignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMentor || !assignCollegeId || !assignBatchName) return;

    setMentors(
      mentors.map((m) =>
        m.id === selectedMentor.id
          ? {
              ...m,
              status: "ACTIVE",
              assignedBatches: Array.from(new Set([...m.assignedBatches, assignBatchName])),
              collegeIds: Array.from(new Set([...m.collegeIds, assignCollegeId])),
            }
          : m
      )
    );
    setIsAssignOpen(false);
    setSelectedMentor(null);
  };

  const filteredMentors = mentors.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.specialization.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && m.status === "ACTIVE") ||
      (statusFilter === "standby" && m.status === "ON_STANDBY") ||
      (statusFilter === "inactive" && m.status === "INACTIVE");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mentors</h1>
          <p className="text-muted-foreground">
            Directory of expert educators, active coaching cohorts, and ratings.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search mentor by name, skill, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Mentors</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="standby">On Standby</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentor Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Active Batches</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMentors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                      No mentors found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMentors.map((mentor) => (
                    <TableRow key={mentor.id}>
                      <TableCell className="font-semibold text-slate-800">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-indigo-600" />
                          {mentor.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-indigo-50/50 text-indigo-700 border-indigo-100">
                          {mentor.specialization}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">
                        <div className="space-y-0.5">
                          <p className="flex items-center gap-1"><Mail className="h-3 w-3 text-muted-foreground" /> {mentor.email}</p>
                          <p className="flex items-center gap-1"><Phone className="h-3 w-3 text-muted-foreground" /> {mentor.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                          <Star className="h-3.5 w-3.5 fill-amber-500" />
                          {mentor.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs font-semibold">
                          {mentor.assignedBatches.length} Batches
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          mentor.status === "ACTIVE" ? "success" :
                          mentor.status === "ON_STANDBY" ? "info" : "destructive"
                        }>
                          {mentor.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5">
                          <Button variant="ghost" size="icon" onClick={() => handleViewOpen(mentor)} title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleAssignOpen(mentor)} className="text-xs">
                            <UserPlus className="h-3.5 w-3.5 mr-1" />
                            Assign
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

      {/* VIEW DETAILS MODAL */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Mentor Profile</DialogTitle>
            <DialogDescription>
              Detailed record, skills, and cohort assignments.
            </DialogDescription>
          </DialogHeader>
          {selectedMentor && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 border-b pb-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-lg font-bold">
                  {selectedMentor.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{selectedMentor.name}</h3>
                  <Badge variant="outline" className="mt-0.5">{selectedMentor.specialization}</Badge>
                </div>
              </div>

              <div className="space-y-2 border-b pb-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-semibold">{selectedMentor.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-semibold">{selectedMentor.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Feedback Rating:</span>
                  <span className="font-bold text-amber-500 flex items-center gap-0.5">
                    <Star className="h-3 w-3 fill-amber-500" />
                    {selectedMentor.rating} / 5.0
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">System Status:</span>
                  <Badge variant={selectedMentor.status === "ACTIVE" ? "success" : "info"}>
                    {selectedMentor.status}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground font-semibold">Assigned Batches ({selectedMentor.assignedBatches.length})</Label>
                <div className="space-y-1">
                  {selectedMentor.assignedBatches.map((batch, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs p-2 border.5 rounded bg-slate-50">
                      <span className="font-bold text-slate-700">{batch}</span>
                      <span className="text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded">Mentor</span>
                    </div>
                  ))}
                  {selectedMentor.assignedBatches.length === 0 && (
                    <p className="text-xs text-muted-foreground italic">No cohorts assigned. Mentor is currently on standby.</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button onClick={() => setIsViewOpen(false)}>Close Profile</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ASSIGN MENTOR MODAL */}
      <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Mentor to Cohort</DialogTitle>
            <DialogDescription>
              Allocate {selectedMentor?.name} to a college and batch.
            </DialogDescription>
          </DialogHeader>
          {selectedMentor && (
            <form onSubmit={handleAssignSubmit} className="space-y-4">
              <div className="space-y-1">
                <Label>Select College</Label>
                <Select value={assignCollegeId} onValueChange={setAssignCollegeId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose college..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mockAllColleges.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="batch-name">New Batch Name Assignment *</Label>
                <Input
                  id="batch-name"
                  placeholder="e.g. Web Dev - Cohort 1"
                  value={assignBatchName}
                  onChange={(e) => setAssignBatchName(e.target.value)}
                  required
                />
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAssignOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Allocate Mentor</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
