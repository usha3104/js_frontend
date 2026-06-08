"use client";

import { useState } from "react";
import { Search, Download, BarChart3, Building2, BookOpen, Users, Calendar, Check, AlertCircle } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock Data for Reports
const batchReports = [
  { id: "br1", name: "Web Dev - Cohort 1", college: "Tech University", course: "Full Stack Web Development", students: 45, avgAttendance: 91.5, avgScore: 84.5, completion: 85 },
  { id: "br2", name: "Data Sci - Cohort 3", college: "Tech University", course: "Data Science Essentials", students: 35, avgAttendance: 94.6, avgScore: 89.2, completion: 95 },
  { id: "br3", name: "Python - Cohort 4", college: "Science Institute", course: "Python Programming & Scripting", students: 30, avgAttendance: 81.2, avgScore: 78.4, completion: 40 },
];

const studentReports = [
  { id: "sr1", name: "Rahul Sharma", college: "Tech University", batch: "Web Dev - Cohort 1", attendance: 95, verified: "Yes", grade: "A (92%)" },
  { id: "sr2", name: "Priya Patel", college: "Tech University", batch: "Web Dev - Cohort 1", attendance: 87.5, verified: "Yes", grade: "B+ (86%)" },
  { id: "sr3", name: "Amit Kumar", college: "Science Institute", batch: "Python - Cohort 4", attendance: 91.6, verified: "Yes", grade: "B (80%)" },
  { id: "sr4", name: "Sneha Reddy", college: "Science Institute", batch: "Python - Cohort 4", attendance: 75, verified: "Pending", grade: "A+ (95%)" },
];

const mentorReports = [
  { id: "mr1", name: "Harish Kumar", spec: "Full Stack Web Dev", activeBatches: 1, avgAttendance: 91.5, studentsCoached: 45, studentRating: 4.8 },
  { id: "mr2", name: "Pankaj Sharma", spec: "Data Science Essentials", activeBatches: 1, avgAttendance: 94.6, studentsCoached: 35, studentRating: 4.6 },
  { id: "mr3", name: "Neha Roy", spec: "Python Programming", activeBatches: 1, avgAttendance: 81.2, studentsCoached: 30, studentRating: 4.5 },
];

const courseReports = [
  { id: "cr1", title: "Full Stack Web Development", enrolments: 124, activeBatches: 3, status: "PUBLISHED", duration: 12, completionRate: 88 },
  { id: "cr2", title: "Python Programming & Scripting", enrolments: 95, activeBatches: 2, status: "PUBLISHED", duration: 8, completionRate: 91 },
  { id: "cr3", title: "Data Science Essentials", enrolments: 40, activeBatches: 1, status: "DRAFT", duration: 16, completionRate: 64 },
];

