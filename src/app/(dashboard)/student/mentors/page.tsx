"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Calendar, Video, Star } from "lucide-react";
import Link from "next/link";

interface MentorProfile {
  id: string;
  name: string;
  role: string;
  email: string;
  rating: number;
  availableHours: string;
  bio: string;
}

const mockMentors: MentorProfile[] = [
  {
    id: "m-1",
    name: "Dr. Rajesh Kumar",
    role: "Lead Full-Stack Instructor",
    email: "rajesh.k@netpy.com",
    rating: 4.9,
    availableHours: "Mon/Wed 4:00 PM - 6:00 PM",
    bio: "Ex-Software Engineer at Google, focusing on serverless cloud architectures, React ecosystems, and database designs.",
  },
  {
    id: "m-2",
    name: "Mentor Subhash",
    role: "Associate Frontend Mentor",
    email: "subhash.m@netpy.com",
    rating: 4.7,
    availableHours: "Tue/Thu 2:00 PM - 4:00 PM",
    bio: "Focuses on React UI layouts, state optimization stores, and CSS framework styling methods.",
  },
];

export default function StudentMentors() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">My Instructors & Mentors</h2>
        <p className="text-sm text-muted-foreground">
          Contact your assigned mentors, check their open slots, and request doubt clearing hours.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockMentors.map((m) => (
          <Card key={m.id} className="border-muted shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base font-bold text-slate-850 dark:text-slate-100">{m.name}</CardTitle>
                  <CardDescription className="text-xs">{m.role}</CardDescription>
                </div>
                <div className="flex items-center gap-1 bg-amber-50 text-amber-700 dark:bg-amber-950/20 dark:text-amber-400 px-2 py-0.5 rounded text-[10px] font-bold">
                  <Star className="h-3 w-3 fill-amber-400 stroke-amber-400" />
                  {m.rating}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs">
              <p className="text-slate-650 dark:text-slate-350 leading-relaxed italic">
                &quot;{m.bio}&quot;
              </p>

              <div className="space-y-2 border-t pt-3 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-rose-650" />
                  <span>Email: {m.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-indigo-605" />
                  <span>Available Slot Hours: {m.availableHours}</span>
                </div>
              </div>

              <div className="flex gap-2.5 pt-2">
                <Link href="/student/meetings" className="flex-1">
                  <Button size="sm" className="w-full bg-rose-650 hover:bg-rose-700 text-white cursor-pointer text-[11px] h-9">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    Book Doubt Session
                  </Button>
                </Link>
                <Button size="sm" variant="outline" className="flex-1 text-[11px] h-9 cursor-pointer">
                  <Video className="h-3.5 w-3.5 mr-1" />
                  Enter Office Hours
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
