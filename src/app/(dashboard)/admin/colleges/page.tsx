"use client";

import { useState } from "react";
import { Plus, Search, Edit2, ToggleLeft, ToggleRight, Building2, Eye, X } from "lucide-react";
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
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

interface College {
  id: string;
  name: string;
  code: string;
  email: string;
  phone: string;
  address: string;
  departments: string;
  totalBatches: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

const mockColleges: College[] = [
  {
    id: "1",
    name: "Tech University",
    code: "TU001",
    email: "admin@tu.edu",
    phone: "+91 98765 43210",
    address: "123 University Road, Science City",
    departments: "Computer Science, Electrical, Electronics",
    totalBatches: 6,
    status: "ACTIVE",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Science Institute",
    code: "SI002",
    email: "admin@si.edu",
    phone: "+91 98765 43211",
    address: "456 Research Blvd, Biotech Park",
    departments: "Information Technology, Bio-Tech, Mechanical",
    totalBatches: 4,
    status: "ACTIVE",
    createdAt: "2024-02-20",
  },
  {
    id: "3",
    name: "Global Tech College",
    code: "GTC03",
    email: "contact@gtc.edu",
    phone: "+91 98765 43212",
    address: "789 Corporate Way, Innovation Hub",
    departments: "Computer Science, AI & ML, Cyber Security",
    totalBatches: 8,
    status: "ACTIVE",
    createdAt: "2024-03-05",
  },
];

export default function CollegesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [colleges, setColleges] = useState<College[]>(mockColleges);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formCode, setFormCode] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formDepartments, setFormDepartments] = useState("");
  const [formStatus, setFormStatus] = useState(true);

  const resetForm = () => {
    setFormName("");
    setFormCode("");
    setFormEmail("");
    setFormPhone("");
    setFormAddress("");
    setFormDepartments("");
    setFormStatus(true);
  };

  const handleCreateOpen = () => {
    resetForm();
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formCode || !formEmail) return;

    const newCollege: College = {
      id: Date.now().toString(),
      name: formName,
      code: formCode.toUpperCase(),
      email: formEmail,
      phone: formPhone || "N/A",
      address: formAddress || "N/A",
      departments: formDepartments || "General",
      totalBatches: 0,
      status: formStatus ? "ACTIVE" : "INACTIVE",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setColleges([newCollege, ...colleges]);
    setIsCreateOpen(false);
    resetForm();
  };

  const handleEditOpen = (college: College) => {
    setSelectedCollege(college);
    setFormName(college.name);
    setFormCode(college.code);
    setFormEmail(college.email);
    setFormPhone(college.phone);
    setFormAddress(college.address);
    setFormDepartments(college.departments);
    setFormStatus(college.status === "ACTIVE");
    setIsEditOpen(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCollege || !formName || !formCode || !formEmail) return;

    setColleges(
      colleges.map((c) =>
        c.id === selectedCollege.id
          ? {
              ...c,
              name: formName,
              code: formCode.toUpperCase(),
              email: formEmail,
              phone: formPhone,
              address: formAddress,
              departments: formDepartments,
              status: formStatus ? "ACTIVE" : "INACTIVE",
            }
          : c
      )
    );
    setIsEditOpen(false);
    setSelectedCollege(null);
    resetForm();
  };

  const handleViewOpen = (college: College) => {
    setSelectedCollege(college);
    setIsViewOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setColleges(
      colleges.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" }
          : c
      )
    );
  };

  const filteredColleges = colleges.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && c.status === "ACTIVE") ||
      (statusFilter === "inactive" && c.status === "INACTIVE");
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Colleges</h1>
          <p className="text-muted-foreground">
            Onboard new colleges and manage active institutions.
          </p>
        </div>
        <Button onClick={handleCreateOpen}>
          <Plus className="mr-2 h-4 w-4" />
          Onboard College
        </Button>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>College Name</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Total Batches</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredColleges.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center h-24 text-muted-foreground">
                      No colleges found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredColleges.map((college) => (
                    <TableRow key={college.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-indigo-600" />
                          {college.name}
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs">{college.code}</TableCell>
                      <TableCell>{college.email}</TableCell>
                      <TableCell>{college.totalBatches}</TableCell>
                      <TableCell>
                        <Badge variant={college.status === "ACTIVE" ? "success" : "destructive"}>
                          {college.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleViewOpen(college)} title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEditOpen(college)} title="Edit College">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleToggleStatus(college.id)}
                            title={college.status === "ACTIVE" ? "Deactivate" : "Activate"}
                          >
                            {college.status === "ACTIVE" ? (
                              <ToggleLeft className="h-4 w-4 text-green-500" />
                            ) : (
                              <ToggleRight className="h-4 w-4 text-slate-400" />
                            )}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* CREATE MODAL */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Onboard New College</DialogTitle>
            <DialogDescription>
              Enter the institution&apos;s information to onboard them onto the platform.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="name">College Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Stanford College"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="code">College Code *</Label>
                <Input
                  id="code"
                  placeholder="e.g. SC001"
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@college.edu"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  placeholder="+91 XXXXX XXXXX"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Street address, City, ZIP"
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="departments">Departments (Comma separated)</Label>
              <Input
                id="departments"
                placeholder="Computer Science, IT, Electronics"
                value={formDepartments}
                onChange={(e) => setFormDepartments(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Activate immediately</Label>
                <p className="text-xs text-muted-foreground">College will be set to Active right after creation.</p>
              </div>
              <Switch checked={formStatus} onCheckedChange={setFormStatus} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Onboard College</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT MODAL */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit College Details</DialogTitle>
            <DialogDescription>
              Update information for {selectedCollege?.name}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="edit-name">College Name *</Label>
                <Input
                  id="edit-name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-code">College Code *</Label>
                <Input
                  id="edit-code"
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-email">Email *</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-address">Address</Label>
              <Textarea
                id="edit-address"
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="edit-departments">Departments</Label>
              <Input
                id="edit-departments"
                value={formDepartments}
                onChange={(e) => setFormDepartments(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between border rounded-lg p-3">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Status Active</Label>
                <p className="text-xs text-muted-foreground">Manage active status of this college.</p>
              </div>
              <Switch checked={formStatus} onCheckedChange={setFormStatus} />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* VIEW DETAILS MODAL */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-600" />
              {selectedCollege?.name} Details
            </DialogTitle>
          </DialogHeader>
          {selectedCollege && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <Label className="text-xs text-muted-foreground">College Code</Label>
                  <p className="font-semibold">{selectedCollege.code}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Status</Label>
                  <div>
                    <Badge variant={selectedCollege.status === "ACTIVE" ? "success" : "destructive"}>
                      {selectedCollege.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Official Email</Label>
                  <p className="font-semibold">{selectedCollege.email}</p>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Contact Phone</Label>
                  <p className="font-semibold">{selectedCollege.phone}</p>
                </div>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Full Address</Label>
                <p className="text-sm font-medium bg-slate-50 p-2.5 rounded-lg border">
                  {selectedCollege.address}
                </p>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground">Offered Departments / Specializations</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedCollege.departments.split(",").map((dept, index) => (
                    <Badge key={index} variant="outline" className="bg-indigo-50/50">
                      {dept.trim()}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Active Cohort Batches ({selectedCollege.totalBatches})</Label>
                <div className="space-y-1">
                  {selectedCollege.id === "1" ? (
                    <>
                      <div className="flex justify-between text-xs border p-2 rounded bg-slate-50">
                        <span className="font-medium">Full Stack Web Dev - Cohort 1</span>
                        <Badge variant="success">Active</Badge>
                      </div>
                      <div className="flex justify-between text-xs border p-2 rounded bg-slate-50">
                        <span className="font-medium">Data Science Advanced - Cohort 3</span>
                        <Badge variant="warning">Under Evaluation</Badge>
                      </div>
                    </>
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No batches displayed for this simulation.</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button onClick={() => setIsViewOpen(false)}>Close Window</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
