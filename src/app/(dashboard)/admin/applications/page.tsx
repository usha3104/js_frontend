"use client";

import { useState } from "react";
import { Search, Eye, Download } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Application {
  id: string;
  studentName: string;
  studentEmail: string;
  formTitle: string;
  status: "PENDING" | "UNDER_REVIEW" | "SHORTLISTED" | "REJECTED" | "SELECTED";
  submittedAt: string;
  score?: number;
}

const mockApplications: Application[] = [
  {
    id: "1",
    studentName: "Rahul Sharma",
    studentEmail: "rahul@example.com",
    formTitle: "B.Tech Admission 2025",
    status: "PENDING",
    submittedAt: "2024-12-15",
  },
  {
    id: "2",
    studentName: "Priya Patel",
    studentEmail: "priya@example.com",
    formTitle: "M.Tech Admission 2025",
    status: "UNDER_REVIEW",
    submittedAt: "2024-12-14",
  },
  {
    id: "3",
    studentName: "Amit Kumar",
    studentEmail: "amit@example.com",
    formTitle: "B.Tech Admission 2025",
    status: "SHORTLISTED",
    submittedAt: "2024-12-13",
    score: 85,
  },
  {
    id: "4",
    studentName: "Sneha Reddy",
    studentEmail: "sneha@example.com",
    formTitle: "MBA Admission 2025",
    status: "SELECTED",
    submittedAt: "2024-12-12",
    score: 92,
  },
  {
    id: "5",
    studentName: "Vikram Singh",
    studentEmail: "vikram@example.com",
    formTitle: "B.Tech Admission 2025",
    status: "REJECTED",
    submittedAt: "2024-12-11",
    score: 45,
  },
];

const statusVariant: Record<Application["status"], "default" | "warning" | "info" | "success" | "destructive"> = {
  PENDING: "warning",
  UNDER_REVIEW: "info",
  SHORTLISTED: "default",
  REJECTED: "destructive",
  SELECTED: "success",
};

export default function ApplicationsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const filteredApplications = mockApplications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(search.toLowerCase()) ||
      app.studentEmail.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
        <p className="text-muted-foreground">
          Review and manage student applications
        </p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search applicants..."
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
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                <SelectItem value="SHORTLISTED">Shortlisted</SelectItem>
                <SelectItem value="SELECTED">Selected</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Form</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{app.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {app.studentEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{app.formTitle}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariant[app.status]}>
                      {app.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {app.score ? `${app.score}/100` : "-"}
                  </TableCell>
                  <TableCell>{app.submittedAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedApp(app)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              Review application information and responses
            </DialogDescription>
          </DialogHeader>
          {selectedApp && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Student Name
                  </p>
                  <p className="font-medium">{selectedApp.studentName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Email
                  </p>
                  <p className="font-medium">{selectedApp.studentEmail}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Application For
                  </p>
                  <p className="font-medium">{selectedApp.formTitle}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Status
                  </p>
                  <Badge variant={statusVariant[selectedApp.status]}>
                    {selectedApp.status.replace("_", " ")}
                  </Badge>
                </div>
              </div>
              <div className="rounded-lg border p-4 space-y-3">
                <h4 className="font-medium">Application Responses</h4>
                {[
                  { question: "Full Name", answer: selectedApp.studentName },
                  { question: "Email", answer: selectedApp.studentEmail },
                  { question: "Department", answer: "Computer Science" },
                  { question: "Previous Education", answer: "12th Grade - 95%" },
                ].map((response, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2">
                    <p className="text-sm text-muted-foreground">
                      {response.question}
                    </p>
                    <p className="col-span-2 text-sm">{response.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
