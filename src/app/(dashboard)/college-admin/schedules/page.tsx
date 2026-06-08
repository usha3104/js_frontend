"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Layers } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalendarEvent {
  id: string;
  title: string;
  type: "Class" | "Deadline" | "Workshop" | "Assessment" | "Doubt Session";
  batch: string;
  dateTime: string;
  instructor: string;
  details: string;
}

const mockEvents: CalendarEvent[] = [
  { id: "e-1", title: "React State Management Deep Dive", type: "Class", batch: "CSE-B1-2026", dateTime: "2026-06-03 10:00 AM", instructor: "Dr. Rajesh Kumar", details: "Redux toolkit slice structures and asynchronous Thunk dispatching." },
  { id: "e-2", title: "Milestone Project 2 Submission", type: "Deadline", batch: "CSE-B1-2026", dateTime: "2026-06-05 11:59 PM", instructor: "Dr. Rajesh Kumar", details: "E-Commerce backend API services & authentication middleware." },
  { id: "e-3", title: "Cloud Native Dockerization Workshop", type: "Workshop", batch: "ALL BATCHES", dateTime: "2026-06-06 02:00 PM", instructor: "Tech Lead Vikram", details: "Multi-stage docker builds, environment configuration, and image size optimization." },
  { id: "e-4", title: "Full-Stack Node JS Assessment", type: "Assessment", batch: "ECE-B2-2026", dateTime: "2026-06-08 09:00 AM", instructor: "Prof. Ananya Sen", details: "Mid-term evaluation covering REST routers, MongoDB aggregation, and Zod validation schemas." },
  { id: "e-5", title: "Asynchronous JavaScript Doubt Session", type: "Doubt Session", batch: "ECE-B2-2026", dateTime: "2026-06-09 04:00 PM", instructor: "Mentor Subhash", details: "Answering student queries regarding Promises, callback hell, and async-await errors." },
];

export default function CollegeAdminSchedules() {
  const [filterType, setFilterType] = useState<string>("ALL");

  const filteredEvents = filterType === "ALL"
    ? mockEvents
    : mockEvents.filter((ev) => ev.type === filterType);

  const getEventBadge = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "Class":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400">Class Lecture</Badge>;
      case "Deadline":
        return <Badge className="bg-rose-100 text-rose-800 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-450 border border-rose-200">Deadline</Badge>;
      case "Workshop":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400">Workshop</Badge>;
      case "Assessment":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">Assessment</Badge>;
      case "Doubt Session":
        return <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-100 dark:bg-teal-900/30 dark:text-teal-400">Doubt Session</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Academic Calendar & Schedules</h2>
          <p className="text-sm text-muted-foreground">
            Monitor live lecture timings, assignment lock dates, and workshops.
          </p>
        </div>
        <div className="w-48">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter Event Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              <SelectItem value="Class">Class Lectures</SelectItem>
              <SelectItem value="Deadline">Deadlines</SelectItem>
              <SelectItem value="Workshop">Workshops</SelectItem>
              <SelectItem value="Assessment">Assessments</SelectItem>
              <SelectItem value="Doubt Session">Doubt Sessions</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        {filteredEvents.length === 0 ? (
          <Card className="border-muted shadow-sm py-12 text-center text-muted-foreground">
            No events scheduled for the selected category.
          </Card>
        ) : (
          filteredEvents.map((ev) => (
            <Card key={ev.id} className="border-muted shadow-sm hover:shadow-md transition-all">
              <CardHeader className="flex flex-row justify-between items-start pb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    {getEventBadge(ev.type)}
                    <span className="flex items-center text-[11px] text-muted-foreground font-mono">
                      <Layers className="h-3 w-3 mr-1" />
                      {ev.batch}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold text-slate-800 dark:text-slate-150">{ev.title}</CardTitle>
                </div>
                <div className="text-right text-xs text-muted-foreground space-y-1">
                  <p className="flex items-center justify-end font-semibold text-foreground">
                    <Clock className="h-3.5 w-3.5 mr-1 text-teal-650" />
                    {ev.dateTime}
                  </p>
                  <p className="text-[10px]">Instructor: {ev.instructor}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-slate-650 dark:text-slate-400 bg-muted/30 p-2.5 rounded-lg border">
                  {ev.details}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
