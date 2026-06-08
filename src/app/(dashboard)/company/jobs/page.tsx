"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Plus, Search, Calendar, MapPin, Eye } from "lucide-react";

export default function CompanyJobs() {
  const jobs = [
    { id: "1", title: "Junior Full-Stack Engineer", type: "Full-time", location: "Bangalore (Hybrid)", applicants: 24, status: "Active", postedDate: "June 01, 2026", salary: "₹8L - ₹12L PA" },
    { id: "2", title: "DevOps Associate", type: "Full-time", location: "Pune (On-site)", applicants: 18, status: "Active", postedDate: "May 28, 2026", salary: "₹6L - ₹10L PA" },
    { id: "3", title: "AI/ML Intern", type: "Internship", location: "Remote", applicants: 42, status: "Reviewing", postedDate: "May 25, 2026", salary: "₹30K - ₹40K PM" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Job Mandates</h2>
          <p className="text-sm text-muted-foreground">Post and manage employment openings mapped to NetPy students.</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-750 text-white text-xs h-9 font-medium flex items-center gap-1.5 shadow-sm">
          <Plus className="h-4 w-4" /> Create Opening
        </Button>
      </div>

      <div className="grid gap-6">
        {jobs.map((j) => (
          <Card key={j.id} className="border-muted shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{j.title}</h3>
                    <Badge variant="outline" className="text-xs">{j.type}</Badge>
                    <Badge className="text-xs bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400 border-none font-semibold">
                      {j.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {j.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Posted: {j.postedDate}</span>
                    <span className="font-semibold text-violet-700 dark:text-violet-400">{j.salary}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right mr-3 hidden md:block">
                    <div className="text-sm font-bold text-slate-850 dark:text-slate-200">{j.applicants}</div>
                    <div className="text-[10px] text-muted-foreground">Applications</div>
                  </div>
                  <Button variant="outline" size="sm" className="h-9 text-xs flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" /> View Candidates
                  </Button>
                  <Button size="sm" className="h-9 text-xs bg-slate-900 hover:bg-slate-800 dark:bg-violet-600 dark:hover:bg-violet-500 text-white">
                    Edit Opening
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
