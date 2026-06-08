"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  GripVertical,
  Eye,
  Save,
  Send,
  Type,
  List,
  CheckSquare,
  Circle,
  Calendar,
  Hash,
  Mail,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateSlug } from "@/lib/utils";

type FieldType =
  | "text"
  | "textarea"
  | "dropdown"
  | "checkbox"
  | "radio"
  | "multi-select"
  | "file"
  | "date"
  | "number"
  | "email";

interface FormField {
  id: string;
  fieldType: FieldType;
  label: string;
  placeholder: string;
  required: boolean;
  options: string;
  order: number;
}

const fieldIcons: Record<FieldType, React.ComponentType<{ className?: string }>> = {
  text: Type,
  textarea: List,
  dropdown: List,
  checkbox: CheckSquare,
  radio: Circle,
  "multi-select": CheckSquare,
  file: Upload,
  date: Calendar,
  number: Hash,
  email: Mail,
};

export default function FormsPage() {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formStatus, setFormStatus] = useState<"DRAFT" | "PUBLISHED" | "CLOSED">("DRAFT");
  const [fields, setFields] = useState<FormField[]>([]);
  const [activeTab, setActiveTab] = useState("builder");

  const addField = (type: FieldType) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      fieldType: type,
      label: "",
      placeholder: "",
      required: false,
      options: "",
      order: fields.length + 1,
    };
    setFields([...fields, newField]);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const removeField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const needsOptions = (type: FieldType) =>
    ["dropdown", "radio", "multi-select"].includes(type);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Form Builder</h1>
          <p className="text-muted-foreground">
            Create and manage dynamic registration forms
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="title">Form Title</Label>
              <Input
                id="title"
                placeholder="e.g., B.Tech Admission 2025"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                value={generateSlug(formTitle)}
                readOnly
                className="bg-muted"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formStatus}
                onValueChange={(v) =>
                  setFormStatus(v as "DRAFT" | "PUBLISHED" | "CLOSED")
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="CLOSED">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the purpose of this form..."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
            />
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="builder">Form Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Add Fields</CardTitle>
                <CardDescription>Click to add a field type</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2">
                {(
                  [
                    "text",
                    "textarea",
                    "dropdown",
                    "checkbox",
                    "radio",
                    "multi-select",
                    "file",
                    "date",
                    "number",
                    "email",
                  ] as FieldType[]
                ).map((type) => {
                  const Icon = fieldIcons[type];
                  return (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      className="justify-start"
                      onClick={() => addField(type)}
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {type}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="md:col-span-3">
              <CardHeader className="py-3">
                <CardTitle className="text-sm">
                  Form Fields ({fields.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {fields.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No fields added yet. Click a field type to begin.
                  </p>
                )}
                {fields.map((field, index) => {
                  const Icon = fieldIcons[field.fieldType];
                  return (
                    <div
                      key={field.id}
                      className="rounded-lg border p-4 space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                        <Badge variant="outline" className="gap-1">
                          <Icon className="h-3 w-3" />
                          {field.fieldType}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          #{index + 1}
                        </span>
                        <div className="flex-1" />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeField(field.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>

                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Label</Label>
                          <Input
                            placeholder="Field label"
                            value={field.label}
                            onChange={(e) =>
                              updateField(field.id, { label: e.target.value })
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Placeholder</Label>
                          <Input
                            placeholder="Placeholder text"
                            value={field.placeholder}
                            onChange={(e) =>
                              updateField(field.id, {
                                placeholder: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      {needsOptions(field.fieldType) && (
                        <div className="space-y-2">
                          <Label>Options (comma separated)</Label>
                          <Input
                            placeholder="Option 1, Option 2, Option 3"
                            value={field.options}
                            onChange={(e) =>
                              updateField(field.id, { options: e.target.value })
                            }
                          />
                        </div>
                      )}

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Checkbox
                            id={`required-${field.id}`}
                            checked={field.required}
                            onCheckedChange={(checked) =>
                              updateField(field.id, {
                                required: checked as boolean,
                              })
                            }
                          />
                          <Label
                            htmlFor={`required-${field.id}`}
                            className="text-sm"
                          >
                            Required
                          </Label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>{formTitle || "Untitled Form"}</CardTitle>
              <CardDescription>
                {formDescription || "No description"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {fields.map((field, index) => (
                <div key={field.id} className="space-y-2">
                  <Label>
                    {field.label || `Field ${index + 1}`}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {field.fieldType === "text" && (
                    <Input placeholder={field.placeholder} />
                  )}
                  {field.fieldType === "textarea" && (
                    <Textarea placeholder={field.placeholder} />
                  )}
                  {field.fieldType === "email" && (
                    <Input type="email" placeholder={field.placeholder} />
                  )}
                  {field.fieldType === "number" && (
                    <Input type="number" placeholder={field.placeholder} />
                  )}
                  {field.fieldType === "date" && <Input type="date" />}
                  {field.fieldType === "file" && <Input type="file" />}
                  {field.fieldType === "dropdown" && (
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder || "Select an option"} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options.split(",").map((opt, i) => (
                          <SelectItem key={i} value={opt.trim()}>
                            {opt.trim()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {field.fieldType === "checkbox" && (
                    <div className="flex items-center gap-2">
                      <Checkbox id={`preview-${field.id}`} />
                      <Label htmlFor={`preview-${field.id}`}>
                        {field.placeholder || "Check this box"}
                      </Label>
                    </div>
                  )}
                  {field.fieldType === "radio" && (
                    <div className="space-y-2">
                      {field.options.split(",").map((opt, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="h-4 w-4 rounded-full border" />
                          <span className="text-sm">{opt.trim()}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {fields.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No fields to preview. Add fields in the builder tab.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
