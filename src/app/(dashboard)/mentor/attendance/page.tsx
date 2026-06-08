"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Loader2, Save } from "lucide-react";

interface StudentAttendanceRow {
  id: string;
  name: string;
  email: string;
  isPresent: boolean;
}

const initialStudents: StudentAttendanceRow[] = [
  { id: "s-1", name: "Amit Sharma", email: "amit.sharma@college.edu", isPresent: true },
  { id: "s-2", name: "Priya Patel", email: "priya.patel@college.edu", isPresent: true },
  { id: "s-3", name: "Rohan Gupta", email: "rohan.gupta@m2i.com", isPresent: false },
  { id: "s-4", name: "Sneha Reddy", email: "sneha.reddy@college.edu", isPresent: true },
];

export default function MentorAttendance() {
  const [batch, setBatch] = useState("CSE-B1-2026");
  const [date, setDate] = useState("2026-06-02");
  const [students, setStudents] = useState<StudentAttendanceRow[]>(initialStudents);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleToggle = (id: string) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isPresent: !s.isPresent } : s))
    );
  };

  const handleSelectAll = (checked: boolean) => {
    setStudents((prev) => prev.map((s) => ({ ...s, isPresent: checked })));
  };

  const handleSave = () => {
    setSaving(true);
    setSuccess(false);
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Register Attendance</h2>
        <p className="text-sm text-muted-foreground">
          Select your class batch and check the box if the student was present in the session.
        </p>
      </div>

      <Card className="border-muted shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Mark Attendance Parameters</CardTitle>
          <CardDescription>Specify the session details before marking roster</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="batch-picker">Select Batch</Label>
              <Select value={batch} onValueChange={setBatch}>
                <SelectTrigger id="batch-picker">
                  <SelectValue placeholder="Batch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CSE-B1-2026">CSE-B1-2026</SelectItem>
                  <SelectItem value="ECE-B2-2026">ECE-B2-2026</SelectItem>
                  <SelectItem value="Open-Alpha-2026">Open-Alpha-2026</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date-picker">Session Date</Label>
              <Input
                type="date"
                id="date-picker"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-muted shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div>
            <CardTitle className="text-base font-semibold">Active Roster Checklist</CardTitle>
            <CardDescription>Check the checkbox next to present students</CardDescription>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectAll(true)}
              className="cursor-pointer"
            >
              Mark All Present
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSelectAll(false)}
              className="cursor-pointer"
            >
              Deselect All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">Present</TableHead>
                <TableHead>Student Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead className="text-center">Status Badge</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={student.isPresent}
                      onCheckedChange={() => handleToggle(student.id)}
                    />
                  </TableCell>
                  <TableCell className="font-semibold">{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell className="text-center">
                    {student.isPresent ? (
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full dark:bg-emerald-950/20 dark:text-emerald-400">
                        Present
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full dark:bg-rose-950/20 dark:text-rose-450">
                        Absent
                      </span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="border-t pt-4 flex flex-row items-center justify-between">
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-indigo-650 hover:bg-indigo-700 text-white cursor-pointer"
            >
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Attendance Logs...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Lock Attendance Registry
                </>
              )}
            </Button>

            {success && (
              <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-250 p-2.5 text-xs text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 animate-bounce" />
                <span>Attendance successfully registered and locked for {date}!</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
