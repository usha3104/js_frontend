"use client";

import { useState } from "react";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar, 
  FileText, 
  PieChart, 
  Download,
  Filter
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
  const [filters, setFilters] = useState({
    college: "all",
    reportType: "onboarding",
    dateFrom: "",
    dateTo: "",
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Advanced Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Platform-wide insights into college onboarding, student applications, and evaluation trends.
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export All Data
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b bg-muted/20">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Report Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="space-y-2 flex-1 min-w-[200px]">
              <label className="text-xs font-bold uppercase text-muted-foreground">College</label>
              <Select value={filters.college} onValueChange={(val) => setFilters({ ...filters, college: val })}>
                <SelectTrigger>
                  <SelectValue placeholder="All Colleges" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  <SelectItem value="tech">Tech University</SelectItem>
                  <SelectItem value="science">Science Institute</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex-1 min-w-[200px]">
              <label className="text-xs font-bold uppercase text-muted-foreground">Report Type</label>
              <Select value={filters.reportType} onValueChange={(val) => setFilters({ ...filters, reportType: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="onboarding">Onboarding Funnel</SelectItem>
                  <SelectItem value="applications">Application Volume</SelectItem>
                  <SelectItem value="evaluation">Evaluation Performance</SelectItem>
                  <SelectItem value="college">College Activity</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex-1 min-w-[150px]">
              <label className="text-xs font-bold uppercase text-muted-foreground">From Date</label>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              />
            </div>
            <div className="space-y-2 flex-1 min-w-[150px]">
              <label className="text-xs font-bold uppercase text-muted-foreground">To Date</label>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              />
            </div>
            <Button className="px-8">Generate Report</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              Application Conversion Funnel
            </CardTitle>
            <CardDescription>Conversion rate from Applied to Onboarded</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[350px] flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/10">
              <div className="w-full max-w-md space-y-4 px-12">
                {[
                  { label: "Applied", value: 1248, color: "bg-blue-500", width: "w-full" },
                  { label: "Shortlisted", value: 452, color: "bg-purple-500", width: "w-3/4" },
                  { label: "Selected", value: 156, color: "bg-green-500", width: "w-1/2" },
                  { label: "Onboarded", value: 84, color: "bg-emerald-500", width: "w-1/4" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span>{item.label}</span>
                      <span>{item.value}</span>
                    </div>
                    <div className={cn("h-4 rounded-full transition-all", item.color, item.width)} />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <PieChart className="h-5 w-5 text-primary" />
              College Distribution
            </CardTitle>
            <CardDescription>Application volume per college</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[350px] items-center justify-center rounded-xl border-2 border-dashed bg-muted/10">
              <p className="text-muted-foreground text-sm italic">Distribution Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-primary" />
              Weekly Application Volume
            </CardTitle>
            <CardDescription>Number of applications received over the last 8 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-[300px] items-center justify-center rounded-xl border-2 border-dashed bg-muted/10">
              <p className="text-muted-foreground text-sm italic">Weekly Trend Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
