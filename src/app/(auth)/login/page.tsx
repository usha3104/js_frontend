"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GraduationCap, Loader2, KeyRound } from "lucide-react";
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

export default function LoginPage() {
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

    setTimeout(() => {
      const email = values.email.trim().toLowerCase();
      const password = values.password.trim();

      // Role credentials definitions
      const credentialsManifest = [
        {
          email: "superadmin@m2i.com",
          password: "Super@123",
          name: "Super Admin",
          role: "SUPER_ADMIN" as const,
          redirectUrl: "/super-admin",
        },
        {
          email: "admin@m2i.com",
          password: "Admin@123",
          name: "NetPy Admin",
          role: "M2I_ADMIN" as const,
          redirectUrl: "/admin/dashboard",
        },
        {
          email: "collegeadmin@m2i.com",
          password: "College@123",
          name: "College Administrator",
          role: "COLLEGE_ADMIN" as const,
          redirectUrl: "/college-admin/dashboard",
        },
        {
          email: "mentor@m2i.com",
          password: "Mentor@123",
          name: "Dr. Rajesh Kumar (Mentor)",
          role: "MENTOR" as const,
          redirectUrl: "/mentor/dashboard",
        },
        {
          email: "student@m2i.com",
          password: "Student@123",
          name: "Amit Sharma (Student)",
          role: "STUDENT" as const,
          redirectUrl: "/student/dashboard",
        },
        {
          email: "recruiter@company.com",
          password: "Company@123",
          name: "Acme Corp Recruiter",
          role: "COMPANY" as const,
          redirectUrl: "/company/dashboard",
        },
      ];

      const match = credentialsManifest.find(
        (cred) => cred.email === email && cred.password === password
      );

      if (match) {
        const mockUser = {
          id: `mock-${match.role.toLowerCase()}-1`,
          email: match.email,
          name: match.name,
          role: match.role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        login(mockUser, `mock-${match.role.toLowerCase()}-jwt-token`);
        router.push(match.redirectUrl);
      } else {
        setError("Invalid email address or security password.");
        setIsLoading(false);
      }
    }, 850);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50/50 dark:bg-slate-950 px-4 relative overflow-hidden">
      {/* Subtle modern background blur decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <Card className="w-full max-w-md border-muted bg-card shadow-xl">
        <CardHeader className="space-y-2 text-center pb-6 border-b border-muted">
          <div className="flex justify-center mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-indigo-650/10 dark:text-indigo-400 border shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">M2I LMS Portal</CardTitle>
          <CardDescription>
            Enter your credentials to access your designated workspace
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="yourname@domain.com"
                        className="focus-visible:ring-indigo-500/30"
                        {...field}
                        autoComplete="email"
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="focus-visible:ring-indigo-500/30"
                        {...field}
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading} className="w-full h-11 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white transition-colors">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying Workspace...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
