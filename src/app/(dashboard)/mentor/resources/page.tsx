"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { FileText, PlayCircle, Link, FileCheck, CheckCircle2, UploadCloud, Loader2 } from "lucide-react";

interface Resource {
  id: string;
  name: string;
  type: "document" | "video" | "assignment" | "project-link" | "recording";
  batch: string;
  uploadedAt: string;
  sizeOrLink: string;
}

const initialResources: Resource[] = [
  { id: "r-1", name: "Redux Toolkit Configuration Guide.pdf", type: "document", batch: "CSE-B1-2026", uploadedAt: "2026-05-18", sizeOrLink: "2.4 MB" },
  { id: "r-2", name: "State Hooks & Prop Drilling Walkthrough", type: "video", batch: "CSE-B1-2026", uploadedAt: "2026-05-19", sizeOrLink: "youtube.com/watch?v=mock1" },
  { id: "r-3", name: "IoT Esp32 Firmware Wiring Diagram.png", type: "document", batch: "ECE-B2-2026", uploadedAt: "2026-05-20", sizeOrLink: "1.8 MB" },
  { id: "r-4", name: "React Dynamic Form Validation Spec.pdf", type: "assignment", batch: "CSE-B1-2026", uploadedAt: "2026-05-22", sizeOrLink: "450 KB" },
];

export default function MentorResources() {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [fileName, setFileName] = useState("");
  const [targetBatch, setTargetBatch] = useState("CSE-B1-2026");
  const [category, setCategory] = useState<Resource["type"]>("document");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    setIsUploading(true);
    setUploadSuccess(false);

    setTimeout(() => {
      const added: Resource = {
        id: `r-${Date.now()}`,
        name: fileName,
        type: category,
        batch: targetBatch,
        uploadedAt: new Date().toISOString().split("T")[0],
        sizeOrLink: category === "video" || category === "project-link" ? "youtube.com/watch?v=added" : "1.2 MB",
      };
      setResources((prev) => [added, ...prev]);
      setFileName("");
      setIsUploading(false);
      setUploadSuccess(true);
    }, 1000);
  };

  const getIcon = (type: Resource["type"]) => {
    switch (type) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "video":
      case "recording":
        return <PlayCircle className="h-5 w-5 text-indigo-500" />;
      case "assignment":
        return <FileCheck className="h-5 w-5 text-teal-600" />;
      case "project-link":
        return <Link className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Learning Resources Library</h2>
        <p className="text-sm text-muted-foreground">
          Upload and organize reference guides, code setups, and classroom slide decks.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Upload Panel */}
        <Card className="md:col-span-1 border-muted shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Share Resource</CardTitle>
            <CardDescription>Upload files or save links for student access</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="res-name">Resource Name / URL</Label>
                <Input
                  id="res-name"
                  placeholder="e.g. Next.js Routing slides.pdf"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="res-cat">Category Tab</Label>
                <select
                  id="res-cat"
                  className="w-full h-10 border rounded-md px-3 text-xs bg-background"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Resource["type"])}
                >
                  <option value="document">Document / PDF</option>
                  <option value="video">Video Lecture</option>
                  <option value="assignment">Assignment Instructions</option>
                  <option value="project-link">Capstone Link / Spec</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="res-batch">Access Group</Label>
                <select
                  id="res-batch"
                  className="w-full h-10 border rounded-md px-3 text-xs bg-background"
                  value={targetBatch}
                  onChange={(e) => setTargetBatch(e.target.value)}
                >
                  <option value="CSE-B1-2026">CSE-B1-2026</option>
                  <option value="ECE-B2-2026">ECE-B2-2026</option>
                  <option value="Open-Alpha-2026">Open-Alpha-2026</option>
                </select>
              </div>

              <Button type="submit" disabled={isUploading} className="w-full bg-indigo-650 hover:bg-indigo-700 text-white cursor-pointer h-10">
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    Share with Students
                  </>
                )}
              </Button>

              {uploadSuccess && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-[10px] text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Uploaded & shared!</span>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Tabbed catalog */}
        <Card className="md:col-span-2 border-muted shadow-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-base font-semibold">Active Repository Catalog</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-5 w-full text-xs">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="document">Docs</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
                <TabsTrigger value="assignment">Homework</TabsTrigger>
                <TabsTrigger value="project-link">Capstones</TabsTrigger>
              </TabsList>

              {["all", "document", "video", "assignment", "project-link"].map((tab) => {
                const list = tab === "all" ? resources : resources.filter((r) => r.type === tab);
                return (
                  <TabsContent key={tab} value={tab} className="space-y-2 mt-4">
                    {list.length === 0 ? (
                      <p className="text-center text-xs text-muted-foreground py-8">No resources shared under this tab.</p>
                    ) : (
                      list.map((res) => (
                        <div key={res.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/10 transition-colors text-xs">
                          <div className="flex items-center gap-3">
                            {getIcon(res.type)}
                            <div>
                              <p className="font-semibold text-slate-800 dark:text-slate-200">{res.name}</p>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Badge variant="outline" className="font-mono text-[9px]">{res.batch}</Badge>
                                <span className="text-[9px] text-muted-foreground">Uploaded: {res.uploadedAt}</span>
                              </div>
                            </div>
                          </div>
                          <span className="font-mono text-[10px] text-muted-foreground">{res.sizeOrLink}</span>
                        </div>
                      ))
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
