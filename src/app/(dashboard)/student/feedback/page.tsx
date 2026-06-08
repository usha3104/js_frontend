"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, Send, CheckCircle2, Loader2, Quote } from "lucide-react";

export default function StudentFeedback() {
  const [activeTab, setActiveTab] = useState("submit-mentor");
  
  // Feedback to Mentor states
  const [teachingQuality, setTeachingQuality] = useState(5);
  const [clarity, setClarity] = useState(5);
  const [support, setSupport] = useState(5);
  const [doubtResolution, setDoubtResolution] = useState(5);
  const [mentorText, setMentorText] = useState("");
  const [mentorSubmitting, setMentorSubmitting] = useState(false);
  const [mentorSuccess, setMentorSuccess] = useState(false);

  // Feedback to Course states
  const [relevance, setRelevance] = useState(5);
  const [usefulness, setUsefulness] = useState(5);
  const [difficulty, setDifficulty] = useState(3);
  const [courseText, setCourseText] = useState("");
  const [courseSubmitting, setCourseSubmitting] = useState(false);
  const [courseSuccess, setCourseSuccess] = useState(false);

  const handleSubmitMentor = (e: React.FormEvent) => {
    e.preventDefault();
    setMentorSubmitting(true);
    setMentorSuccess(false);
    setTimeout(() => {
      setMentorSubmitting(false);
      setMentorSuccess(true);
      setMentorText("");
    }, 1000);
  };

  const handleSubmitCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setCourseSubmitting(true);
    setCourseSuccess(false);
    setTimeout(() => {
      setCourseSubmitting(false);
      setCourseSuccess(true);
      setCourseText("");
    }, 1000);
  };

  const renderStarsSelector = (val: number, setVal: (v: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setVal(s)}
            className="cursor-pointer transition-transform hover:scale-110"
          >
            <Star
              className={`h-4.5 w-4.5 ${
                s <= val ? "fill-amber-400 stroke-amber-400" : "stroke-muted-foreground/30"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Feedback Hub</h2>
        <p className="text-sm text-muted-foreground">
          Submit reviews regarding teaching quality and course content, and review comments from your mentors.
        </p>
      </div>

      <Card className="border-muted shadow-sm">
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full text-xs">
              <TabsTrigger value="submit-mentor">Review Your Mentor</TabsTrigger>
              <TabsTrigger value="submit-course">Review Course Syllabus</TabsTrigger>
              <TabsTrigger value="received-feedback">Mentor Reviews Received</TabsTrigger>
            </TabsList>

            {/* Submit Mentor Feedback */}
            <TabsContent value="submit-mentor" className="mt-4">
              <form onSubmit={handleSubmitMentor} className="space-y-4 text-xs max-w-xl">
                <p className="font-semibold text-sm">Review Instructor: Dr. Rajesh Kumar</p>
                
                <div className="grid grid-cols-2 gap-4 border-b pb-4">
                  <div className="space-y-1">
                    <Label>Teaching Quality</Label>
                    {renderStarsSelector(teachingQuality, setTeachingQuality)}
                  </div>
                  <div className="space-y-1">
                    <Label>Concept Clarity</Label>
                    {renderStarsSelector(clarity, setClarity)}
                  </div>
                  <div className="space-y-1">
                    <Label>Technical Support</Label>
                    {renderStarsSelector(support, setSupport)}
                  </div>
                  <div className="space-y-1">
                    <Label>Doubt Resolution Speed</Label>
                    {renderStarsSelector(doubtResolution, setDoubtResolution)}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="mentor-remarks">Share Your Thoughts / Remarks</Label>
                  <Textarea
                    id="mentor-remarks"
                    placeholder="Provide details about teaching approach, doubt clearing support..."
                    value={mentorText}
                    onChange={(e) => setMentorText(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button type="submit" disabled={mentorSubmitting} className="w-full bg-rose-650 hover:bg-rose-700 text-white cursor-pointer h-10">
                  {mentorSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Review...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Instructor Review
                    </>
                  )}
                </Button>

                {mentorSuccess && (
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-[10px] text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Mentor review recorded! Thank you for the feedback.</span>
                  </div>
                )}
              </form>
            </TabsContent>

            {/* Submit Course Feedback */}
            <TabsContent value="submit-course" className="mt-4">
              <form onSubmit={handleSubmitCourse} className="space-y-4 text-xs max-w-xl">
                <p className="font-semibold text-sm">Review Syllabus: Full Stack Web Development (React & Node)</p>

                <div className="grid grid-cols-3 gap-4 border-b pb-4">
                  <div className="space-y-1">
                    <Label>Content Relevance</Label>
                    {renderStarsSelector(relevance, setRelevance)}
                  </div>
                  <div className="space-y-1">
                    <Label>Practical Usefulness</Label>
                    {renderStarsSelector(usefulness, setUsefulness)}
                  </div>
                  <div className="space-y-1">
                    <Label>Difficulty Level</Label>
                    {renderStarsSelector(difficulty, setDifficulty)}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="course-remarks">Share Your Thoughts / Remarks</Label>
                  <Textarea
                    id="course-remarks"
                    placeholder="Provide details about material difficulty, codebase projects..."
                    value={courseText}
                    onChange={(e) => setCourseText(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button type="submit" disabled={courseSubmitting} className="w-full bg-rose-650 hover:bg-rose-700 text-white cursor-pointer h-10">
                  {courseSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving Review...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit Syllabus Review
                    </>
                  )}
                </Button>

                {courseSuccess && (
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 p-2.5 text-[10px] text-emerald-800 dark:bg-emerald-950/20 dark:border-emerald-900/50 dark:text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>Syllabus review recorded! Thank you for the feedback.</span>
                  </div>
                )}
              </form>
            </TabsContent>

            {/* Received Feedback from Mentors */}
            <TabsContent value="received-feedback" className="mt-4 space-y-4">
              <div className="p-4 border border-rose-100 rounded-lg bg-rose-50/5 dark:bg-slate-900 dark:border-slate-800 relative">
                <Quote className="absolute right-4 top-4 h-12 w-12 text-rose-250/20 pointer-events-none" />
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">60-Day Review Remarks</Badge>
                  <span className="text-[10px] text-muted-foreground font-mono">Date: 2026-05-30</span>
                </div>
                <p className="font-semibold text-xs text-muted-foreground uppercase">Evaluator: Dr. Rajesh Kumar</p>
                <p className="text-slate-750 dark:text-slate-350 italic text-xs mt-3 leading-relaxed">
                  &quot;Amit is performing exceptionally well in coding tasks. I recommend he participates in workshop panel discussions to improve his communication skills. He is highly recommended for full-stack react developer internship programs.&quot;
                </p>
                <div className="grid grid-cols-2 gap-4 text-[10px] border-t pt-3 mt-4 text-muted-foreground">
                  <div>
                    <span className="font-bold text-foreground">Strengths:</span> React state hooks, typescript modeling, clean code architecture
                  </div>
                  <div>
                    <span className="font-bold text-foreground">Growth Areas:</span> Active engagement and verbal questioning in live review session chats
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
