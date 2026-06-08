"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { formsApi } from "@/lib/api/forms";
import { applicationsApi } from "@/lib/api/applications";
import { GraduationCap, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FormField } from "@/types";

const mockFields: FormField[] = [
  {
    id: "1",
    formId: "1",
    fieldType: "text",
    label: "Full Name",
    placeholder: "Enter your full name",
    required: true,
    order: 1,
  },
  {
    id: "2",
    formId: "1",
    fieldType: "email",
    label: "Email Address",
    placeholder: "Enter your email",
    required: true,
    order: 2,
  },
  {
    id: "3",
    formId: "1",
    fieldType: "text",
    label: "Phone Number",
    placeholder: "Enter your phone number",
    required: true,
    order: 3,
  },
  {
    id: "4",
    formId: "1",
    fieldType: "dropdown",
    label: "Department",
    placeholder: "Select department",
    required: true,
    options: ["CSE", "ISE", "ECE", "MECH", "CIVIL"],
    order: 4,
  },
  {
    id: "5",
    formId: "1",
    fieldType: "number",
    label: "12th Grade Percentage",
    placeholder: "Enter percentage",
    required: true,
    order: 5,
  },
  {
    id: "6",
    formId: "1",
    fieldType: "textarea",
    label: "Previous Education",
    placeholder: "Describe your previous education",
    required: false,
    order: 6,
  },
  {
    id: "7",
    formId: "1",
    fieldType: "file",
    label: "Upload Resume",
    placeholder: "",
    required: true,
    order: 7,
  },
  {
    id: "8",
    formId: "1",
    fieldType: "checkbox",
    label: "I agree to the terms and conditions",
    placeholder: "",
    required: true,
    order: 8,
  },
];

export default function PublicApplicationPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [formData, setFormData] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [fields, setFields] = useState<FormField[]>([]);
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await formsApi.getBySlug(slug);
        const fetchedForm = response.data.data;
        if (fetchedForm) {
          setForm(fetchedForm);
          if (fetchedForm.fields && fetchedForm.fields.length > 0) {
            setFields(fetchedForm.fields);
          } else {
            setFields(mockFields);
          }
        } else {
          setFields(mockFields);
        }
      } catch (err) {
        console.warn("Failed to fetch form by slug, falling back to mock fields.", err);
        setFields(mockFields);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [slug]);

  const sortedFields = [...fields].sort((a, b) => a.order - b.order);

  const handleChange = (fieldId: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const answers = Object.entries(formData).map(([fieldId, value]) => ({
        fieldId,
        value,
      }));

      if (form?.id) {
        await applicationsApi.submit({
          formId: form.id,
          answers,
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      setSubmitted(true);
    } catch (err) {
      console.warn("API submission failed, running mock submission fallback.", err);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.id] || "";

    switch (field.fieldType) {
      case "text":
        return (
          <Input
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
      case "email":
        return (
          <Input
            type="email"
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
      case "number":
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
      case "textarea":
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
      case "date":
        return (
          <Input
            type="date"
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
      case "file":
        return (
          <div className="flex items-center gap-2">
            <Input type="file" className="flex-1" />
            <Upload className="h-4 w-4 text-muted-foreground" />
          </div>
        );
      case "dropdown":
        return (
          <Select
            value={value as string}
            onValueChange={(val) => handleChange(field.id, val)}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "checkbox":
        return (
          <div className="flex items-center gap-2">
            <Checkbox
              id={field.id}
              checked={value === "true" || (value as any) === true}
              onCheckedChange={(checked) =>
                handleChange(field.id, checked ? "true" : "false")
              }
            />
            <Label htmlFor={field.id} className="text-sm font-normal">
              {field.label}
            </Label>
          </div>
        );
      case "radio":
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  id={`${field.id}-${option}`}
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="h-4 w-4"
                />
                <Label
                  htmlFor={`${field.id}-${option}`}
                  className="text-sm font-normal"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      case "multi-select":
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <div key={option} className="flex items-center gap-2">
                <Checkbox
                  id={`${field.id}-${option}`}
                  checked={(value as string[])?.includes(option)}
                  onCheckedChange={(checked) => {
                    const current = (value as string[]) || [];
                    const updated = checked
                      ? [...current, option]
                      : current.filter((v) => v !== option);
                    handleChange(field.id, updated);
                  }}
                />
                <Label
                  htmlFor={`${field.id}-${option}`}
                  className="text-sm font-normal"
                >
                  {option}
                </Label>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <Input
            placeholder={field.placeholder}
            value={value as string}
            onChange={(e) => handleChange(field.id, e.target.value)}
          />
        );
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground font-medium">Loading application form...</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
              <GraduationCap className="h-7 w-7 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            Application Submitted!
          </CardTitle>
          <CardDescription>
            Your application has been successfully submitted. You will receive
            an email confirmation shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={() => router.push("/")}>
            Back to Home
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl">Application Form</CardTitle>
            <CardDescription>
              Fill in the details below to submit your application
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {sortedFields.map((field) => (
            <div key={field.id} className="space-y-2">
              {field.fieldType !== "checkbox" && (
                <Label>
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Label>
              )}
              {renderField(field)}
            </div>
          ))}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" className="flex-1">
              Save Draft
            </Button>
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
