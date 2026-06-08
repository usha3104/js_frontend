"use client";

import { useState } from "react";
import { Plus, Search, Edit2, ToggleLeft, ToggleRight, BookOpen } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const courseSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  duration: z.string().min(1, "Duration is required"),
  modules: z.array(z.object({
    name: z.string().min(1, "Module name is required")
  })).min(1, "At least one module is required"),
  assignments: z.string(),
  projects: z.string(),
  evaluationCriteria: z.string(),
  status: z.boolean().default(true),
});

type CourseFormValues = z.infer<typeof courseSchema>;

interface Course {
  id: string;
  title: string;
  duration: string;
  modules: number;
  status: "ACTIVE" | "INACTIVE";
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Full Stack Web Development",
    duration: "6 Months",
    modules: 12,
    status: "ACTIVE",
  },
  {
    id: "2",
    title: "Data Science and Machine Learning",
    duration: "8 Months",
    modules: 15,
    status: "ACTIVE",
  },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      duration: "",
      modules: [{ name: "" }],
      assignments: "",
      projects: "",
      evaluationCriteria: "",
      status: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "modules",
    control: form.control,
  });

  const onSubmit = (data: CourseFormValues) => {
    setCourses([...courses, {
      id: Date.now().toString(),
      title: data.title,
      duration: data.duration,
      modules: data.modules.length,
      status: data.status ? "ACTIVE" : "INACTIVE",
    }]);
    setIsCreateOpen(false);
    form.reset();
  };

  const filteredCourses = courses.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">
            Manage course curriculum and materials
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Define a new course, its modules, and evaluation criteria.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Title</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., Intro to Programming" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration</FormLabel>
                        <FormControl>
                          <Input placeholder="E.g., 12 Weeks" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-base">Modules</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "" })}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Module
                    </Button>
                  </div>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`modules.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder={`Module ${index + 1} Name`} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      {fields.length > 1 && (
                        <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                          X
                        </Button>
                      )}
                    </div>
                  ))}
                </div>

                <FormField
                  control={form.control}
                  name="assignments"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assignments Details</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe expected assignments" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="projects"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Projects Details</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe required projects" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="evaluationCriteria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Evaluation Criteria</FormLabel>
                      <FormControl>
                        <Textarea placeholder="E.g., 50% Assignments, 50% Projects" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Status</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Toggle whether this course is active
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Course</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="relative max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Modules</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      {course.title}
                    </div>
                  </TableCell>
                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.modules}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        course.status === "ACTIVE" ? "success" : "destructive"
                      }
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        {course.status === "ACTIVE" ? (
                          <ToggleLeft className="h-4 w-4 text-green-500" />
                        ) : (
                          <ToggleRight className="h-4 w-4 text-red-500" />
                        )}
                      </Button>
                    </div>
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
