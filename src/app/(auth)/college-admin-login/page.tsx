"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Loader2, Building } from "lucide-react";
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

export default function CollegeAdminLoginPage() {
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

      if (email === "collegeadmin@m2i.com" && password === "College@123") {
        const mockUser = {
          id: "mock-college-admin-1",
          email: "collegeadmin@m2i.com",
          name: "College Administrator",
          role: "COLLEGE_ADMIN" as const,
          collegeId: "mock-college-1",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        login(mockUser, "mock-college-admin-jwt-token");
        router.push("/college-admin/dashboard");
      } else {
        setError("Invalid College Admin credentials.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-teal-950/20 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

      <Card className="w-full max-w-md border-teal-800/20 bg-card text-card-foreground shadow-xl">
        <CardHeader className="space-y-2 text-center pb-6 border-b border-muted">
          <div className="flex justify-center mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-600/10 text-teal-600 border border-teal-500/20 shadow-[0_0_15px_rgba(13,148,136,0.1)]">
              <Building className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">College Admin Portal</CardTitle>
          <CardDescription>
            Academic reports & student tracking interface
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
                    <FormLabel>College Administrator Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="collegeadmin@m2i.com"
                        className="focus-visible:ring-teal-500/30"
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
                    <FormLabel>Academic Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="focus-visible:ring-teal-500/30"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-11 bg-teal-650 hover:bg-teal-700 text-white transition-colors" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Opening Academic Session...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </Form>

          <div className="rounded-lg bg-teal-50/50 border border-teal-100 p-4 space-y-2 dark:bg-slate-900/60 dark:border-slate-800">
            <p className="text-xs font-semibold text-teal-650 uppercase tracking-widest">
              Required Credentials:
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="font-semibold text-teal-800 dark:text-slate-350">Email:</span> collegeadmin@m2i.com</p>
              <p><span className="font-semibold text-teal-800 dark:text-slate-350">Password:</span> College@123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
