"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Play, Video, Terminal, BarChart2, Shield } from "lucide-react";

export default function CompanyObservations() {
  const telemetryMetrics = [
    { label: "Technical Lab Attendance", average: 92, target: 90, desc: "Mandatory participation in live coding assessments" },
    { label: "GitHub Code Commit Velocity", average: 85, target: 80, desc: "Commit habits, code branch practices, and regular updates" },
    { label: "Peer Collaboration & Review", average: 88, target: 75, desc: "Team project contributions and active peer review feedback" },
    { label: "Problem Solving Speed", average: 79, target: 75, desc: "Average time taken to solve daily competitive coding modules" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Telemetry Observations</h2>
        <p className="text-sm text-muted-foreground">Monitor performance and observation benchmarks mapped across cohorts.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Metric Averages */}
        <Card className="border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold">Cohort Telemetry Competency</CardTitle>
            <CardDescription>Real-time average vs. target industry benchmarks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            {telemetryMetrics.map((m, idx) => (
              <div key={idx} className="space-y-2 text-xs">
                <div className="flex justify-between items-center font-medium">
                  <span className="font-semibold text-slate-850 dark:text-slate-200">{m.label}</span>
                  <span>Avg: <strong className="text-violet-700 dark:text-violet-400">{m.average}%</strong> / Target: {m.target}%</span>
                </div>
                <div className="relative w-full h-2.5 bg-muted rounded-full overflow-hidden">
                  <div className="absolute h-full bg-violet-600 rounded-full" style={{ width: `${m.average}%` }} />
                  <div className="absolute h-full w-0.5 bg-rose-500" style={{ left: `${m.target}%` }} />
                </div>
                <p className="text-[10px] text-muted-foreground italic">{m.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 60-Day Telemetry Observational Methodology Explanation */}
        <Card className="border-muted shadow-sm bg-violet-500/5 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-violet-600/5 rounded-tl-full pointer-events-none" />
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600/10 text-violet-750 mb-2">
              <Shield className="h-5 w-5" />
            </div>
            <CardTitle className="text-base font-bold text-violet-850 dark:text-violet-300">How NetPy Observation Works</CardTitle>
            <CardDescription>Industry standards for candidate capability observation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="flex gap-3">
              <Terminal className="h-5 w-5 text-violet-750 shrink-0" />
              <div>
                <strong className="text-slate-850 dark:text-slate-200 block">Real-time Code Telemetry</strong>
                Telemetry tracks student keystroke regularity, compile error resolution rates, and unit test accuracy during lab hours.
              </div>
            </div>
            <div className="flex gap-3">
              <Video className="h-5 w-5 text-violet-750 shrink-0" />
              <div>
                <strong className="text-slate-850 dark:text-slate-200 block">Live Technical Observations</strong>
                Industry mentors sit on peer-programming reviews to evaluate system thinking, design patterns, and soft-skill attributes.
              </div>
            </div>
            <div className="flex gap-3">
              <BarChart2 className="h-5 w-5 text-violet-750 shrink-0" />
              <div>
                <strong className="text-slate-850 dark:text-slate-200 block">Continuous Obs Analytics</strong>
                Daily records feed into a 60-Day Observation trajectory model, identifying early anomalies or exceptional performance curves.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
