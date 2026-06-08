"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, Loader2, ShieldAlert } from "lucide-react";
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

export default function SuperAdminLoginPage() {
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

      if (email === "superadmin@m2i.com" && password === "Super@123") {
        const mockUser = {
          id: "mock-super-admin-1",
          email: "superadmin@m2i.com",
          name: "Super Admin User",
          role: "SUPER_ADMIN" as const,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        login(mockUser, "mock-super-admin-jwt-token");
        router.push("/super-admin");
      } else {
        setError("Invalid Super Admin credentials.");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <Card className="w-full max-w-md border-slate-800 bg-slate-900/50 backdrop-blur-xl text-slate-100 shadow-2xl">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
              <ShieldAlert className="h-7 w-7" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white">Super Admin Portal</CardTitle>
          <CardDescription className="text-slate-400">
            System administration & infrastructure control
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
                    <FormLabel className="text-slate-300">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="superadmin@m2i.com"
                        className="bg-slate-950/50 border-slate-800 focus-visible:ring-red-500/30 text-white placeholder-slate-600"
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
                    <FormLabel className="text-slate-300">Master Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="bg-slate-950/50 border-slate-800 focus-visible:ring-red-500/30 text-white placeholder-slate-600"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-11 bg-red-600 hover:bg-red-700 text-white transition-colors" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authorizing Master Session...
                  </>
                ) : (
                  "Authenticate"
                )}
              </Button>
            </form>
          </Form>

          <div className="rounded-lg bg-slate-950/40 border border-slate-800/80 p-4 space-y-2">
            <p className="text-xs font-semibold text-red-400/80 uppercase tracking-widest">
              Required Credentials:
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <p><span className="font-semibold text-slate-300">Email:</span> superadmin@m2i.com</p>
              <p><span className="font-semibold text-slate-300">Password:</span> Super@123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
