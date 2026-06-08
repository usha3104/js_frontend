"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Loader2, CheckCircle2 } from "lucide-react";

interface Meeting {
  id: string;
  topic: string;
  mentor: string;
  dateTime: string;
  status: "Pending Approval" | "Approved" | "Completed";
  link?: string;
}

const initialMeetings: Meeting[] = [
  { id: "m-1", topic: "Asynchronous Redux Actions Doubt", mentor: "Dr. Rajesh Kumar", dateTime: "2026-06-04 04:30 PM", status: "Approved", link: "meet.google.com/abc-def-ghi" },
  { id: "m-2", topic: "MongoDB Database Connection Configuration", mentor: "Mentor Subhash", dateTime: "2026-06-05 02:00 PM", status: "Pending Approval" },
];

export default function StudentMeetings() {
  const [meetings, setMeetings] = useState<Meeting[]>(initialMeetings);
  const [topic, setTopic] = useState("");
  const [mentor, setMentor] = useState("Dr. Rajesh Kumar");
  const [date, setDate] = useState("2026-06-06");
  const [slot, setSlot] = useState("04:00 PM - 04:30 PM");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setSubmitting(true);
    setSuccess(false);

    setTimeout(() => {
      const added: Meeting = {
        id: `m-${Date.now()}`,
        topic,
        mentor,
        dateTime: `${date} ${slot.split(" ")[0]} ${slot.split(" ")[1]}`,
        status: "Pending Approval",
      };
      setMeetings((prev) => [...prev, added]);
      setTopic("");
      setSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Mentor Sync & Doubt Sessions</h2>
        <p className="text-sm text-muted-foreground">
          Request dedicated time slots on your instructor&apos;s schedule for doubt resolution and technical guidance.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Booking Form */}
        <Card className="md:col-span-1 border-muted shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Reserve Slot</CardTitle>
            <CardDescription>Submit meeting topic and choose open hours</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="meet-topic">Doubt Topic / Objective</Label>
                <Input
                  id="meet-topic"
                  placeholder="e.g. Redux Toolkit Middleware issue"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="meet-mentor">Select Mentor</Label>
                <select
                  id="meet-mentor"
                  className="w-full h-10 border rounded-md px-3 text-xs bg-background"
                  value={mentor}
                  onChange={(e) => setMentor(e.target.value)}
                >
                  <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar (React/Node)</option>
                  <option value="Mentor Subhash">Mentor Subhash (CSS/UI)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="meet-date">Booking Date</Label>
                <Input
                  id="meet-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="meet-slot">Available Office Hour Slots</Label>
                <select
                  id="meet-slot"
                  className="w-full h-10 border rounded-md px-3 text-xs bg-background"
                  value={slot}
                  onChange={(e) => setSlot(e.target.value)}
                >
                  <option value="04:00 PM - 04:30 PM">04:00 PM - 04:30 PM (Dr. Rajesh)</option>
                  <option value="04:30 PM - 05:00 PM">04:30 PM - 05:00 PM (Dr. Rajesh)</option>
                  <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM (Subhash)</option>
                  <option value="02:30 PM - 03:00 PM">02:30 PM - 03:00 PM (Subhash)</option>
                </select>
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-rose-650 hover:bg-rose-700 text-white cursor-pointer h-10">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Requesting Slot...
                  </>
                ) : (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Office Hours Slot
                  </>
                )}
              </Button>

              {success && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-[10px] text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Doubt meeting requested! Pending mentor approval.</span>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Meeting Registry */}
        <Card className="md:col-span-2 border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">My Meeting Schedule</CardTitle>
            <CardDescription>Status registry of slot reservations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-2">
            {meetings.map((meet) => (
              <div key={meet.id} className="flex items-center justify-between p-3.5 border rounded-lg hover:bg-muted/10 transition-colors text-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-rose-50 dark:bg-rose-950/20 rounded-lg text-rose-650 shrink-0">
                    <Clock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-805 dark:text-slate-200">{meet.topic}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Mentor: {meet.mentor} &bull; Mapped slot: {meet.dateTime}</p>
                  </div>
                </div>
                <div className="text-right space-y-1.5">
                  <Badge variant={meet.status === "Approved" ? "default" : meet.status === "Completed" ? "secondary" : "outline"} className={meet.status === "Approved" ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400" : ""}>
                    {meet.status}
                  </Badge>
                  {meet.link && (
                    <Button variant="outline" size="sm" className="h-7 text-[10px] flex items-center gap-1 block">
                      <Video className="h-3 w-3 text-rose-650" />
                      Join Call
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
