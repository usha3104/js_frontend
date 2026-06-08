"use client";

import { useState } from "react";
import { Plus, Search, Edit2, BookOpen, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CourseModule {
  id: string;
  title: string;
  durationWeeks: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  durationWeeks: number;
  modules: CourseModule[];
  status: "PUBLISHED" | "DRAFT";
  createdAt: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and Databases to build fully functional web applications.",
    durationWeeks: 12,
    modules: [
      { id: "m1", title: "Frontend Basics (HTML/CSS/JS)", durationWeeks: 4 },
      { id: "m2", title: "React & State Management", durationWeeks: 4 },
      { id: "m3", title: "Backend API development with Express & SQL", durationWeeks: 4 },
    ],
    status: "PUBLISHED",
    createdAt: "2024-01-10",
  },
  {
    id: "2",
    title: "Python Programming & Scripting",
    description: "Master Python fundamentals, OOPs, file operations, web scraping, and automation scripts.",
    durationWeeks: 8,
    modules: [
      { id: "m4", title: "Core Python & Data Types", durationWeeks: 3 },
      { id: "m5", title: "Object-Oriented Programming & Modules", durationWeeks: 3 },
      { id: "m6", title: "Web Scraping & Scripting", durationWeeks: 2 },
    ],
    status: "PUBLISHED",
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    title: "Data Science Essentials",
    description: "Learn NumPy, Pandas, Data Visualization, and basic ML algorithms with hands-on practice.",
    durationWeeks: 16,
    modules: [
      { id: "m7", title: "Data Analysis with Pandas", durationWeeks: 5 },
      { id: "m8", title: "Data Visualisation", durationWeeks: 4 },
      { id: "m9", title: "Introduction to Machine Learning", durationWeeks: 7 },
    ],
    status: "DRAFT",
    createdAt: "2024-02-15",
  },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Form Fields state
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formDuration, setFormDuration] = useState(8);
  const [formStatus, setFormStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  
  // Temporary module structure during create/edit
  const [formModules, setFormModules] = useState<CourseModule[]>([
    { id: "temp-1", title: "Introduction", durationWeeks: 2 },
  ]);
  const [newModTitle, setNewModTitle] = useState("");
  const [newModDuration, setNewModDuration] = useState(2);

  const resetForm = () => {
    setFormTitle("");
    setFormDescription("");
    setFormDuration(8);
    setFormStatus("DRAFT");
    setFormModules([{ id: "temp-1", title: "Introduction", durationWeeks: 2 }]);
    setNewModTitle("");
    setNewModDuration(2);
  };

  const handleAddModule = () => {
    if (!newModTitle) return;
    setFormModules([
      ...formModules,
      {
        id: `temp-${Date.now()}`,
        title: newModTitle,
        durationWeeks: newModDuration,
      },
    ]);
    setNewModTitle("");
    setNewModDuration(2);
  };

  const handleRemoveModule = (id: string) => {
    setFormModules(formModules.filter((m) => m.id !== id));
  };

  const handleCreateOpen = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formDescription) return;

    // Total course duration is the sum of module durations
    const totalDuration = formModules.reduce((acc, curr) => acc + Number(curr.durationWeeks), 0);

    const newCourse: Course = {
      id: Date.now().toString(),
      title: formTitle,
      description: formDescription,
      durationWeeks: totalDuration || formDuration,
      modules: formModules,
      status: formStatus,
      createdAt: new Date().toISOString().split("T")[0],
    };

    setCourses([newCourse, ...courses]);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleEditOpen = (course: Course) => {
    setSelectedCourse(course);
    setFormTitle(course.title);
    setFormDescription(course.description);
    setFormDuration(course.durationWeeks);
    setFormStatus(course.status);
    setFormModules([...course.modules]);
    setIsEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse || !formTitle || !formDescription) return;

    const totalDuration = formModules.reduce((acc, curr) => acc + Number(curr.durationWeeks), 0);

    setCourses(
      courses.map((c) =>
        c.id === selectedCourse.id
          ? {
              ...c,
              title: formTitle,
              description: formDescription,
              durationWeeks: totalDuration || formDuration,
              modules: formModules,
              status: formStatus,
            }
          : c
      )
    );
    setIsEditOpen(false);
    setSelectedCourse(null);
    resetForm();
  };

  const handleTogglePublish = (course: Course) => {
    setCourses(
      courses.map((c) =>
        c.id === course.id
          ? { ...c, status: c.status === "PUBLISHED" ? "DRAFT" : "PUBLISHED" }
          : c
      )
    );
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "published" && c.status === "PUBLISHED") ||
      (statusFilter === "draft" && c.status === "DRAFT");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Course Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and publish training programs for NetPy cohorts.
          </p>
        </div>
        <Button onClick={handleCreateOpen}>
          <Plus className="mr-2 h-4 w-4" />
          Create Course
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or description..."
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
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Curriculum</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Modules</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                      No courses found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="max-w-md">
                        <div className="flex items-start gap-2">
                          <BookOpen className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="font-semibold">{course.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                              {course.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{course.durationWeeks} Weeks</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="font-bold">
                          {course.modules.length} Modules
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.status === "PUBLISHED" ? "success" : "warning"}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleEditOpen(course)} 
                            title="Edit Course"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleTogglePublish(course)}
                            className="text-xs"
                          >
                            {course.status === "PUBLISHED" ? "Mark Draft" : "Publish"}
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
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create Training Course</DialogTitle>
            <DialogDescription>
              Define the curriculum, timeline, and core topics for students.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                placeholder="e.g. Full Stack Web Development"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="description">Curriculum Description *</Label>
              <Textarea
                id="description"
                placeholder="Explain the overview, objectives, and prerequisites..."
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3 border rounded-lg p-4 bg-slate-50/50">
              <div className="flex justify-between items-center">
                <Label className="font-bold text-slate-800 text-sm">Course Modules</Label>
                <span className="text-xs text-muted-foreground font-semibold">
                  Total Duration: {formModules.reduce((acc, curr) => acc + Number(curr.durationWeeks), 0)} Weeks
                </span>
              </div>
              
              {/* Modules list */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {formModules.map((mod, index) => (
                  <div key={mod.id} className="flex justify-between items-center bg-white p-2.5 rounded border text-xs">
                    <div>
                      <span className="font-semibold text-slate-600 mr-2">Mod {index + 1}:</span>
                      <span>{mod.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-muted-foreground">{mod.durationWeeks} Weeks</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveModule(mod.id)}
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add module input row */}
              <div className="grid grid-cols-5 gap-2 border-t pt-3">
                <div className="col-span-3 space-y-1">
                  <Input
                    placeholder="New Module Title"
                    value={newModTitle}
                    onChange={(e) => setNewModTitle(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Weeks"
                    value={newModDuration}
                    onChange={(e) => setNewModDuration(Number(e.target.value))}
                    className="h-9 text-xs"
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddModule}
                  className="h-9 text-xs"
                >
                  Add Mod
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="status">Initial Status</Label>
                <Select 
                  value={formStatus} 
                  onValueChange={(val: "DRAFT" | "PUBLISHED") => setFormStatus(val)}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Course</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Course Details</DialogTitle>
            <DialogDescription>
              Modify name, overview, and structure for {selectedCourse?.title}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="edit-title">Course Title *</Label>
              <Input
                id="edit-title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-description">Curriculum Description *</Label>
              <Textarea
                id="edit-description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-3 border rounded-lg p-4 bg-slate-50/50">
              <div className="flex justify-between items-center">
                <Label className="font-bold text-slate-800 text-sm">Course Modules</Label>
                <span className="text-xs text-muted-foreground font-semibold">
                  Total Duration: {formModules.reduce((acc, curr) => acc + Number(curr.durationWeeks), 0)} Weeks
                </span>
              </div>
              
              {/* Modules list */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {formModules.map((mod, index) => (
                  <div key={mod.id} className="flex justify-between items-center bg-white p-2.5 rounded border text-xs">
                    <div>
                      <span className="font-semibold text-slate-600 mr-2">Mod {index + 1}:</span>
                      <span>{mod.title}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-muted-foreground">{mod.durationWeeks} Weeks</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveModule(mod.id)}
                        className="h-6 w-6 text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add module input row */}
              <div className="grid grid-cols-5 gap-2 border-t pt-3">
                <div className="col-span-3 space-y-1">
                  <Input
                    placeholder="New Module Title"
                    value={newModTitle}
                    onChange={(e) => setNewModTitle(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Weeks"
                    value={newModDuration}
                    onChange={(e) => setNewModDuration(Number(e.target.value))}
                    className="h-9 text-xs"
                  />
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleAddModule}
                  className="h-9 text-xs"
                >
                  Add Mod
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={formStatus} 
                  onValueChange={(val: "DRAFT" | "PUBLISHED") => setFormStatus(val)}
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="PUBLISHED">Published</SelectItem>
                  </SelectContent>
                </Select>
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
    </div>
  );
}
