"use client";

import { useState } from "react";
import { Settings, Save, User, Bell, Shield, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SettingsPage() {
  // Profile settings state
  const [name, setName] = useState("M2I Admin");
  const [email, setEmail] = useState("admin@m2i.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Notification toggles state
  const [notifyOnRegister, setNotifyOnRegister] = useState(true);
  const [notifyOnSubmit, setNotifyOnSubmit] = useState(true);
  const [notifyOnVerify, setNotifyOnVerify] = useState(false);
  const [digestFrequency, setDigestFrequency] = useState("weekly");

  // Save changes progress state
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    // Simulate saving settings to local storage or backend
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your admin profile preferences, password security, and system notifications.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-lg flex items-center gap-3 border bg-green-50 border-green-200 text-green-800 transition-all duration-300">
          <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
          <span className="text-sm font-semibold">Changes saved successfully!</span>
        </div>
      )}

      <form onSubmit={handleSaveChanges} className="space-y-6">
        {/* Profile Card */}
        <Card className="hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center gap-2.5 pb-3 border-b">
            <User className="h-5 w-5 text-indigo-600" />
            <div>
              <CardTitle className="text-base font-bold">Admin Profile Info</CardTitle>
              <CardDescription className="text-xs">Update your display name and email address.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="admin-name">Full Name *</Label>
              <Input
                id="admin-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="admin-email">Email Address *</Label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Security / Password Card */}
        <Card className="hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center gap-2.5 pb-3 border-b">
            <Shield className="h-5 w-5 text-indigo-600" />
            <div>
              <CardTitle className="text-base font-bold">Password & Security</CardTitle>
              <CardDescription className="text-xs">Change your account credentials to keep it secure.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="current-pw">Current Password</Label>
              <Input
                id="current-pw"
                type="password"
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="new-pw">New Password</Label>
              <Input
                id="new-pw"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* System Settings & Notifications Card */}
        <Card className="hover:shadow-sm transition-shadow">
          <CardHeader className="flex flex-row items-center gap-2.5 pb-3 border-b">
            <Bell className="h-5 w-5 text-indigo-600" />
            <div>
              <CardTitle className="text-base font-bold">System Notifications</CardTitle>
              <CardDescription className="text-xs">Configure email trigger flags and reporting digests.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="flex items-center justify-between border-b pb-3.5">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">New student registration alerts</Label>
                <p className="text-xs text-muted-foreground">Receive instant alerts when a student registers at onboarded colleges.</p>
              </div>
              <Switch checked={notifyOnRegister} onCheckedChange={setNotifyOnRegister} />
            </div>

            <div className="flex items-center justify-between border-b pb-3.5">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">Weekly cohort performance digests</Label>
                <p className="text-xs text-muted-foreground">Receive automated reports summarizing average attendance and test scores.</p>
              </div>
              <Switch checked={notifyOnSubmit} onCheckedChange={setNotifyOnSubmit} />
            </div>

            <div className="flex items-center justify-between border-b pb-3.5">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">Mentor check-in warnings</Label>
                <p className="text-xs text-muted-foreground">Get notified if a batch attendance rate dips below critical 75% threshold.</p>
              </div>
              <Switch checked={notifyOnVerify} onCheckedChange={setNotifyOnVerify} />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="space-y-0.5">
                <Label className="text-sm font-semibold">Automated Digest Frequency</Label>
                <p className="text-xs text-muted-foreground">Set how often the LMS updates digest logs to your inbox.</p>
              </div>
              <Select value={digestFrequency} onValueChange={setDigestFrequency}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily Summary</SelectItem>
                  <SelectItem value="weekly">Weekly Summary</SelectItem>
                  <SelectItem value="monthly">Monthly Summary</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Form Action Submit */}
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isSaving} className="h-11 px-6">
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
