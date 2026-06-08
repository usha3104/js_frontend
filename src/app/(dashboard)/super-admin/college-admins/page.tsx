"use client";



import { useState, Suspense } from "react";
import { Plus, Search, Edit2, ToggleLeft, ToggleRight, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const adminSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone is required"),
  role: z.string().default("COLLEGE_ADMIN"),
  assignedCollege: z.string().min(1, "College is required"),
  status: z.boolean().default(true),
});

type AdminFormValues = z.infer<typeof adminSchema>;

interface Admin {
  id: string;
  fullName: string;
  email: string;
  role: string;
  assignedCollege: string;
  status: "ACTIVE" | "INACTIVE";
}

const mockAdmins: Admin[] = [
  {
    id: "1",
    fullName: "John Doe",
    email: "john@tech.edu",
    role: "COLLEGE_ADMIN",
    assignedCollege: "Tech University",
    status: "ACTIVE",
  },
];

function CollegeAdminsContent() {
  const searchParams = useSearchParams();
  const collegeId = searchParams.get("collegeId");
  const collegeName = searchParams.get("collegeName");

  const [search, setSearch] = useState("");
  const [admins, setAdmins] = useState<Admin[]>(mockAdmins);
  const [isCreateOpen, setIsCreateOpen] = useState(!!collegeId);

  const form = useForm<AdminFormValues>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      role: "COLLEGE_ADMIN",
      assignedCollege: collegeName || "",
      status: true,
    },
  });

  const onSubmit = (data: AdminFormValues) => {
    setAdmins([...admins, {
      id: Date.now().toString(),
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      assignedCollege: data.assignedCollege,
      status: data.status ? "ACTIVE" : "INACTIVE",
    }]);
    setIsCreateOpen(false);
    form.reset();
  };

  const filteredAdmins = admins.filter(
    (a) =>
      a.fullName.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">College Admins</h1>
          <p className="text-muted-foreground">
            Manage administrative access for onboarded colleges
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Admin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create College Admin</DialogTitle>
              <DialogDescription>
                Assign an administrator to a college and manage their credentials.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="+1234567890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="assignedCollege"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assigned College</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a college" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Tech University">Tech University</SelectItem>
                          <SelectItem value="Science Institute">Science Institute</SelectItem>
                          {collegeName && !["Tech University", "Science Institute"].includes(collegeName) && (
                            <SelectItem value={collegeName}>{collegeName}</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Status</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Toggle administrator active status
                        </div>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Admin</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search admins..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Assigned College</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      {admin.fullName}
                    </div>
                  </TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{admin.assignedCollege}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        admin.status === "ACTIVE" ? "success" : "destructive"
                      }
                    >
                      {admin.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        {admin.status === "ACTIVE" ? (
                          <ToggleLeft className="h-4 w-4 text-green-500" />
                        ) : (
                          <ToggleRight className="h-4 w-4 text-red-500" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CollegeAdminsPage() {
  return (
    <Suspense fallback={<div>Loading admins...</div>}>
      <CollegeAdminsContent />
    </Suspense>
  );
}
