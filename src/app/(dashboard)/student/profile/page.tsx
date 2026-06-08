"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, Loader2, CheckCircle2, User } from "lucide-react";

export default function StudentProfile() {
  const [name, setName] = useState("Amit Sharma");
  const [email, setEmail] = useState("student@m2i.com");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [college, setCollege] = useState("SVKM Institute of Technology");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);

    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
      setPassword("");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">My Profile</h2>
        <p className="text-sm text-muted-foreground">
          View your academic metadata and manage security settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Card Summary */}
        <Card className="md:col-span-1 border-muted shadow-sm h-fit">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-50 border border-rose-200 text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/40">
                <User className="h-10 w-10" />
              </div>
            </div>
            <CardTitle className="text-base font-bold">{name}</CardTitle>
            <CardDescription className="text-xs">Syllabus Track: Full Stack Development</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3.5 border-t pt-4 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span className="font-semibold">Student ID:</span>
              <span className="font-mono">M2I-2026-081</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Institution Mapped:</span>
              <span>{college}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Cohort Group:</span>
              <span className="font-mono">CSE-B1-2026</span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Form Details */}
        <Card className="md:col-span-2 border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Account Metadata</CardTitle>
            <CardDescription>Edit details and change password</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="stud-name">Full Name</Label>
                  <Input
                    id="stud-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="stud-email">Email Address</Label>
                  <Input
                    id="stud-email"
                    type="email"
                    value={email}
                    disabled
                    className="bg-muted text-muted-foreground cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="stud-phone">Contact Number</Label>
                  <Input
                    id="stud-phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="stud-col">College / Mapped School</Label>
                  <Input
                    id="stud-col"
                    value={college}
                    disabled
                    className="bg-muted text-muted-foreground cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="border-t pt-4 space-y-1.5 max-w-sm">
                <Label htmlFor="stud-pwd">Reset Password</Label>
                <Input
                  id="stud-pwd"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="border-t pt-4 flex flex-row items-center justify-between">
                <Button type="submit" disabled={saving} className="bg-rose-650 hover:bg-rose-700 text-white cursor-pointer h-10">
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving changes...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Account Changes
                    </>
                  )}
                </Button>

                {success && (
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-808 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Profile settings successfully saved!</span>
                  </div>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
