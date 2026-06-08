"use client";

import { useState } from "react";
import { Search, Filter, Eye, Download, CheckCircle2, Clock, XCircle, AlertCircle, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Application {
  id: string;
  studentName: string;
  college: string;
  status: "PENDING" | "UNDER_REVIEW" | "SHORTLISTED" | "REJECTED" | "SELECTED" | "ONBOARDED";
  submittedDate: string;
  resumeStatus: "VERIFIED" | "PENDING" | "REJECTED";
  evaluationStatus: "COMPLETED" | "IN_PROGRESS" | "PENDING";
}

const mockApplications: Application[] = [
  {
    id: "1",
    studentName: "John Smith",
    college: "Tech University",
    status: "UNDER_REVIEW",
    submittedDate: "2024-05-01",
    resumeStatus: "VERIFIED",
    evaluationStatus: "IN_PROGRESS",
  },
  {
    id: "2",
    studentName: "Alice Connor",
    college: "Science Institute",
    status: "SELECTED",
    submittedDate: "2024-05-02",
    resumeStatus: "VERIFIED",
    evaluationStatus: "COMPLETED",
  },
  {
    id: "3",
    studentName: "Bob Wilson",
    college: "Tech University",
    status: "PENDING",
    submittedDate: "2024-05-03",
    resumeStatus: "PENDING",
    evaluationStatus: "PENDING",
  },
];

const statusStyles = {
  PENDING: { bg: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20", icon: Clock },
  UNDER_REVIEW: { bg: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: AlertCircle },
  SHORTLISTED: { bg: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: CheckCircle2 },
  SELECTED: { bg: "bg-green-500/10 text-green-600 border-green-500/20", icon: CheckCircle2 },
  ONBOARDED: { bg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: GraduationCap },
  REJECTED: { bg: "bg-red-500/10 text-red-600 border-red-500/20", icon: XCircle },
};


export default function ApplicationsMonitoringPage() {
  const [search, setSearch] = useState("");
  const [applications] = useState<Application[]>(mockApplications);

  const filteredApplications = applications.filter(
    (app) =>
      app.studentName.toLowerCase().includes(search.toLowerCase()) ||
      app.college.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Application Monitoring</h1>
        <p className="text-muted-foreground">Monitor and track student applications across all colleges</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">452</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search student or college..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Colleges" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Colleges</SelectItem>
                <SelectItem value="tech">Tech University</SelectItem>
                <SelectItem value="science">Science Institute</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                <SelectItem value="SELECTED">Selected</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              More Filters
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="pl-6">Student Name</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Application Status</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Resume Status</TableHead>
                <TableHead>Evaluation</TableHead>
                <TableHead className="text-right pr-6">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => {
                const style = statusStyles[app.status];
                const StatusIcon = style.icon;
                return (
                  <TableRow key={app.id}>
                    <TableCell className="pl-6 font-medium">{app.studentName}</TableCell>
                    <TableCell>{app.college}</TableCell>
                    <TableCell>
                      <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border", style.bg)}>
                        <StatusIcon className="h-3 w-3" />
                        {app.status.replace("_", " ")}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{app.submittedDate}</TableCell>
                    <TableCell>
                      <Badge variant={app.resumeStatus === "VERIFIED" ? "success" : "secondary"}>
                        {app.resumeStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all",
                              app.evaluationStatus === "COMPLETED" ? "bg-green-500 w-full" : 
                              app.evaluationStatus === "IN_PROGRESS" ? "bg-primary w-1/2" : "bg-muted w-0"
                            )} 
                          />
                        </div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{app.evaluationStatus}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
