"use client";

import { useState } from "react";
import { Plus, Search, Edit2, ToggleLeft, ToggleRight, Building2, UserPlus, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
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
import Link from "next/link";

const collegeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  code: z.string().min(2, "Code is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  address: z.string().min(5, "Address is required"),
  departments: z.string().optional(),
  status: z.boolean().default(true),
  logo: z.any().optional(),
});

type CollegeFormValues = z.infer<typeof collegeSchema>;

interface College {
  id: string;
  name: string;
  code: string;
  email: string;
  admin: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

const mockColleges: College[] = [
  {
    id: "1",
    name: "Tech University",
    code: "TU001",
    email: "admin@tu.edu",
    admin: "John Doe",
    status: "ACTIVE",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Science Institute",
    code: "SI002",
    email: "admin@si.edu",
    admin: "Jane Smith",
    status: "ACTIVE",
    createdAt: "2024-02-20",
  },
];

export default function CollegesPage() {
  const [search, setSearch] = useState("");
  const [colleges, setColleges] = useState<College[]>(mockColleges);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const form = useForm<CollegeFormValues>({
    resolver: zodResolver(collegeSchema),
    defaultValues: {
      name: "",
      code: "",
      email: "",
      phone: "",
      address: "",
      departments: "",
      status: true,
    },
  });

  const onSubmit = (data: CollegeFormValues) => {
    setColleges([...colleges, {
      id: Date.now().toString(),
      name: data.name,
      code: data.code,
      email: data.email,
      admin: "Not Assigned",
      status: data.status ? "ACTIVE" : "INACTIVE",
      createdAt: new Date().toISOString().split('T')[0],
    }]);
    setIsCreateOpen(false);
    form.reset();
  };

  const filteredColleges = colleges.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">College Management</h1>
          <p className="text-muted-foreground">
            Onboard new colleges and manage existing institutions
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Onboard College
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Onboard New College</DialogTitle>
              <DialogDescription>
                Enter college details to start the onboarding process.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter college name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>College Code</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., TU001" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contact@college.edu" {...field} />
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter college address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="departments"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Departments / Courses</FormLabel>
                        <FormControl>
                          <Input placeholder="Engineering, Science, etc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Logo Upload</FormLabel>
                        <FormControl>
                          <Input type="file" accept="image/*" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Initial Status</FormLabel>
                        <div className="text-sm text-muted-foreground">
                          Activate college immediately upon creation
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
                  <Button type="submit">Onboard College</Button>
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
                placeholder="Search by name or code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>College Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Assigned Admin</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredColleges.map((college) => (
                <TableRow key={college.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      {college.name}
                    </div>
                  </TableCell>
                  <TableCell>{college.code}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        college.status === "ACTIVE" ? "success" : "destructive"
                      }
                    >
                      {college.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{college.createdAt}</TableCell>
                  <TableCell>
                    {college.admin === "Not Assigned" ? (
                      <span className="text-muted-foreground italic text-xs">{college.admin}</span>
                    ) : (
                      <Badge variant="outline">{college.admin}</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit College">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Toggle Status">
                        {college.status === "ACTIVE" ? (
                          <ToggleLeft className="h-4 w-4 text-green-500" />
                        ) : (
                          <ToggleRight className="h-4 w-4 text-red-500" />
                        )}
                      </Button>
                      <Link href={`/super-admin/college-admins?collegeId=${college.id}&collegeName=${college.name}`}>
                        <Button variant="ghost" size="icon" title="Create College Admin">
                          <UserPlus className="h-4 w-4 text-primary" />
                        </Button>
                      </Link>
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
