"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock } from "lucide-react";

interface SyllabusModule {
  name: string;
  status: "Completed" | "In-Progress" | "Locked";
  completionDate?: string;
}

interface BatchProgress {
  batch: string;
  course: string;
  overallPercent: number;
  modules: SyllabusModule[];
}

const mockProgress: BatchProgress[] = [
  {
    batch: "CSE-B1-2026",
    course: "Full Stack Web Development (React & Node)",
    overallPercent: 75,
    modules: [
      { name: "Module 1: HTML5, CSS3, & Semantic layouts", status: "Completed", completionDate: "2026-02-15" },
      { name: "Module 2: JavaScript ES6 Foundations & Async Loops", status: "Completed", completionDate: "2026-03-20" },
      { name: "Module 3: React Components, Hooks, & State Routing", status: "Completed", completionDate: "2026-05-10" },
      { name: "Module 4: Express Server Framework & Middlewares", status: "In-Progress" },
      { name: "Module 5: MongoDB Schema Modeling & REST APIs", status: "Locked" },
    ],
  },
  {
    batch: "ECE-B2-2026",
    course: "Embedded Systems & IoT Architectures",
    overallPercent: 40,
    modules: [
      { name: "Module 1: C Programming & Register Operations", status: "Completed", completionDate: "2026-03-05" },
      { name: "Module 2: Microcontroller Architectures (ESP32/Arduino)", status: "Completed", completionDate: "2026-04-30" },
      { name: "Module 3: Sensor Protocols & UART/SPI Telemetry", status: "In-Progress" },
      { name: "Module 4: Wireless Communication & MQTT Brokers", status: "Locked" },
      { name: "Module 5: Edge Processing & Cloud Database Sync", status: "Locked" },
    ],
  },
];

export default function CollegeAdminProgress() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Academic Progress Tracker</h2>
        <p className="text-sm text-muted-foreground">
          Detailed syllabus checklist, completion milestones, and course progress tracking.
        </p>
      </div>

      <div className="space-y-6">
        {mockProgress.map((p, idx) => (
          <Card key={idx} className="border-muted shadow-sm">
            <CardHeader className="flex flex-row justify-between items-start pb-4 border-b border-muted">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-teal-50 text-teal-800 border dark:bg-slate-900 dark:text-teal-400 font-mono text-[10px]">
                    {p.batch}
                  </Badge>
                  <span className="text-xs text-muted-foreground">Syllabus Track</span>
                </div>
                <CardTitle className="text-base font-bold text-slate-850 dark:text-slate-100">{p.course}</CardTitle>
              </div>
              <div className="text-right w-48">
                <div className="flex justify-between items-center text-xs font-semibold mb-1">
                  <span>Syllabus Coverage</span>
                  <span className="text-teal-650 font-bold">{p.overallPercent}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-teal-605 transition-all duration-500"
                    style={{ width: `${p.overallPercent}%` }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4">Module Curriculum Roadmap</h4>
              <div className="space-y-3.5">
                {p.modules.map((m, mIdx) => {
                  return (
                    <div key={mIdx} className="flex items-start justify-between p-3.5 rounded-lg border bg-muted/20 text-xs">
                      <div className="flex items-start gap-3">
                        {m.status === "Completed" ? (
                          <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : m.status === "In-Progress" ? (
                          <Clock className="h-4.5 w-4.5 text-amber-500 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="h-4.5 w-4.5 text-muted-foreground/30 shrink-0 mt-0.5" />
                        )}
                        <div>
                          <p className="font-semibold text-slate-700 dark:text-slate-350">{m.name}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            Status: <span className="font-medium">{m.status}</span>
                          </p>
                        </div>
                      </div>
                      {m.completionDate && (
                        <span className="text-[10px] font-mono text-muted-foreground">
                          Completed on: {m.completionDate}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
