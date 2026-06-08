"use client";

import { useState } from "react";
import { GraduationCap, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OnboardingCandidate {
  id: string;
  studentName: string;
  studentEmail: string;
  score: number;
  status: "PENDING" | "ONBOARDED";
  selectedDate: string;
}

const mockCandidates: OnboardingCandidate[] = [
  {
    id: "1",
    studentName: "Sneha Reddy",
    studentEmail: "sneha@example.com",
    score: 92,
    status: "PENDING",
    selectedDate: "2024-12-12",
  },
  {
    id: "2",
    studentName: "Karthik Nair",
    studentEmail: "karthik@example.com",
    score: 88,
    status: "PENDING",
    selectedDate: "2024-12-10",
  },
  {
    id: "3",
    studentName: "Ananya Gupta",
    studentEmail: "ananya@example.com",
    score: 95,
    status: "ONBOARDED",
    selectedDate: "2024-12-08",
  },
];

export default function OnboardingPage() {
  const [candidates] = useState(mockCandidates);
  const [courseAssignments, setCourseAssignments] = useState<
    Record<string, string>
  >({});

  const handleOnboard = (id: string) => {
    // TODO: Connect with onboarding API
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Student Onboarding</h1>
        <p className="text-muted-foreground">
          Convert selected applicants to students and assign courses
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Onboarding
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {candidates.filter((c) => c.status === "PENDING").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Onboarded This Month
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {candidates.filter((c) => c.status === "ONBOARDED").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Score
            </CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">91.5</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Selected Candidates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Selected Date</TableHead>
                <TableHead>Assign Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{candidate.studentName}</p>
                      <p className="text-sm text-muted-foreground">
                        {candidate.studentEmail}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="success">{candidate.score}/100</Badge>
                  </TableCell>
                  <TableCell>{candidate.selectedDate}</TableCell>
                  <TableCell>
                    <Select
                      value={courseAssignments[candidate.id] || ""}
                      onValueChange={(value) =>
                        setCourseAssignments({
                          ...courseAssignments,
                          [candidate.id]: value,
                        })
                      }
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select course" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btech-cse">B.Tech CSE</SelectItem>
                        <SelectItem value="btech-ece">B.Tech ECE</SelectItem>
                        <SelectItem value="mtech">M.Tech</SelectItem>
                        <SelectItem value="mba">MBA</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        candidate.status === "ONBOARDED" ? "success" : "warning"
                      }
                    >
                      {candidate.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      disabled={
                        candidate.status === "ONBOARDED" ||
                        !courseAssignments[candidate.id]
                      }
                      onClick={() => handleOnboard(candidate.id)}
                    >
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Onboard
                    </Button>
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
