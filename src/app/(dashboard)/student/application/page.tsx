"use client";

import { FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function StudentApplicationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Application</h1>
        <p className="text-muted-foreground">
          Track your application status
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">B.Tech Admission 2025</p>
                  <p className="text-sm text-muted-foreground">
                    Submitted on Dec 15, 2024
                  </p>
                </div>
              </div>
              <Badge variant="info">Under Review</Badge>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Application Progress</h3>
              <div className="space-y-3">
                {[
                  { step: "Application Submitted", completed: true },
                  { step: "Under Review", completed: true },
                  { step: "Evaluation", completed: false },
                  { step: "Interview", completed: false },
                  { step: "Selection", completed: false },
                  { step: "Onboarding", completed: false },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    {step.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span
                      className={
                        step.completed ? "text-foreground" : "text-muted-foreground"
                      }
                    >
                      {step.step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
