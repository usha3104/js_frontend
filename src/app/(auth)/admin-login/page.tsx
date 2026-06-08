"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Loader2, UserCheck } from "lucide-react";
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

export default function AdminLoginPage() {
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

      if (email === "admin@m2i.com" && password === "Admin@123") {
        const mockUser = {
          id: "mock-admin-1",
          email: "admin@m2i.com",
          name: "M2I Admin User",
          role: "M2I_ADMIN" as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        login(mockUser, "mock-admin-jwt-token");
        router.push("/admin/dashboard");
      } else {
        setError("Invalid Admin credentials.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />

      <Card className="w-full max-w-md border-slate-800 bg-slate-950 text-slate-100 shadow-xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
              <UserCheck className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">NetPy Admin Portal</CardTitle>
          <CardDescription className="text-slate-400">
            LMS Representative & operations panel
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-red-950/40 border border-red-900/50 p-3 text-sm text-red-400 font-medium">
                  {error}
                </div>
              )}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Admin Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="admin@m2i.com"
                        className="bg-slate-900 border-slate-850 focus-visible:ring-blue-500/30 text-white placeholder-slate-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Security Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="bg-slate-900 border-slate-850 focus-visible:ring-blue-500/30 text-white placeholder-slate-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white transition-colors" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting Securely...
                  </>
                ) : (
                  "Log In as Admin"
                )}
              </Button>
            </form>
          </Form>

          <div className="rounded-lg bg-slate-900/60 border border-slate-800 p-4 space-y-2">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-widest">
              Required Credentials:
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p><span className="font-semibold text-slate-300">Email:</span> admin@m2i.com</p>
              <p><span className="font-semibold text-slate-300">Password:</span> Admin@123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
