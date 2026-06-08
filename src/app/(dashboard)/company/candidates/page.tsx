"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Award, CheckCircle2, UserCheck, ShieldCheck } from "lucide-react";
import { useState } from "react";

export default function CompanyCandidates() {
  const [query, setQuery] = useState("");
  
  const initialCandidates = [
    { id: "1", name: "Amit Sharma", course: "Full Stack MERN", score: 94, location: "Bangalore", skills: ["React.js", "Node.js", "MongoDB", "Express", "System Design"], badge: "Top 5%" },
    { id: "2", name: "Priya Patel", course: "Applied Data Science & ML", score: 89, location: "Mumbai", skills: ["Python", "TensorFlow", "Scikit-Learn", "SQL", "Pandas"], badge: "Top 10%" },
    { id: "3", name: "Rohan Gupta", course: "Cloud Computing & DevOps", score: 91, location: "Pune", skills: ["AWS", "Docker", "Kubernetes", "Linux", "CI/CD"], badge: "Top 5%" },
    { id: "4", name: "Ananya Iyer", course: "Full Stack MERN", score: 87, location: "Chennai", skills: ["React.js", "Next.js", "JavaScript", "Tailwind CSS"], badge: "Top 15%" },
  ];

  const filtered = initialCandidates.filter(c => 
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.skills.some(s => s.toLowerCase().includes(query.toLowerCase())) ||
    c.course.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Talent Pool</h2>
        <p className="text-sm text-muted-foreground">Search and observe pre-screened talent currently completing the NetPy Cohort.</p>
      </div>

      <div className="flex gap-4 items-center bg-card p-4 rounded-xl border border-muted shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search candidates by name, technology (e.g. Kubernetes, React), or track..." 
            className="pl-9 h-10 border-muted focus-visible:ring-violet-500/30"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Button className="bg-violet-600 hover:bg-violet-750 text-white font-medium h-10 px-6">
          Filter Options
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((c) => (
          <Card key={c.id} className="border-muted shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-indigo-500/0 rounded-bl-full pointer-events-none" />
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{c.name}</h3>
                    <Badge variant="outline" className="text-[10px] bg-rose-50 text-rose-650 border-rose-200 font-semibold uppercase">
                      {c.badge}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground font-semibold">{c.course}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-violet-700 dark:text-violet-400">{c.score}%</div>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase">Telemetry</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {c.skills.map((s, idx) => (
                  <Badge key={idx} variant="secondary" className="text-[10px] px-2 py-0.5 font-medium">
                    {s}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-muted text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {c.location}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-8 text-[11px] hover:bg-violet-500/10 border-violet-500/20 text-violet-750">
                    View Portfolio
                  </Button>
                  <Button size="sm" className="h-8 text-[11px] bg-violet-600 hover:bg-violet-700 text-white flex items-center gap-1">
                    <UserCheck className="h-3 w-3" /> Shortlist
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
