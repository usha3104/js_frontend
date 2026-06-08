"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, MessageSquareCode, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function MentorFeedback() {
  const [selectedStudent, setSelectedStudent] = useState("Amit Sharma");
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [engagement, setEngagement] = useState("");
  const [perfNotes, setPerfNotes] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Ratings received from students
  const studentFeedback = [
    { label: "Teaching Quality", score: 4.8 },
    { label: "Concept Clarity", score: 4.9 },
    { label: "Technical Support", score: 4.7 },
    { label: "Doubt Resolution Speed", score: 4.8 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);

    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      // Reset form
      setStrengths("");
      setWeaknesses("");
      setEngagement("");
      setPerfNotes("");
      setSuggestions("");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Feedback Hub</h2>
        <p className="text-sm text-muted-foreground">
          Submit reviews for students and track pedagogical rating scores received from cohorts.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Mentor -> Student Feedback Form */}
        <Card className="border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Write Student Feedback</CardTitle>
            <CardDescription>Draft performance analysis for assigned students</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="stud-select">Target Student</Label>
                <select
                  id="stud-select"
                  className="w-full h-10 border rounded-md px-3 text-xs bg-background"
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                >
                  <option value="Amit Sharma">Amit Sharma</option>
                  <option value="Priya Patel">Priya Patel</option>
                  <option value="Sneha Reddy">Sneha Reddy</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="f-strengths">Student Strengths</Label>
                  <Input
                    id="f-strengths"
                    placeholder="e.g. Excellent syntax structure"
                    value={strengths}
                    onChange={(e) => setStrengths(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="f-weaknesses">Core Growth Areas</Label>
                  <Input
                    id="f-weaknesses"
                    placeholder="e.g. Needs DB schema practice"
                    value={weaknesses}
                    onChange={(e) => setWeaknesses(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="f-engagement">Class Engagement Notes</Label>
                <Input
                  id="f-engagement"
                  placeholder="e.g. Active in live class chat forums"
                  value={engagement}
                  onChange={(e) => setEngagement(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="f-perf">General Performance & Coding Notes</Label>
                <Textarea
                  id="f-perf"
                  placeholder="Write detailing overall coding consistency, homework reviews..."
                  value={perfNotes}
                  onChange={(e) => setPerfNotes(e.target.value)}
                  rows={2}
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="f-suggestions">Improvement Suggestions</Label>
                <Textarea
                  id="f-suggestions"
                  placeholder="Steps to improve marks next milestone..."
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  rows={2}
                />
              </div>

              <Button type="submit" disabled={submitting} className="w-full bg-indigo-650 hover:bg-indigo-700 text-white cursor-pointer h-10">
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving Student Review...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Review to Student
                  </>
                )}
              </Button>

              {success && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-[11px] text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Review recorded successfully for {selectedStudent}!</span>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Student -> Mentor Ratings Received */}
        <Card className="border-muted shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Student Rating Scores</CardTitle>
            <CardDescription>Anonymized feedback ratings compiled from your classes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <div className="text-center pb-4 border-b">
              <span className="text-xs text-muted-foreground uppercase font-semibold">Aggregate Rating</span>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="text-4xl font-extrabold text-indigo-900 dark:text-indigo-400">4.80</span>
                <span className="text-xs font-semibold text-muted-foreground">/ 5.00</span>
              </div>
              <div className="flex justify-center gap-0.5 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="h-4 w-4 fill-amber-400 stroke-amber-400" />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Category Scores</h4>
              {studentFeedback.map((fb, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span>{fb.label}</span>
                    <span className="font-bold text-slate-805 dark:text-slate-200">{fb.score} / 5</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-indigo-600"
                      style={{ width: `${(fb.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-muted/30 border rounded-lg flex items-start gap-2.5 text-xs text-muted-foreground mt-4">
              <MessageSquareCode className="h-5 w-5 text-indigo-650 shrink-0 mt-0.5" />
              <p>Ratings are compiled monthly. Individual reviews are kept anonymous to encourage honest communication.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