export default function ReportsPage() {
  const [activeTab, setActiveTab] = useState("batches");
  const [collegeFilter, setCollegeFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [search, setSearch] = useState("");
  
  // Date filtering states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Export notifications state
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const triggerExport = (format: string) => {
    setExportNotice(`Exporting ${activeTab} report as ${format.toUpperCase()}...`);
    setTimeout(() => {
      setExportNotice(`Successfully exported ${activeTab} report! check your downloads.`);
      setTimeout(() => {
        setExportNotice(null);
      }, 3000);
    }, 1500);
  };

  const filteredBatches = batchReports.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(search.toLowerCase()) || b.course.toLowerCase().includes(search.toLowerCase());
    const matchesCollege = collegeFilter === "all" || b.college.includes(collegeFilter === "c1" ? "Tech University" : collegeFilter === "c2" ? "Science Institute" : "Global Tech");
    return matchesSearch && matchesCollege;
  });

  const filteredStudents = studentReports.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.batch.toLowerCase().includes(search.toLowerCase());
    const matchesCollege = collegeFilter === "all" || s.college.includes(collegeFilter === "c1" ? "Tech University" : collegeFilter === "c2" ? "Science Institute" : "Global Tech");
    return matchesSearch && matchesCollege;
  });

  const filteredMentors = mentorReports.filter((m) => {
    return m.name.toLowerCase().includes(search.toLowerCase()) || m.spec.toLowerCase().includes(search.toLowerCase());
  });

  const filteredCourses = courseReports.filter((c) => {
    return c.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">
            Generate and export summaries of batch activities, mentor performance, student metrics, and course completions.
          </p>
        </div>
      </div>

      {/* Export feedback message */}
      {exportNotice && (
        <div className={`p-4 rounded-lg flex items-center gap-3 border ${
          exportNotice.includes("Successfully") 
            ? "bg-green-50 border-green-200 text-green-800" 
            : "bg-indigo-50 border-indigo-200 text-indigo-800"
        } transition-all`}>
          {exportNotice.includes("Successfully") ? (
            <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
          ) : (
            <div className="h-4 w-4 border-2 border-indigo-600 border-t-transparent animate-spin rounded-full flex-shrink-0" />
          )}
          <span className="text-sm font-semibold">{exportNotice}</span>
        </div>
      )}

      {/* Filter and settings bar */}
      <Card>
        <CardContent className="p-4 grid gap-4 md:grid-cols-5 items-end">
          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Filter College</Label>
            <Select value={collegeFilter} onValueChange={setCollegeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Colleges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                <SelectItem value="c1">Tech University</SelectItem>
                <SelectItem value="c2">Science Institute</SelectItem>
                <SelectItem value="c3">Global Tech College</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Filter Course</Label>
            <Select value={courseFilter} onValueChange={setCourseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="co1">Full Stack Web Dev</SelectItem>
                <SelectItem value="co2">Python Basics</SelectItem>
                <SelectItem value="co3">Data Science</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">Start Date</Label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-10" />
          </div>

          <div className="space-y-1">
            <Label className="text-xs font-bold text-slate-700">End Date</Label>
            <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-10" />
          </div>

          <div className="relative">
            <Search className="absolute left-2.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Reports Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <TabsList className="bg-slate-100 p-1 border">
            <TabsTrigger value="batches" className="flex items-center gap-1.5">
              <Building2 className="h-4 w-4" />
              Batches Report
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              Students Report
            </TabsTrigger>
            <TabsTrigger value="mentors" className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              Mentors Report
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-1.5">
              <BookOpen className="h-4 w-4" />
              Courses Report
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => triggerExport("csv")}>
              <Download className="mr-1.5 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" size="sm" onClick={() => triggerExport("pdf")}>
              <Download className="mr-1.5 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* BATCH REPORTS */}
        <TabsContent value="batches" className="border rounded-lg bg-white p-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Batch Cohort</TableHead>
                  <TableHead>College Name</TableHead>
                  <TableHead>Curriculum Course</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Avg Attendance</TableHead>
                  <TableHead>Avg Test Score</TableHead>
                  <TableHead>Completion Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBatches.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell className="font-semibold text-slate-800">{b.name}</TableCell>
                    <TableCell>{b.college}</TableCell>
                    <TableCell className="text-xs font-semibold text-indigo-700">{b.course}</TableCell>
                    <TableCell className="font-medium">{b.students} students</TableCell>
                    <TableCell className="font-mono text-sm font-semibold">{b.avgAttendance}%</TableCell>
                    <TableCell className="font-mono text-sm font-semibold text-green-700">{b.avgScore}%</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${b.completion}%` }} />
                        </div>
                        <span className="text-[11px] font-bold">{b.completion}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* STUDENT REPORTS */}
        <TabsContent value="students" className="border rounded-lg bg-white p-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student Name</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Batch Name</TableHead>
                  <TableHead>Attendance Rate</TableHead>
                  <TableHead>Verified</TableHead>
                  <TableHead>Academic Grade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-semibold text-slate-800">{s.name}</TableCell>
                    <TableCell>{s.college}</TableCell>
                    <TableCell>{s.batch}</TableCell>
                    <TableCell className="font-mono text-sm font-semibold">{s.attendance}%</TableCell>
                    <TableCell>
                      <Badge variant={s.verified === "Yes" ? "success" : "warning"}>
                        {s.verified === "Yes" ? "Verified" : "Pending"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs font-bold text-green-700">{s.grade}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* MENTOR REPORTS */}
        <TabsContent value="mentors" className="border rounded-lg bg-white p-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mentor Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Active Batches</TableHead>
                  <TableHead>Avg Attendance</TableHead>
                  <TableHead>Students Coached</TableHead>
                  <TableHead>Feedback Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMentors.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-semibold text-slate-800">{m.name}</TableCell>
                    <TableCell>{m.spec}</TableCell>
                    <TableCell className="font-semibold">{m.activeBatches} Batches</TableCell>
                    <TableCell className="font-mono text-sm font-semibold">{m.avgAttendance}%</TableCell>
                    <TableCell className="font-medium">{m.studentsCoached} pupils</TableCell>
                    <TableCell className="font-mono text-sm font-bold text-amber-500">★ {m.studentRating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        {/* COURSE REPORTS */}
        <TabsContent value="courses" className="border rounded-lg bg-white p-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course curriculum</TableHead>
                  <TableHead>Total Enrolled</TableHead>
                  <TableHead>Batches Created</TableHead>
                  <TableHead>Duration Weeks</TableHead>
                  <TableHead>Publish Status</TableHead>
                  <TableHead>Completion Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-semibold text-slate-800">{c.title}</TableCell>
                    <TableCell className="font-semibold">{c.enrolments} Students</TableCell>
                    <TableCell>{c.activeBatches} Cohorts</TableCell>
                    <TableCell>{c.duration} Weeks</TableCell>
                    <TableCell>
                      <Badge variant={c.status === "PUBLISHED" ? "success" : "warning"}>
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${c.completionRate}%` }} />
                        </div>
                        <span className="text-[11px] font-bold">{c.completionRate}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
