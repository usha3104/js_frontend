"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Video, Play, CheckCircle2, Loader2, Link } from "lucide-react";

interface ClassRecording {
  id: string;
  topic: string;
  batch: string;
  dateTime: string;
  link: string;
}

const initialRecordings: ClassRecording[] = [
  { id: "rec-1", topic: "React Components & Dynamic Routing Hooks", batch: "CSE-B1-2026", dateTime: "2026-05-25", link: "youtube.com/watch?v=react1" },
  { id: "rec-2", topic: "Express Middlewares & Custom CORS Handling", batch: "CSE-B1-2026", dateTime: "2026-05-28", link: "youtube.com/watch?v=express1" },
];

export default function MentorRecordings() {
  const [recordings, setRecordings] = useState<ClassRecording[]>(initialRecordings);
  const [topic, setTopic] = useState("");
  const [batch, setBatch] = useState("CSE-B1-2026");
  const [dateTime, setDateTime] = useState("2026-06-01");
  const [videoLink, setVideoLink] = useState("youtube.com/watch?v=new-rec");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setUploading(true);
    setSuccess(false);

    setTimeout(() => {
      const added: ClassRecording = {
        id: `rec-${Date.now()}`,
        topic,
        batch,
        dateTime,
        link: videoLink,
      };
      setRecordings((prev) => [added, ...prev]);
      setTopic("");
      setUploading(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Upload Recordings</h2>
        <p className="text-sm text-muted-foreground">
          Publish recorded live classes, workshops, and doubt sessions to the student directory.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Upload Form */}
        <Card className="md:col-span-1 border-muted shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Publish Lecture Video</CardTitle>
            <CardDescription>Enter class topic name and Zoom/YouTube stream links</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="rec-topic">Lecture Topic</Label>
                <Input
                  id="rec-topic"
                  placeholder="e.g. Asynchronous Loops & Thunk Setup"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="rec-batch">Target Batch</Label>
                <select
                  id="rec-batch"
                  className="w-full h-10 border rounded-md px-3 text-xs bg-background"
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                >
                  <option value="CSE-B1-2026">CSE-B1-2026</option>
                  <option value="ECE-B2-2026">ECE-B2-2026</option>
                  <option value="Open-Alpha-2026">Open-Alpha-2026</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="rec-date">Session Date</Label>
                <Input
                  id="rec-date"
                  type="date"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="rec-url">Streaming Link URL</Label>
                <Input
                  id="rec-url"
                  value={videoLink}
                  onChange={(e) => setVideoLink(e.target.value)}
                />
              </div>

              <Button type="submit" disabled={uploading} className="w-full bg-indigo-650 hover:bg-indigo-700 text-white cursor-pointer h-10">
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Stream Data...
                  </>
                ) : (
                  <>
                    <Video className="mr-2 h-4 w-4" />
                    Publish to Student Feed
                  </>
                )}
              </Button>

              {success && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-[10px] text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Stream published successfully!</span>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Catalog */}
        <Card className="md:col-span-2 border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Published Stream Archives</CardTitle>
            <CardDescription>All video records uploaded for student playback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {recordings.map((rec) => (
              <div key={rec.id} className="flex items-center justify-between p-3.5 border rounded-lg hover:bg-muted/10 transition-colors text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg text-indigo-650 shrink-0">
                    <Play className="h-4 w-4 fill-indigo-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-805 dark:text-slate-200">{rec.topic}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge variant="outline" className="font-mono text-[9px]">{rec.batch}</Badge>
                      <span className="text-[9px] text-muted-foreground font-medium">Session Run: {rec.dateTime}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-[10px] text-indigo-605">
                  <Link className="h-3.5 w-3.5 mr-1" />
                  {rec.link}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
