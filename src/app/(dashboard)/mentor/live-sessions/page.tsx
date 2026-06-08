"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { PlusCircle, Tv, Calendar, Video, CheckCircle2, Loader2 } from "lucide-react";

interface LiveSession {
  id: string;
  topic: string;
  type: "Class" | "Workshop" | "Doubt Session" | "Assessment";
  batch: string;
  dateTime: string;
  meetingLink: string;
  duration: number;
}

const initialSessions: LiveSession[] = [
  { id: "ls-1", topic: "React Hooks Custom Design", type: "Class", batch: "CSE-B1-2026", dateTime: "2026-06-03 04:00 PM", meetingLink: "meet.google.com/abc-defg-hij", duration: 90 },
  { id: "ls-2", topic: "Docker Containers Multi-Stage Builds", type: "Workshop", batch: "ALL BATCHES", dateTime: "2026-06-06 02:00 PM", meetingLink: "meet.google.com/xyz-qprs-tuv", duration: 120 },
];

export default function MentorLiveSessions() {
  const [sessions, setSessions] = useState<LiveSession[]>(initialSessions);
  const [topic, setTopic] = useState("");
  const [type, setType] = useState<LiveSession["type"]>("Class");
  const [batch, setBatch] = useState("CSE-B1-2026");
  const [dateTime, setDateTime] = useState("2026-06-04 10:00 AM");
  const [link, setLink] = useState("meet.google.com/m2i-zoom-session");
  const [duration, setDuration] = useState(90);
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setSaving(true);
    setTimeout(() => {
      const added: LiveSession = {
        id: `ls-${Date.now()}`,
        topic,
        type,
        batch,
        dateTime,
        meetingLink: link,
        duration,
      };
      setSessions((prev) => [...prev, added]);
      setTopic("");
      setSaving(false);
      setIsOpen(false);
    }, 800);
  };

  const getBadge = (type: LiveSession["type"]) => {
    switch (type) {
      case "Class":
        return <Badge className="bg-blue-105 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Class Lecture</Badge>;
      case "Workshop":
        return <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">Workshop</Badge>;
      case "Doubt Session":
        return <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400">Doubt Session</Badge>;
      case "Assessment":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400">Assessment</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Live Instruction Sessions</h2>
          <p className="text-sm text-muted-foreground">
            Schedule lectures, review meetings, and coordinate workshops with cohorts.
          </p>
        </div>

        {/* Schedule Dialog */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-650 hover:bg-indigo-700 text-white cursor-pointer text-xs">
              <PlusCircle className="mr-2 h-4 w-4" />
              Schedule Session
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule Live Session</DialogTitle>
              <DialogDescription>Input time slots and links for the video session.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSchedule} className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label htmlFor="s-topic">Session Topic</Label>
                <Input
                  id="s-topic"
                  placeholder="e.g. Next.js Routing Mechanics"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="s-type">Category</Label>
                  <select
                    id="s-type"
                    value={type}
                    onChange={(e) => setType(e.target.value as LiveSession["type"])}
                    className="w-full h-10 border rounded-md px-3 text-xs bg-background"
                  >
                    <option value="Class">Class Lecture</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Doubt Session">Doubt Session</option>
                    <option value="Assessment">Assessment</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-batch">Target Batch</Label>
                  <select
                    id="s-batch"
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="w-full h-10 border rounded-md px-3 text-xs bg-background"
                  >
                    <option value="CSE-B1-2026">CSE-B1-2026</option>
                    <option value="ECE-B2-2026">ECE-B2-2026</option>
                    <option value="Open-Alpha-2026">Open-Alpha-2026</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="s-time">Date & Time</Label>
                  <Input
                    id="s-time"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    placeholder="e.g. 2026-06-04 10:00 AM"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="s-dur">Duration (mins)</Label>
                  <Input
                    id="s-dur"
                    type="number"
                    value={duration}
                    onChange={(e) => setDuration(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="s-link">Video Meeting Link</Label>
                <Input
                  id="s-link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>

              <DialogFooter>
                <Button type="submit" disabled={saving} className="bg-indigo-650 hover:bg-indigo-700 text-white w-full">
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Publishing Live Event...
                    </>
                  ) : (
                    <>
                      <Tv className="mr-2 h-4 w-4" />
                      Publish Live Event
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <Card key={session.id} className="border-muted shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row justify-between items-start pb-2">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  {getBadge(session.type)}
                  <Badge variant="outline" className="font-mono text-[10px]">{session.batch}</Badge>
                  <span className="text-[10px] text-muted-foreground">{session.duration} minutes</span>
                </div>
                <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-150">{session.topic}</CardTitle>
              </div>
              <div className="text-right text-xs text-muted-foreground space-y-1">
                <p className="flex items-center justify-end font-semibold text-foreground">
                  <Calendar className="h-3.5 w-3.5 mr-1 text-indigo-650" />
                  {session.dateTime}
                </p>
                <p className="text-[9px] font-mono text-indigo-605 truncate max-w-[150px]">{session.meetingLink}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Button size="sm" className="bg-indigo-50 text-indigo-850 hover:bg-indigo-100 border border-indigo-200 text-xs">
                <Video className="h-4 w-4 mr-1.5 text-indigo-655" />
                Launch Session Meeting
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
