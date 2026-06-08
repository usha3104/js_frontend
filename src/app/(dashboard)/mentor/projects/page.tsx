"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle, FolderGit2, CheckCircle2, Award, Loader2 } from "lucide-react";

interface CapstoneProject {
  id: string;
  title: string;
  batch: string;
  maxTeamSize: number;
  specs: string;
}

interface ProjectSubmission {
  id: string;
  projectTitle: string;
  teamMembers: string;
  batch: string;
  repoLink: string;
  demoLink: string;
  status: "Under Review" | "Graded";
  score?: number;
  grade?: string;
  remarks?: string;
}

const initialProjects: CapstoneProject[] = [
  { id: "p-1", title: "Full-Stack E-Commerce SaaS", batch: "CSE-B1-2026", maxTeamSize: 3, specs: "Build an online storefront utilizing React, Next Router, Node JS middleware, and JWT authentication schemas." },
];

const initialSubmissions: ProjectSubmission[] = [
  { id: "sub-1", projectTitle: "Full-Stack E-Commerce SaaS", teamMembers: "Amit Sharma, Priya Patel", batch: "CSE-B1-2026", repoLink: "github.com/amit/saas", demoLink: "saas-store.vercel.app", status: "Under Review" },
];

export default function MentorProjects() {
  const [projects, setProjects] = useState<CapstoneProject[]>(initialProjects);
  const [submissions, setSubmissions] = useState<ProjectSubmission[]>(initialSubmissions);
  const [title, setTitle] = useState("");
  const [batch, setBatch] = useState("CSE-B1-2026");
  const [teamSize, setTeamSize] = useState(3);
  const [specs, setSpecs] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Evaluation states
  const [selectedSub, setSelectedSub] = useState<ProjectSubmission | null>(null);
  const [score, setScore] = useState(92);
  const [grade, setGrade] = useState("A");
  const [remarks, setRemarks] = useState("");
  const [isEvalOpen, setIsEvalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const added: CapstoneProject = {
      id: `p-${Date.now()}`,
      title,
      batch,
      maxTeamSize: teamSize,
      specs,
    };
    setProjects((prev) => [...prev, added]);
    setTitle("");
    setSpecs("");
    setIsCreateOpen(false);
  };

  const handleOpenEval = (sub: ProjectSubmission) => {
    setSelectedSub(sub);
    setScore(sub.score || 92);
    setGrade(sub.grade || "A");
    setRemarks(sub.remarks || "");
    setIsEvalOpen(true);
  };

  const handleSaveEval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;

    setSaving(true);
    setTimeout(() => {
      setSubmissions((prev) =>
        prev.map((s) =>
          s.id === selectedSub.id
            ? { ...s, status: "Graded", score, grade, remarks }
            : s
        )
      );
      setSaving(false);
      setIsEvalOpen(false);
      setSelectedSub(null);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Project Capstones</h2>
          <p className="text-sm text-muted-foreground">
            Publish milestone specifications, define team rules, and evaluate production builds.
          </p>
        </div>

        {/* Create Project Dialog */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-650 hover:bg-indigo-700 text-white cursor-pointer text-xs">
              <PlusCircle className="mr-2 h-4 w-4" />
              Define Capstone Spec
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Define Capstone Project</DialogTitle>
              <DialogDescription>
                Input details and scope criteria for the program capstone.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="proj-title">Project Title</Label>
                <Input
                  id="proj-title"
                  placeholder="e.g. Smart IoT Grid Monitoring Node"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="proj-batch">Target Batch</Label>
                  <select
                    id="proj-batch"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="w-full h-10 border rounded-md px-3 text-xs bg-background"
                  >
                    <option value="CSE-B1-2026">CSE-B1-2026</option>
                    <option value="ECE-B2-2026">ECE-B2-2026</option>
                    <option value="Open-Alpha-2026">Open-Alpha-2026</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="proj-team">Max Team Size</Label>
                  <Input
                    id="proj-team"
                    type="number"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="proj-specs">Technical Requirements & Specs</Label>
                <Textarea
                  id="proj-specs"
                  placeholder="Write detailing the stack rules, API parameters, and environment config requirements..."
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                  rows={4}
                />
              </div>

              <DialogFooter>
                <Button type="submit" className="bg-indigo-650 hover:bg-indigo-700 text-white w-full">Publish Capstone Spec</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Capstone List */}
        <Card className="md:col-span-1 border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Published Capstones</CardTitle>
            <CardDescription>Major milestone requirements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="p-3.5 rounded-lg border bg-muted/20 text-xs space-y-2">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="font-mono text-[9px]">{proj.batch}</Badge>
                  <span className="font-semibold text-muted-foreground">Team Max: {proj.maxTeamSize}</span>
                </div>
                <p className="font-bold text-slate-800 dark:text-slate-150">{proj.title}</p>
                <p className="text-muted-foreground mt-1 line-clamp-3">{proj.specs}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Capstone Submissions */}
        <Card className="md:col-span-2 border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Group Submissions</CardTitle>
            <CardDescription>Published repository and deployment telemetry</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Title</TableHead>
                  <TableHead>Team Members</TableHead>
                  <TableHead>Links</TableHead>
                  <TableHead className="text-center">Evaluation</TableHead>
                  <TableHead className="text-right">Evaluate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-semibold">{sub.projectTitle}</TableCell>
                    <TableCell className="text-xs">{sub.teamMembers}</TableCell>
                    <TableCell className="text-[10px] space-y-1">
                      <p className="font-mono text-indigo-650 hover:underline">Repo: {sub.repoLink}</p>
                      <p className="font-mono text-emerald-600 hover:underline">Demo: {sub.demoLink}</p>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={sub.status === "Graded" ? "secondary" : "default"}
                        className={
                          sub.status === "Graded"
                            ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-450"
                        }
                      >
                        {sub.status === "Graded" ? `${sub.score} Pts (${sub.grade})` : "Under Review"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleOpenEval(sub)}
                        className="cursor-pointer text-xs"
                      >
                        <FolderGit2 className="h-3.5 w-3.5 mr-1" />
                        {sub.status === "Graded" ? "Edit Review" : "Evaluate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Evaluation Dialog */}
      <Dialog open={isEvalOpen} onOpenChange={setIsEvalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Evaluate Capstone Project</DialogTitle>
            <DialogDescription>
              Evaluate the code deployment, architecture, and UI.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveEval} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="eval-score">Awarded Score (Max 100)</Label>
                <Input
                  id="eval-score"
                  type="number"
                  max={100}
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="eval-grade">Overall Grade</Label>
                <Input
                  id="eval-grade"
                  placeholder="e.g. A, B+, A-"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="eval-remarks">Evaluation Remarks</Label>
              <Textarea
                id="eval-remarks"
                placeholder="Detail technical merits, deployment comments, and suggestions..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={4}
              />
            </div>

            <DialogFooter>
              <Button type="submit" disabled={saving} className="bg-indigo-650 hover:bg-indigo-700 text-white w-full">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Project Evaluation...
                  </>
                ) : (
                  <>
                    <Award className="mr-2 h-4 w-4" />
                    Lock Project Evaluation
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
