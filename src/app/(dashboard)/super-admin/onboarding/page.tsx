"use client";

import { useState } from "react";
import { 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Search, 
  GraduationCap, 
  Calendar, 
  Users, 
  ChevronRight,
  TrendingUp,
  Layout
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface StudentOnboarding {
  id: string;
  name: string;
  college: string;
  currentStep: "Applied" | "Shortlisted" | "Interview Scheduled" | "Selected" | "Rejected" | "Onboarded";
  lastAction: string;
  date: string;
}

const steps = [
  "Applied",
  "Shortlisted",
  "Interview Scheduled",
  "Selected",
  "Onboarded"
];

const mockData: StudentOnboarding[] = [
  {
    id: "1",
    name: "John Smith",
    college: "Tech University",
    currentStep: "Interview Scheduled",
    lastAction: "Interview link sent",
    date: "2024-05-01",
  },
  {
    id: "2",
    name: "Sarah Connor",
    college: "Science Institute",
    currentStep: "Onboarded",
    lastAction: "Enrollment verified",
    date: "2024-05-02",
  },
  {
    id: "3",
    name: "Michael Chen",
    college: "Tech University",
    currentStep: "Applied",
    lastAction: "Resume submitted",
    date: "2024-05-03",
  },
];

export default function OnboardingMonitoringPage() {
  const [search, setSearch] = useState("");

  const filteredData = mockData.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.college.toLowerCase().includes(search.toLowerCase())
  );

  const getStepStatus = (currentStep: string, stepName: string) => {
    const currentIndex = steps.indexOf(currentStep);
    const stepIndex = steps.indexOf(stepName);

    if (currentStep === "Rejected") return "rejected";
    if (currentIndex === stepIndex) return "active";
    if (currentIndex > stepIndex) return "completed";
    return "pending";
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Onboarding & Evaluation Tracking</h1>
        <p className="text-muted-foreground">Monitor student progress through the evaluation and onboarding lifecycle</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardDescription>Evaluation Pending</CardDescription>
            <CardTitle className="text-2xl">142</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-purple-500/5 border-purple-500/20">
          <CardHeader className="pb-2">
            <CardDescription>Shortlisted</CardDescription>
            <CardTitle className="text-2xl">56</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2">
            <CardDescription>Final Selection</CardDescription>
            <CardTitle className="text-2xl">24</CardTitle>
          </CardHeader>
        </Card>
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardDescription>Onboarded Total</CardDescription>
            <CardTitle className="text-2xl">890</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by student or college..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Last 30 Days
        </Button>
      </div>

      <div className="space-y-4">
        {filteredData.map((student) => (
          <Card key={student.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Student Info */}
                <div className="flex items-start gap-4 min-w-[240px]">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{student.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      {student.college}
                    </p>
                    <Badge variant="outline" className="text-[10px] uppercase">{student.lastAction}</Badge>
                  </div>
                </div>

                {/* Progress Tracker */}
                <div className="flex-1 max-w-2xl">
                  <div className="flex justify-between mb-4 relative">
                    {steps.map((step) => {
                      const status = getStepStatus(student.currentStep, step);
                      return (
                        <div key={step} className="flex flex-col items-center gap-2 relative px-2">
                          <div 
                            className={cn(
                              "h-8 w-8 rounded-full flex items-center justify-center border-2 z-10 transition-colors",
                              status === "completed" ? "bg-primary border-primary text-white" :
                              status === "active" ? "bg-background border-primary text-primary" :
                              "bg-background border-muted text-muted-foreground"
                            )}
                          >
                            {status === "completed" ? <CheckCircle2 className="h-5 w-5" /> : 
                             status === "active" ? <Clock className="h-5 w-5" /> : 
                             <div className="h-2 w-2 rounded-full bg-current" />}
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold text-center",
                            status === "pending" ? "text-muted-foreground" : "text-foreground"
                          )}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                    {/* Connecting Lines */}
                    <div className="absolute left-0 right-0 top-4 h-[2px] bg-muted -z-0 mx-8" />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    View Profile
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Onboarding Velocity
            </CardTitle>
            <CardDescription>Average time from Application to Onboarding</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center text-muted-foreground bg-muted/10 rounded-lg border-2 border-dashed">
              Velocity Chart
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Layout className="h-5 w-5 text-primary" />
              Drop-off Analysis
            </CardTitle>
            <CardDescription>Where students drop out of the funnel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-center justify-center text-muted-foreground bg-muted/10 rounded-lg border-2 border-dashed">
              Funnel Chart
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
