"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, User, ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function OnboardingPortal() {
  const pathways = [
    {
      title: "College-Partnered Onboarding",
      subtitle: "For students enrolled via institutional partnerships",
      type: "COLLEGE",
      icon: GraduationCap,
      color: "border-rose-500/30 hover:border-rose-500 bg-rose-500/5 dark:bg-rose-950/10",
      iconColor: "text-rose-600 bg-rose-50 dark:bg-rose-950/30",
      badge: "Partnership Program",
      badgeColor: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
      cta: "Initialize College Flow",
      href: "/onboarding/student?type=college",
      features: [
        "Curriculum mapped to college semesters",
        "Direct assessment syncing with university records",
        "Assigned institutional mentors and campus cohort",
        "College-sponsored program fee exemptions",
        "Joint certification by NetPy & Partner Institution",
      ],
    },
    {
      title: "Direct Learner Onboarding",
      subtitle: "For independent professionals & self-enrolled students",
      type: "DIRECT",
      icon: User,
      color: "border-indigo-500/30 hover:border-indigo-500 bg-indigo-500/5 dark:bg-indigo-950/10",
      iconColor: "text-indigo-650 bg-indigo-50 dark:bg-indigo-950/30",
      badge: "Open Enrollment",
      badgeColor: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
      cta: "Start Independent Flow",
      href: "/onboarding/student?type=direct",
      features: [
        "Self-paced learning with flexible schedule access",
        "Industry-standard mock evaluations & portfolio reviews",
        "Direct connection to global partner companies",
        "Flexible learning mode (Online / Hybrid / Offline)",
        "NetPy Premium Industry-Accredited Credentials",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50/50 dark:bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-4xl text-center space-y-4 mb-12">
        <Badge variant="outline" className="px-3 py-1 border-rose-300 text-rose-650 dark:border-rose-900 dark:text-rose-400 font-semibold uppercase tracking-wider text-xs">
          Student Onboarding Portal
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          Choose Your <span className="bg-gradient-to-r from-rose-600 to-indigo-600 bg-clip-text text-transparent">Learning Pathway</span>
        </h1>
        <p className="max-w-2xl mx-auto text-base text-slate-500 dark:text-slate-400">
          Welcome to the M2I LMS. Select your enrollment type below to customize your onboarding setup, learning schedules, and portfolio observations.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 w-full max-w-4xl">
        {pathways.map((path, idx) => {
          const Icon = path.icon;
          return (
            <Card key={idx} className={`relative flex flex-col justify-between border-2 transition-all duration-300 shadow-md hover:shadow-xl ${path.color}`}>
              <div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${path.iconColor}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <Badge className={`font-semibold text-xs ${path.badgeColor}`}>{path.badge}</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {path.title}
                  </CardTitle>
                  <CardDescription className="text-sm mt-1 text-slate-500 dark:text-slate-450">
                    {path.subtitle}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4 pt-2">
                  <div className="text-xs font-semibold text-slate-450 uppercase tracking-wider">What you get:</div>
                  <ul className="space-y-2.5">
                    {path.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start text-sm text-slate-600 dark:text-slate-350">
                        <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 mr-2.5 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </div>

              <CardFooter className="pt-6 border-t mt-6 bg-stone-50/30 dark:bg-slate-900/10">
                <Link href={path.href} className="w-full">
                  <Button className="w-full flex items-center justify-center gap-2 group text-white bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 dark:from-rose-600 dark:to-indigo-600 dark:hover:from-rose-500 dark:hover:to-indigo-500 font-medium">
                    {path.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500 flex items-center gap-3">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-4 w-4 text-emerald-500" />
          Role Isolation Guaranteed
        </span>
        <span>•</span>
        <span className="flex items-center gap-1">
          <Zap className="h-4 w-4 text-amber-500" />
          Observation Ready Setup
        </span>
      </div>
    </div>
  );
}
