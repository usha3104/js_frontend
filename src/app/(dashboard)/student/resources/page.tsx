"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Play, DownloadCloud, Layers } from "lucide-react";
import { useState } from "react";

interface ReferenceItem {
  id: string;
  name: string;
  category: "Slide Deck" | "Reference Link" | "Template Code";
  cohort: string;
  uploadedAt: string;
  sizeOrLink: string;
}

const mockReferences: ReferenceItem[] = [
  { id: "1", name: "Redux Toolkit Configuration Guide.pdf", category: "Slide Deck", cohort: "CSE-B1-2026", uploadedAt: "2026-05-18", sizeOrLink: "2.4 MB" },
  { id: "2", name: "State Hooks Prop Drilling Walkthrough.mp4", category: "Reference Link", cohort: "CSE-B1-2026", uploadedAt: "2026-05-19", sizeOrLink: "youtube.com/watch?v=mock" },
  { id: "3", name: "Multi-stage Dockerfile Sample setup.zip", category: "Template Code", cohort: "ALL COHORTS", uploadedAt: "2026-05-22", sizeOrLink: "1.2 MB" },
];

export default function StudentResources() {
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);

  const triggerDownload = (name: string) => {
    setDownloadMsg(`Downloading: ${name}...`);
    setTimeout(() => {
      setDownloadMsg(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Study Materials Library</h2>
        <p className="text-sm text-muted-foreground">
          Access presentation slides, recommended reading links, and base configuration templates.
        </p>
      </div>

      {downloadMsg && (
        <div className="p-3 bg-emerald-50 text-emerald-805 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-250 rounded-lg text-xs animate-pulse">
          {downloadMsg}
        </div>
      )}

      <div className="grid gap-4">
        {mockReferences.map((ref) => (
          <Card key={ref.id} className="border-muted shadow-sm hover:shadow-md transition-all">
            <CardContent className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 rounded-lg shrink-0">
                  <FileText className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[9px]">{ref.category}</Badge>
                    <span className="flex items-center text-[10px] text-muted-foreground font-mono">
                      <Layers className="h-3 w-3 mr-1" />
                      {ref.cohort}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-805 dark:text-slate-150">{ref.name}</h4>
                  <p className="text-[10px] text-muted-foreground">Published: {ref.uploadedAt}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="font-mono text-muted-foreground text-[10px]">{ref.sizeOrLink}</span>
                <Button
                  size="sm"
                  onClick={() => triggerDownload(ref.name)}
                  className="bg-rose-650 hover:bg-rose-700 text-white cursor-pointer text-[10px]"
                >
                  <DownloadCloud className="h-4 w-4 mr-1.5" />
                  Get Resource
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
