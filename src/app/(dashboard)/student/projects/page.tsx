"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Award, FolderGit2, CheckCircle2, Loader2, Link } from "lucide-react";

interface CapstoneProject {
  id: string;
  title: string;
  maxTeamSize: number;
  specs: string;
  dueDate: string;
  status: "Pending Submission" | "Submitted" | "Graded";
  repo?: string;
  demo?: string;
  grade?: string;
  score?: number;
  remarks?: string;
}

const initialProjects: CapstoneProject[] = [
  {
    id: "p-1",
    title: "Full-Stack E-Commerce SaaS Platform",
    maxTeamSize: 3,
    specs: "Build an online storefront utilizing React, Next Router, Node JS middleware, and JWT authentication schemas. Fully deploy to Vercel/Render.",
    dueDate: "2026-06-25",
    status: "Pending Submission",
  },
];

export default function StudentProjects() {
  const [projects, setProjects] = useState<CapstoneProject[]>(initialProjects);
  const [selectedProj, setSelectedProj] = useState<CapstoneProject | null>(null);
  const [repo, setRepo] = useState("github.com/amit/saas");
  const [demo, setDemo] = useState("saas-store.vercel.app");
  const [team, setTeam] = useState("Amit Sharma, Priya Patel");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProj || !repo.trim()) return;

    setSubmitting(true);
    setSuccess(false);

    setTimeout(() => {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === selectedProj.id
            ? { ...p, status: "Submitted", repo, demo }
            : p
        )
      );
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setSelectedProj(null);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Project Capstones</h2>
        <p className="text-sm text-muted-foreground">
          Track course milestone projects, read technical requirements, and publish demo links.
        </p>
      </div>

      <div className="space-y-4">
        {projects.map((proj) => (
          <Card key={proj.id} className="border-muted shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row justify-between items-start pb-4 border-b">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="outline">Capstone</Badge>
                  <span className="text-xs text-muted-foreground">Max Team Size: {proj.maxTeamSize}</span>
                </div>
                <CardTitle className="text-base font-bold text-slate-850 dark:text-slate-100">{proj.title}</CardTitle>
                <CardDescription className="text-xs">Due Lock: {proj.dueDate}</CardDescription>
              </div>
              <div>
                <Badge
                  className={
                    proj.status === "Graded"
                      ? "bg-emerald-50 text-emerald-808 dark:bg-emerald-950/20 dark:text-emerald-400"
                      : proj.status === "Submitted"
                      ? "bg-blue-50 text-blue-800 dark:bg-blue-950/20 dark:text-blue-400"
                      : "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400"
                  }
                >
                  {proj.status === "Graded" ? `Graded (${proj.score} Pts - ${proj.grade})` : proj.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-6 space-y-4 text-xs">
              <div className="p-3.5 bg-muted/20 border rounded-lg">
                <p className="font-semibold text-slate-500 uppercase tracking-widest text-[9px] mb-1">Specifications</p>
                <p className="text-slate-705 dark:text-slate-350 leading-relaxed">{proj.specs}</p>
              </div>

              {proj.status === "Submitted" && (
                <div className="p-3 border rounded-lg bg-blue-50/10 grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-semibold text-muted-foreground">Git Repository:</span>
                    <p className="font-mono text-indigo-650 hover:underline">{proj.repo}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-muted-foreground">Live URL Link:</span>
                    <p className="font-mono text-emerald-600 hover:underline">{proj.demo}</p>
                  </div>
                </div>
              )}

              {proj.status === "Pending Submission" ? (
                <Dialog open={selectedProj?.id === proj.id} onOpenChange={(open) => !open && setSelectedProj(null)}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedProj(proj)} className="bg-rose-650 hover:bg-rose-700 text-white cursor-pointer h-9 text-xs">
                      <FolderGit2 className="h-4 w-4 mr-1.5" />
                      Submit Capstone Platform
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Submit Capstone Deployment</DialogTitle>
                      <DialogDescription>{proj.title}</DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4 py-2">
                      <div className="space-y-1.5">
                        <Label htmlFor="members">Team Members (Comma separated)</Label>
                        <Input
                          id="members"
                          value={team}
                          onChange={(e) => setTeam(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label htmlFor="git-repo">Git Repository Link</Label>
                          <Input
                            id="git-repo"
                            value={repo}
                            onChange={(e) => setRepo(e.target.value)}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="live-url">Live Deployment URL</Label>
                          <Input
                            id="live-url"
                            value={demo}
                            onChange={(e) => setDemo(e.target.value)}
                          />
                        </div>
                      </div>

                      <DialogFooter className="pt-2">
                        <Button type="submit" disabled={submitting} className="w-full bg-rose-650 hover:bg-rose-700 text-white">
                          {submitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Publishing repository details...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="mr-2 h-4 w-4" />
                              Submit Production Capstone
                            </>
                          )}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
