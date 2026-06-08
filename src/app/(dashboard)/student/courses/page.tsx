"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle2, Circle, PlayCircle, DownloadCloud, Layers, Video } from "lucide-react";

interface Module {
  id: string;
  name: string;
  desc: string;
  status: "Completed" | "In-Progress" | "Locked";
}

interface Recording {
  id: string;
  topic: string;
  date: string;
  link: string;
}

interface Material {
  id: string;
  name: string;
  uploadedAt: string;
  size: string;
}

const mockModules: Module[] = [
  { id: "m-1", name: "Module 1: HTML5 Layouts & CSS Responsive Design", desc: "Understand grids, layouts, viewport settings, and semantic elements.", status: "Completed" },
  { id: "m-2", name: "Module 2: JavaScript ES6 & Asynchronous Callback Loops", desc: "Master Event loop architectures, AJAX calls, and Promises async-await structures.", status: "Completed" },
  { id: "m-3", name: "Module 3: React Functional Components & Custom State Hooks", desc: "Build modular interfaces, manage rendering context, and set custom state hooks.", status: "In-Progress" },
  { id: "m-4", name: "Module 4: NodeJS Server Framework & MongoDB Schemas", desc: "Design backend API routes, configure authentication middlewares, and build database collections.", status: "Locked" },
];

const mockRecordings: Recording[] = [
  { id: "rec-1", topic: "React Components & Custom Hooks Setup", date: "2026-05-25", link: "youtube.com/embed/dQw4w9WgXcQ" },
  { id: "rec-2", topic: "Express Routers & CORS Middleware Configuration", date: "2026-05-28", link: "youtube.com/embed/dQw4w9WgXcQ" },
];

const mockMaterials: Material[] = [
  { id: "mat-1", name: "Syllabus Roadmap Guide.pdf", uploadedAt: "2026-01-15", size: "1.2 MB" },
  { id: "mat-2", name: "React Components Cheatsheet.pdf", uploadedAt: "2026-05-10", size: "850 KB" },
  { id: "mat-3", name: "REST API Design Best Practices.docx", uploadedAt: "2026-05-20", size: "45 KB" },
];

