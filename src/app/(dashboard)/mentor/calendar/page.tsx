"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CalendarItem {
  id: string;
  title: string;
  type: "Class" | "Deadline" | "Workshop" | "Doubt Session" | "Assessment";
  batch: string;
  timeSlot: string;
  day: string;
}

const mockEvents: CalendarItem[] = [
  { id: "1", title: "React Component Hook Patterns", type: "Class", batch: "CSE-B1-2026", timeSlot: "10:00 AM - 11:30 AM", day: "Monday" },
  { id: "2", title: "Assignment 1 Submissions Lock", type: "Deadline", batch: "CSE-B1-2026", timeSlot: "11:59 PM", day: "Tuesday" },
  { id: "3", title: "Tailwind Grid Layouts doubt hours", type: "Doubt Session", batch: "CSE-B1-2026", timeSlot: "04:00 PM - 05:00 PM", day: "Wednesday" },
  { id: "4", title: "ESP32 Sensor Telemetry", type: "Class", batch: "ECE-B2-2026", timeSlot: "09:00 AM - 10:30 AM", day: "Thursday" },
  { id: "5", title: "Cloud Dockerization Lab Review", type: "Workshop", batch: "ALL BATCHES", timeSlot: "02:00 PM - 04:00 PM", day: "Friday" },
];

export default function MentorCalendar() {
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL"
    ? mockEvents
    : mockEvents.filter((e) => e.type === filter);

  const getBadgeColor = (type: CalendarItem["type"]) => {
    switch (type) {
      case "Class":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-450";
      case "Deadline":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-455";
      case "Doubt Session":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400";
      case "Workshop":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "Assessment":
        return "bg-amber-100 text-amber-800 dark:bg-amber-950/20 dark:text-amber-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Scheduler Calendar</h2>
          <p className="text-sm text-muted-foreground">
            Manage your weekly lecture slots, project timelines, and doubt-resolution bookings.
          </p>
        </div>
        <div className="w-48">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              <SelectItem value="Class">Class Lectures</SelectItem>
              <SelectItem value="Deadline">Deadlines</SelectItem>
              <SelectItem value="Doubt Session">Doubt Sessions</SelectItem>
              <SelectItem value="Workshop">Workshops</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filtered.map((item) => (
          <Card key={item.id} className="border-muted shadow-sm hover:shadow-md transition-all">
            <CardContent className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 rounded-lg">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.day}</span>
                    <Badge className={getBadgeColor(item.type)}>{item.type}</Badge>
                  </div>
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-150">{item.title}</h4>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-indigo-650" />
                  <span>{item.timeSlot}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="font-mono">{item.batch}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
