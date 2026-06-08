"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Clock, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StudentCalendarItem {
  id: string;
  title: string;
  type: "Class" | "Deadline" | "Workshop" | "Doubt Session";
  timeSlot: string;
  day: string;
  instructor: string;
}

const mockEvents: StudentCalendarItem[] = [
  { id: "1", title: "React Component Hook Patterns", type: "Class", timeSlot: "10:00 AM - 11:30 AM", day: "Monday", instructor: "Dr. Rajesh Kumar" },
  { id: "2", title: "Assignment 1 Submission Lock", type: "Deadline", timeSlot: "11:59 PM", day: "Tuesday", instructor: "System Autograde" },
  { id: "3", title: "Tailwind UI Grid layout doubt sync", type: "Doubt Session", timeSlot: "04:00 PM - 05:00 PM", day: "Wednesday", instructor: "Mentor Subhash" },
  { id: "4", title: "Docker Compositions Multi-stage builds", type: "Workshop", timeSlot: "02:00 PM - 04:00 PM", day: "Friday", instructor: "Tech Lead Vikram" },
];

export default function StudentCalendar() {
  const [filter, setFilter] = useState("ALL");

  const filtered = filter === "ALL"
    ? mockEvents
    : mockEvents.filter((e) => e.type === filter);

  const getBadgeColor = (type: StudentCalendarItem["type"]) => {
    switch (type) {
      case "Class":
        return "bg-blue-105 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "Deadline":
        return "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-455";
      case "Doubt Session":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400";
      case "Workshop":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">My Calendar</h2>
          <p className="text-sm text-muted-foreground">
            Review your weekly schedules, project deadlines, and workshops.
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
                <div className="p-3 bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 rounded-lg">
                  <CalendarIcon className="h-5 w-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.day}</span>
                    <Badge className={getBadgeColor(item.type)}>{item.type}</Badge>
                  </div>
                  <h4 className="text-base font-bold text-slate-805 dark:text-slate-150">{item.title}</h4>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-rose-650" />
                  <span>{item.timeSlot}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Instructor: {item.instructor}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
