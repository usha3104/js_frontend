"use client";

import { useState } from "react";
import { Plus, Search, Edit2, FileText, Globe, Lock, MoreVertical, Copy, Eye } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface RegistrationForm {
  id: string;
  title: string;
  college: string;
  status: "DRAFT" | "PUBLISHED" | "CLOSED";
  responses: number;
  lastUpdated: string;
  link?: string;
}

const mockForms: RegistrationForm[] = [
  {
    id: "1",
    title: "Summer Internship 2024",
    college: "Tech University",
    status: "PUBLISHED",
    responses: 452,
    lastUpdated: "2024-05-01",
    link: "https://m2i-lms.com/register/summer-2024",
  },
  {
    id: "2",
    title: "Graduate Onboarding",
    college: "Science Institute",
    status: "DRAFT",
    responses: 0,
    lastUpdated: "2024-05-05",
  },
];

export default function RegistrationFormsPage() {
  const [search, setSearch] = useState("");
  const [forms] = useState<RegistrationForm[]>(mockForms);

  const [isPublishOpen, setIsPublishOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<RegistrationForm | null>(null);

  const filteredForms = forms.filter(
    (f) =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.college.toLowerCase().includes(search.toLowerCase())
  );

  const handlePublishClick = (form: RegistrationForm) => {
    setSelectedForm(form);
    setIsPublishOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Registration Forms</h1>
          <p className="text-muted-foreground">
            Design and publish dynamic registration forms for colleges
          </p>
        </div>
        <Link href="/super-admin/registration-forms/builder">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create New Form
          </Button>
        </Link>
      </div>

      <Dialog open={isPublishOpen} onOpenChange={setIsPublishOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Registration Application</DialogTitle>
            <DialogDescription>
              Set the active duration and target college for &quot;{selectedForm?.title}&quot;
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Target College</label>
              <Select defaultValue={selectedForm?.college}>
                <SelectTrigger>
                  <SelectValue placeholder="Select college" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tech University">Tech University</SelectItem>
                  <SelectItem value="Science Institute">Science Institute</SelectItem>
                  <SelectItem value="Global Tech">Global Tech</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg bg-muted/30">
              <div className="space-y-0.5">
                <label className="text-sm font-bold">Public Access</label>
                <p className="text-xs text-muted-foreground">Make application link active immediately</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPublishOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsPublishOpen(false)}>Publish Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Forms</CardTitle>
            <Globe className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,480</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Drafts</CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search forms..."
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
                <TableHead>Form Title</TableHead>
                <TableHead>College</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responses</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredForms.map((form) => (
                <TableRow key={form.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      {form.title}
                    </div>
                  </TableCell>
                  <TableCell>{form.college}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        form.status === "PUBLISHED"
                          ? "success"
                          : form.status === "DRAFT"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {form.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{form.responses}</TableCell>
                  <TableCell>{form.lastUpdated}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {form.status === "PUBLISHED" && (
                        <Button variant="ghost" size="icon" title="Copy Link">
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                      <Link href={`/super-admin/registration-forms/builder?id=${form.id}`}>
                        <Button variant="ghost" size="icon" title="Edit Form">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> View Responses
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePublishClick(form)}>
                            <Globe className="mr-2 h-4 w-4" /> Publish Now
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Lock className="mr-2 h-4 w-4" /> Close Form
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