export default function StudentCourses() {
  const [selectedRecord, setSelectedRecord] = useState<Recording | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const simulateDownload = (name: string) => {
    setDownloadSuccess(name);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Course Workspaces</h2>
        <p className="text-sm text-muted-foreground">
          View enrolled syllabus curriculum modules, study resources, and stream recorded sessions.
        </p>
      </div>

      <Card className="border-muted shadow-sm">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div>
              <Badge className="bg-rose-50 text-rose-800 dark:bg-rose-950/20 dark:text-rose-400 mb-2">Enrolled & Active</Badge>
              <CardTitle className="text-lg font-bold">Full Stack Web Development (React & Node)</CardTitle>
              <CardDescription>Batch Track: CSE-B1-2026 &bull; Mapped: SVKM Tech</CardDescription>
            </div>
            <div className="text-right w-48">
              <div className="flex justify-between items-center text-xs font-semibold mb-1">
                <span>Course Completion</span>
                <span className="text-rose-650 font-bold">75%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-rose-600 transition-all duration-300" style={{ width: "75%" }} />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="modules">
            <TabsList className="grid grid-cols-4 w-full text-xs">
              <TabsTrigger value="modules">Course Modules</TabsTrigger>
              <TabsTrigger value="recordings">Class Recordings</TabsTrigger>
              <TabsTrigger value="materials">Materials Library</TabsTrigger>
              <TabsTrigger value="progress">Progress Roadmap</TabsTrigger>
            </TabsList>

            {/* Modules Tab */}
            <TabsContent value="modules" className="space-y-3 mt-4">
              {mockModules.map((m) => (
                <div key={m.id} className="flex items-start justify-between p-3.5 border rounded-lg bg-muted/20 text-xs">
                  <div className="flex items-start gap-3">
                    {m.status === "Completed" ? (
                      <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : m.status === "In-Progress" ? (
                      <Circle className="h-4.5 w-4.5 text-amber-500 fill-amber-500/20 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="h-4.5 w-4.5 text-muted-foreground/30 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold text-slate-805 dark:text-slate-150">{m.name}</p>
                      <p className="text-muted-foreground mt-0.5">{m.desc}</p>
                    </div>
                  </div>
                  <Badge variant={m.status === "Completed" ? "secondary" : "default"} className="font-mono text-[9px]">
                    {m.status}
                  </Badge>
                </div>
              ))}
            </TabsContent>

            {/* Recordings Tab */}
            <TabsContent value="recordings" className="space-y-3 mt-4">
              {mockRecordings.map((rec) => (
                <div key={rec.id} className="flex items-center justify-between p-3.5 border rounded-lg hover:bg-muted/10 transition-colors text-xs">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-50 dark:bg-rose-950/20 rounded-lg text-rose-650 shrink-0">
                      <Video className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 dark:text-slate-200">{rec.topic}</p>
                      <p className="text-[9px] text-muted-foreground">Recorded on: {rec.date}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRecord(rec)}
                    className="cursor-pointer text-xs"
                  >
                    <PlayCircle className="h-3.5 w-3.5 mr-1 text-rose-650" />
                    Play Stream
                  </Button>
                </div>
              ))}
            </TabsContent>

            {/* Materials Tab */}
            <TabsContent value="materials" className="space-y-3 mt-4">
              {downloadSuccess && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-250 p-2.5 text-[11px] text-emerald-805 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Successfully downloaded: {downloadSuccess}!</span>
                </div>
              )}

              {mockMaterials.map((mat) => (
                <div key={mat.id} className="flex items-center justify-between p-3.5 border rounded-lg hover:bg-muted/10 transition-colors text-xs">
                  <div>
                    <p className="font-bold text-slate-805 dark:text-slate-200">{mat.name}</p>
                    <p className="text-[9px] text-muted-foreground mt-0.5">Uploaded: {mat.uploadedAt} &bull; Size: {mat.size}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => simulateDownload(mat.name)}
                    className="cursor-pointer text-xs text-rose-650 hover:text-rose-700 hover:bg-rose-50"
                  >
                    <DownloadCloud className="h-4 w-4 mr-1" />
                    Download File
                  </Button>
                </div>
              ))}
            </TabsContent>

            {/* Progress Tab */}
            <TabsContent value="progress" className="space-y-4 mt-4 text-xs">
              <h4 className="font-semibold text-muted-foreground uppercase tracking-wider mb-2">Learning Roadmap Roadmap</h4>
              <div className="relative border-l border-muted pl-6 space-y-6">
                {[
                  { title: "HTML/CSS Basics Completed", date: "2026-02-15", done: true },
                  { title: "JavaScript Core Engines & Callback Loops Graded", date: "2026-03-20", done: true },
                  { title: "React Component Hook Integrations & Rendering Context", date: "2026-05-10", done: true },
                  { title: "Express Server Routers & Middleware Validation Modules", date: "Currently Active", done: false },
                  { title: "MongoDB Schemas, Gridfs Uploads, & REST Controllers", date: "Coming Soon", done: false },
                ].map((step, idx) => (
                  <div key={idx} className="relative">
                    <span className={`absolute -left-[31px] top-0.5 w-2.5 h-2.5 rounded-full ${step.done ? "bg-rose-600" : "bg-muted border border-muted"}`} />
                    <p className="font-bold text-slate-800 dark:text-slate-200">{step.title}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{step.date}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Video Simulation Dialog */}
      <Dialog open={selectedRecord !== null} onOpenChange={(open) => !open && setSelectedRecord(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Lecture Video Player Simulation</DialogTitle>
            <DialogDescription>{selectedRecord?.topic}</DialogDescription>
          </DialogHeader>
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-black flex items-center justify-center text-white border relative">
            <span className="font-mono text-xs text-muted-foreground uppercase flex items-center gap-2">
              <Layers className="h-4.5 w-4.5 text-rose-650 animate-pulse" />
              Simulating video stream playback for: {selectedRecord?.topic}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
