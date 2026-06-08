"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Briefcase, Loader2, KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuthStore } from "@/stores/auth-store";

const loginSchema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function CompanyLoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setError("");
    setIsLoading(true);

    // Mock Login Timeout
    setTimeout(() => {
      const email = values.email.trim().toLowerCase();
      const password = values.password.trim();

      if (email === "recruiter@company.com" && password === "Company@123") {
        const mockUser = {
          id: "mock-company-1",
          email: "recruiter@company.com",
          name: "Acme Corp (Recruiting)",
          role: "COMPANY" as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        login(mockUser, "mock-company-jwt-token");
        router.push("/company/dashboard");
      } else {
        setError("Invalid Employer / Partner credentials.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-violet-950/20 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[80px] pointer-events-none" />

      <Card className="w-full max-w-md border-violet-850/20 bg-card text-card-foreground shadow-xl">
        <CardHeader className="space-y-2 text-center pb-6 border-b border-muted">
          <div className="flex justify-center mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/10 text-violet-650 border border-violet-500/20 shadow-[0_0_15px_rgba(124,58,237,0.1)]">
              <Briefcase className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Hiring Partner Portal</CardTitle>
          <CardDescription>
            Search talent, post openings, and track observations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-sm text-destructive font-medium">
                  {error}
                </div>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recruiter Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="recruiter@company.com"
                        className="focus-visible:ring-violet-500/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="focus-visible:ring-violet-500/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-11 bg-violet-600 hover:bg-violet-750 text-white transition-colors" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting to Partner Network...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </Form>

          <div className="rounded-lg bg-violet-50/50 border border-violet-100 p-4 space-y-2 dark:bg-slate-900/60 dark:border-slate-800">
            <p className="text-xs font-semibold text-violet-650 uppercase tracking-widest flex items-center gap-1.5">
              <KeyRound className="h-3.5 w-3.5" />
              Employer Credentials:
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="font-semibold text-violet-850 dark:text-slate-350">Email:</span> recruiter@company.com</p>
              <p><span className="font-semibold text-violet-850 dark:text-slate-350">Password:</span> Company@123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
