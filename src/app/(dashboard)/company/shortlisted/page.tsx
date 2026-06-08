"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkCheck, Calendar, ArrowRight, UserMinus, ShieldAlert } from "lucide-react";

export default function CompanyShortlisted() {
  const shortlists = [
    { id: "1", name: "Amit Sharma", course: "Full Stack MERN", score: 94, role: "Junior Full-Stack Engineer", stage: "Interview Scheduled", date: "June 05, 2026 at 10:00 AM" },
    { id: "3", name: "Rohan Gupta", course: "Cloud Computing & DevOps", score: 91, role: "DevOps Associate", stage: "Technical Review Pending", date: "June 04, 2026 at 02:30 PM" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Shortlisted Candidates</h2>
        <p className="text-sm text-muted-foreground">Manage and interview your selected student prospects.</p>
      </div>

      <div className="grid gap-6">
        {shortlists.length > 0 ? (
          shortlists.map((s) => (
            <Card key={s.id} className="border-muted shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{s.name}</h3>
                      <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-950/30 dark:text-violet-400 border-none font-semibold text-xs">
                        {s.role}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.course} • Telemetry Score: <strong>{s.score}%</strong></p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{s.stage} ({s.date})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <Button variant="outline" size="sm" className="h-9 text-xs text-destructive hover:bg-destructive/5 hover:text-destructive flex items-center gap-1">
                      <UserMinus className="h-3.5 w-3.5" /> Remove
                    </Button>
                    <Button size="sm" className="h-9 text-xs bg-violet-600 hover:bg-violet-750 text-white flex items-center gap-1">
                      Start Assessment <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 border-2 border-dashed border-muted rounded-2xl bg-muted/10">
            <ShieldAlert className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No shortlisted candidates</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Go to the Candidate Search section to add candidates.</p>
          </div>
        )}
      </div>
    </div>
  );
}
