"use client";

import { useState } from "react";
import { Star, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Evaluation {
  id: string;
  studentName: string;
  applicationId: string;
  evaluatorName: string;
  status: "PENDING" | "COMPLETED";
  score?: number;
  interviewDate?: string;
}

const mockEvaluations: Evaluation[] = [
  {
    id: "1",
    studentName: "Rahul Sharma",
    applicationId: "APP001",
    evaluatorName: "Dr. Smith",
    status: "PENDING",
    interviewDate: "2024-12-20",
  },
  {
    id: "2",
    studentName: "Priya Patel",
    applicationId: "APP002",
    evaluatorName: "Dr. Johnson",
    status: "COMPLETED",
    score: 87,
    interviewDate: "2024-12-18",
  },
  {
    id: "3",
    studentName: "Amit Kumar",
    applicationId: "APP003",
    evaluatorName: "Dr. Smith",
    status: "PENDING",
    interviewDate: "2024-12-22",
  },
];

export default function EvaluationsPage() {
  const [evaluations] = useState(mockEvaluations);
  const [selectedEval, setSelectedEval] = useState<Evaluation | null>(null);
  const [scores, setScores] = useState({
    skills: 0,
    resume: 0,
    academic: 0,
    interview: 0,
    remarks: "",
  });

  const handleScore = (eval_item: Evaluation) => {
    setSelectedEval(eval_item);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Evaluations</h1>
        <p className="text-muted-foreground">
          Evaluate and score student applications
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Evaluations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Application ID</TableHead>
                <TableHead>Evaluator</TableHead>
                <TableHead>Interview Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {evaluations.map((eval_item) => (
                <TableRow key={eval_item.id}>
                  <TableCell className="font-medium">
                    {eval_item.studentName}
                  </TableCell>
                  <TableCell>{eval_item.applicationId}</TableCell>
                  <TableCell>{eval_item.evaluatorName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {eval_item.interviewDate}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        eval_item.status === "COMPLETED" ? "success" : "warning"
                      }
                    >
                      {eval_item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant={
                        eval_item.status === "COMPLETED"
                          ? "outline"
                          : "default"
                      }
                      size="sm"
                      onClick={() => handleScore(eval_item)}
                    >
                      <Star className="mr-2 h-4 w-4" />
                      {eval_item.status === "COMPLETED" ? "View" : "Evaluate"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedEval} onOpenChange={() => setSelectedEval(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Evaluate Application</DialogTitle>
            <DialogDescription>
              Score the applicant on various criteria
            </DialogDescription>
          </DialogHeader>
          {selectedEval && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-3">
                <p className="font-medium">{selectedEval.studentName}</p>
                <p className="text-sm text-muted-foreground">
                  Application ID: {selectedEval.applicationId}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Skills Score (0-100)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={scores.skills || ""}
                    onChange={(e) =>
                      setScores({
                        ...scores,
                        skills: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Resume Score (0-100)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={scores.resume || ""}
                    onChange={(e) =>
                      setScores({
                        ...scores,
                        resume: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Academic Score (0-100)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={scores.academic || ""}
                    onChange={(e) =>
                      setScores({
                        ...scores,
                        academic: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Interview Score (0-100)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={scores.interview || ""}
                    onChange={(e) =>
                      setScores({
                        ...scores,
                        interview: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Remarks</Label>
                <Textarea
                  placeholder="Add evaluation remarks..."
                  value={scores.remarks}
                  onChange={(e) =>
                    setScores({ ...scores, remarks: e.target.value })
                  }
                />
              </div>
              <div className="rounded-lg bg-primary/10 p-3">
                <p className="text-sm font-medium">
                  Total Score:{" "}
                  {Math.round(
                    (scores.skills +
                      scores.resume +
                      scores.academic +
                      scores.interview) /
                      4
                  )}
                  /100
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedEval(null)}>
              Cancel
            </Button>
            <Button onClick={() => setSelectedEval(null)}>
              Submit Evaluation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
