"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Briefcase,
  Users2,
  BookmarkCheck,
  TrendingUp,
  Search,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function CompanyDashboard() {
  const telemetryCandidates = [
    {
      name: "Amit Sharma",
      course: "Full Stack MERN",
      observationScore: 94,
      skills: ["React.js", "Node.js", "MongoDB", "System Design"],
      observationStatus: "Exceptional",
      observationColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20",
      codeQuality: 92,
      problemSolving: 96,
      communication: 90,
    },
    {
      name: "Priya Patel",
      course: "Applied Data Science & ML",
      observationScore: 89,
      skills: ["Python", "TensorFlow", "Scikit-Learn", "SQL"],
      observationStatus: "Strong Fit",
      observationColor: "text-violet-600 bg-violet-50 dark:bg-violet-950/20",
      codeQuality: 88,
      problemSolving: 92,
      communication: 86,
    },
    {
      name: "Rohan Gupta",
      course: "Cloud Computing & DevOps",
      observationScore: 91,
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      observationStatus: "Exceptional",
      observationColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20",
      codeQuality: 94,
      problemSolving: 90,
      communication: 88,
    },
  ];

  const jobs = [
    { title: "Junior Full-Stack Engineer", type: "Full-time", location: "Bangalore (Hybrid)", applicants: 24, status: "Active" },
    { title: "DevOps Associate", type: "Full-time", location: "Pune (On-site)", applicants: 18, status: "Active" },
    { title: "AI/ML Intern", type: "Internship", location: "Remote", applicants: 42, status: "Reviewing" },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-900 to-indigo-850 p-6 md:p-8 text-white shadow-lg border border-violet-800 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Badge className="bg-violet-500/20 hover:bg-violet-500/30 text-violet-200 border-none font-semibold text-xs py-1 px-3">
              <Sparkles className="h-3.5 w-3.5 mr-1 text-yellow-300 inline" />
              Premium Recruiter License
            </Badge>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Acme Corporation Workspace</h2>
            <p className="text-sm text-violet-200/80 max-w-xl">
              Track student performance during their 60-Day observation phase, view code telemetry, and instantly recruit top-tier tech candidates.
            </p>
          </div>
          <div className="shrink-0 flex gap-3">
            <Link href="/company/candidates">
              <Button className="bg-white text-violet-900 hover:bg-violet-50 font-semibold text-xs h-10 px-4">
                <Search className="h-4 w-4 mr-2" /> Search Talent
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { title: "Open Openings", value: "3 Active", desc: "24 new candidates", color: "text-violet-600 bg-violet-50 dark:bg-violet-950/20", icon: Briefcase },
          { title: "Shortlisted Talent", value: "14 Students", desc: "4 scheduled interviews", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20", icon: BookmarkCheck },
          { title: "Active Applicants", value: "84 Total", desc: "+12.4% vs last week", color: "text-indigo-650 bg-indigo-50 dark:bg-indigo-950/20", icon: Users2 },
          { title: "Avg Telemetry Score", value: "88.2%", desc: "Top 10% of Cohort", color: "text-rose-650 bg-rose-50 dark:bg-rose-950/20", icon: TrendingUp },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="border-muted shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold text-muted-foreground uppercase">{s.title}</CardTitle>
                <div className={`p-2 rounded-lg ${s.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold">{s.value}</div>
                <p className="text-[11px] text-muted-foreground mt-0.5">{s.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 60-Day Telemetry Observations */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 border-muted shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-100">
                Cohort Observation Insights (60-Day Telemetry)
              </CardTitle>
              <CardDescription>Real-time technical tracking mapped during student live lab observations</CardDescription>
            </div>
            <Link href="/company/candidates">
              <Button variant="ghost" className="text-xs text-violet-750 p-0 hover:bg-transparent">
                View All <ChevronRight className="h-4.5 w-4.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-muted text-muted-foreground pb-2">
                    <th className="py-2.5 font-semibold">Candidate</th>
                    <th className="py-2.5 font-semibold">Course</th>
                    <th className="py-2.5 font-semibold">Code Quality</th>
                    <th className="py-2.5 font-semibold">Problem Solving</th>
                    <th className="py-2.5 font-semibold">Overall Fit</th>
                    <th className="py-2.5 text-right font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {telemetryCandidates.map((c, i) => (
                    <tr key={i} className="border-b border-muted/50 hover:bg-muted/10 transition-colors">
                      <td className="py-3">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">{c.name}</div>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {c.skills.slice(0, 2).map((sk, sIdx) => (
                            <Badge key={sIdx} variant="outline" className="text-[9px] px-1.5 py-0">
                              {sk}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 text-muted-foreground">{c.course}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <Progress value={c.codeQuality} className="h-2 w-16" />
                          <span>{c.codeQuality}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-1.5">
                          <Progress value={c.problemSolving} className="h-2 w-16" />
                          <span>{c.problemSolving}%</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <Badge className={`text-[10px] font-semibold ${c.observationColor}`}>
                          {c.observationStatus} ({c.observationScore}%)
                        </Badge>
                      </td>
                      <td className="py-3 text-right">
                        <Button size="sm" variant="outline" className="h-8 text-[11px] hover:bg-violet-500/10 border-violet-500/20 text-violet-750">
                          Inspect <ExternalLink className="h-3 w-3 ml-1" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Managed Openings & Quick Actions */}
        <div className="space-y-6">
          <Card className="border-muted shadow-sm">
            <CardHeader>
              <CardTitle className="text-base font-bold">Your Open Jobs</CardTitle>
              <CardDescription>Manage active corporate mandates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              {jobs.map((j, i) => (
                <div key={i} className="flex justify-between items-start border-b border-muted/50 pb-3 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200">{j.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                      <span>{j.type}</span>
                      <span>•</span>
                      <span>{j.location}</span>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge variant="outline" className="text-[10px] bg-slate-50 dark:bg-slate-950">
                      {j.applicants} applicants
                    </Badge>
                    <div className="text-[9px] text-emerald-600 font-semibold">{j.status}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
