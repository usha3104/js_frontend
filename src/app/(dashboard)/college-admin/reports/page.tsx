"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileSpreadsheet, Download, Loader2, CheckCircle2 } from "lucide-react";

export default function CollegeAdminReports() {
  const [batch, setBatch] = useState("CSE-B1-2026");
  const [reportType, setReportType] = useState("attendance");
  const [dateFrom, setDateFrom] = useState("2026-01-01");
  const [dateTo, setDateTo] = useState("2026-06-01");
  const [exporting, setExporting] = useState<"none" | "csv" | "pdf">("none");
  const [successMsg, setSuccessMsg] = useState("");

  const handleExport = (format: "csv" | "pdf") => {
    setExporting(format);
    setSuccessMsg("");
    setTimeout(() => {
      setExporting("none");
      setSuccessMsg(`Successfully generated and downloaded ${format.toUpperCase()} report for ${batch}!`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Academic & Attendance Reports</h2>
        <p className="text-sm text-muted-foreground">
          Download formatted student records, presence lists, and performance evaluations.
        </p>
      </div>

      <Card className="border-muted shadow-sm">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Report Generator Settings</CardTitle>
          <CardDescription>Select the batch parameters and dates to compile institutional telemetry.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="batch-select">Academic Cohort</Label>
              <Select value={batch} onValueChange={setBatch}>
                <SelectTrigger id="batch-select">
                  <SelectValue placeholder="Select Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE-B1-2026">CSE-B1-2026</SelectItem>
                  <SelectItem value="ECE-B2-2026">ECE-B2-2026</SelectItem>
                  <SelectItem value="Open-Alpha-2026">Open-Alpha-2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-from">Date From</Label>
              <Input
                type="date"
                id="date-from"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-to">Date To</Label>
              <Input
                type="date"
                id="date-to"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-type">Telemetry Focus</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="report-type">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="attendance">Daily Attendance Log</SelectItem>
                  <SelectItem value="performance">Grade Sheet & Projects</SelectItem>
                  <SelectItem value="observation">60-Day Observation Records</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <p className="text-sm font-semibold">Ready to compile report for: <span className="text-teal-650 font-mono font-bold">{batch}</span></p>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => handleExport("csv")}
                disabled={exporting !== "none"}
                className="cursor-pointer border-teal-200 text-teal-750 hover:bg-teal-50"
              >
                {exporting === "csv" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Compiling CSV...
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    Download CSV Sheet
                  </>
                )}
              </Button>

              <Button
                onClick={() => handleExport("pdf")}
                disabled={exporting !== "none"}
                className="cursor-pointer bg-teal-605 hover:bg-teal-700 text-white"
              >
                {exporting === "pdf" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Rendering PDF Layout...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Compile PDF Document
                  </>
                )}
              </Button>
            </div>

            {successMsg && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Reports FAQ / Description */}
      <Card className="border-muted shadow-sm bg-muted/20">
        <CardContent className="pt-6">
          <h3 className="text-sm font-bold mb-2">Report Content Overview</h3>
          <ul className="list-disc pl-5 text-xs text-muted-foreground space-y-1">
            <li><strong>Attendance Log:</strong> Lists individual lecture presence percentages, total hours completed, and late metrics.</li>
            <li><strong>Performance Matrix:</strong> Includes student grades, final score rankings, assignment submit metrics, and project evaluations.</li>
            <li><strong>60-Day Observation:</strong> Contains qualitative mentor evaluations, adaptability scores, and recommendations.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
