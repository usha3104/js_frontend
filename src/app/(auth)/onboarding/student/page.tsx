"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { authApi } from "@/lib/api/auth";

// Zod Schema for validation
const onboardingSchema = z.object({
  // Step 1: Type
  studentType: z.enum(["COLLEGE", "DIRECT"], { required_error: "Please select a student type" }),
  
  // Step 2: Personal
  fullName: z.string().min(2, "Name is required"),
  gender: z.enum(["MALE", "FEMALE", "OTHER"], { required_error: "Select gender" }),
  dob: z.string().min(1, "Date of birth is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Valid mobile required"),
  altMobile: z.string().optional(),

  // Step 3: Academic
  collegeName: z.string().optional(),
  department: z.string().optional(),
  semester: z.string().optional(),
  studentId: z.string().optional(),
  highestQualification: z.string().optional(),
  passoutYear: z.string().optional(),

  // Step 4: Course
  courseId: z.string().min(1, "Course selection is required"),
  programId: z.string().min(1, "Program is required"),
  learningMode: z.enum(["ONLINE", "OFFLINE", "HYBRID"], { required_error: "Mode required" }),

  // Step 5: Skills
  skillLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"], { required_error: "Level required" }),
  interestedTech: z.array(z.string()).min(1, "Select at least one technology"),
  careerGoal: z.enum(["INTERNSHIP", "PLACEMENT", "SKILL_ENHANCEMENT", "CAREER_SWITCH"], { required_error: "Goal required" }),
  selfIntro: z.string().min(10, "Please provide a short intro"),

  // Step 6: Documents (Simplified as strings for file paths/names in mock)
  resumeFile: z.any().optional(),
  idCardFile: z.any().optional(),

  // Step 7: Account
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),

  // Step 8: Consent
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.studentType === "COLLEGE") {
    return !!data.collegeName && !!data.department;
  }
  return true;
}, {
  message: "College Name and Department are required for College Students",
  path: ["collegeName"],
});

type OnboardingFormValues = z.infer<typeof onboardingSchema>;

const STEPS = [
  "Student Type",
  "Personal Info",
  "Academic Info",
  "Course Selection",
  "Skills & Career",
  "Documents",
  "Account Setup",
  "Review",
];

export default function StudentOnboarding() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      studentType: "COLLEGE",
      interestedTech: [],
      agreeTerms: false,
    },
    mode: "onTouched",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get("type");
      if (typeParam === "college") {
        form.setValue("studentType", "COLLEGE");
      } else if (typeParam === "direct") {
        form.setValue("studentType", "DIRECT");
      }
    }
  }, [form]);

  const { register, handleSubmit, control, watch, formState: { errors, isValid }, trigger } = form;
  
  const studentType = watch("studentType");
  const interestedTech = watch("interestedTech");

  const nextStep = async () => {
    // Validate current step before proceeding
    let fieldsToValidate: any[] = [];
    
    switch(currentStep) {
      case 0: fieldsToValidate = ["studentType"]; break;
      case 1: fieldsToValidate = ["fullName", "gender", "dob", "email", "mobile"]; break;
      case 2: fieldsToValidate = studentType === "COLLEGE" 
                ? ["collegeName", "department", "semester", "studentId"]
                : ["highestQualification", "passoutYear"]; break;
      case 3: fieldsToValidate = ["courseId", "programId", "learningMode"]; break;
      case 4: fieldsToValidate = ["skillLevel", "interestedTech", "careerGoal", "selfIntro"]; break;
      case 6: fieldsToValidate = ["password", "confirmPassword"]; break;
    }

    if (fieldsToValidate.length > 0) {
      const isStepValid = await trigger(fieldsToValidate as any);
      if (!isStepValid) return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const onSubmit = async (data: OnboardingFormValues) => {
    setIsSubmitting(true);
    try {
      // Register the user in the auth system so they can log in
      // Submit onboarding data to registration handler
      await authApi.register({
        name: data.fullName,
        email: data.email,
        password: data.password,
      });
      // Redirect to login with success
      router.push("/login?registered=true");
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      console.error("Registration failed:", error);
      // Still redirect even if registration fails (e.g., user already exists)
      router.push("/login?registered=true");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTech = (tech: string) => {
    const current = interestedTech || [];
    if (current.includes(tech)) {
      form.setValue("interestedTech", current.filter(t => t !== tech), { shouldValidate: true });
    } else {
      form.setValue("interestedTech", [...current, tech], { shouldValidate: true });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Type Selection
        return (
          <div className="space-y-6">
            <Controller
              name="studentType"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <RadioGroupItem value="COLLEGE" id="college" className="peer sr-only" />
                    <Label
                      htmlFor="college"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <span className="text-lg font-semibold">College-Side Student</span>
                      <span className="text-sm text-muted-foreground mt-2 text-center">I am enrolling through my college/university partnership.</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="DIRECT" id="direct" className="peer sr-only" />
                    <Label
                      htmlFor="direct"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <span className="text-lg font-semibold">Direct Student</span>
                      <span className="text-sm text-muted-foreground mt-2 text-center">I am enrolling individually as an independent learner.</span>
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.studentType && <p className="text-sm text-red-500">{errors.studentType.message}</p>}
          </div>
        );

      case 1: // Personal Info
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name *</Label>
              <Input {...register("fullName")} placeholder="John Doe" />
              {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Email Address *</Label>
              <Input type="email" {...register("email")} placeholder="john@example.com" />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Gender *</Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Date of Birth *</Label>
              <Input type="date" {...register("dob")} />
              {errors.dob && <p className="text-sm text-red-500">{errors.dob.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Mobile Number *</Label>
              <Input {...register("mobile")} placeholder="+91 9876543210" />
              {errors.mobile && <p className="text-sm text-red-500">{errors.mobile.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Alternate Mobile</Label>
              <Input {...register("altMobile")} placeholder="Optional" />
            </div>
          </div>
        );

      case 2: // Academic Info
        return studentType === "COLLEGE" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label>College Name *</Label>
              <Controller
                name="collegeName"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your college" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MOCK_COLLEGE_1">M2I Institute of Technology</SelectItem>
                      <SelectItem value="MOCK_COLLEGE_2">Global Engineering College</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.collegeName && <p className="text-sm text-red-500">{errors.collegeName.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Department/Branch *</Label>
              <Input {...register("department")} placeholder="e.g. Computer Science" />
              {errors.department && <p className="text-sm text-red-500">{errors.department.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Year / Semester *</Label>
              <Input {...register("semester")} placeholder="e.g. 6th Semester" />
            </div>
            <div className="space-y-2">
              <Label>University Register No. *</Label>
              <Input {...register("studentId")} placeholder="e.g. REG123456" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Highest Qualification *</Label>
              <Input {...register("highestQualification")} placeholder="e.g. B.Tech" />
              {errors.highestQualification && <p className="text-sm text-red-500">{errors.highestQualification.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Graduation/Passout Year *</Label>
              <Input {...register("passoutYear")} placeholder="e.g. 2024" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>College Name (Optional)</Label>
              <Input {...register("collegeName")} placeholder="Where did you graduate from?" />
            </div>
          </div>
        );

      case 3: // Course Selection
        return (
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label>Select Course *</Label>
              <Controller
                name="courseId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="course_fullstack">Full Stack MERN Development</SelectItem>
                      <SelectItem value="course_data_sci">Applied Data Science & ML</SelectItem>
                      <SelectItem value="course_cloud">Cloud Computing & DevOps</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.courseId && <p className="text-sm text-red-500">{errors.courseId.message}</p>}
            </div>
            
            <div className="space-y-2">
              <Label>Select Program *</Label>
              <Controller
                name="programId"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a program type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prog_internship">6-Month Internship Program</SelectItem>
                      <SelectItem value="prog_bootcamp">12-Week Bootcamp</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred Learning Mode *</Label>
              <Controller
                name="learningMode"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ONLINE" id="mode-online" />
                      <Label htmlFor="mode-online">Online (Live Classes)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="OFFLINE" id="mode-offline" />
                      <Label htmlFor="mode-offline">Offline (In-Campus)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="HYBRID" id="mode-hybrid" />
                      <Label htmlFor="mode-hybrid">Hybrid (Mixed)</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.learningMode && <p className="text-sm text-red-500">{errors.learningMode.message}</p>}
            </div>
          </div>
        );

      case 4: // Skills & Career
        const techOptions = ["Python", "Java", "MERN", "AI/ML", "UI/UX", "Cloud", "DevOps", "Data Science"];
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Current Skill Level *</Label>
              <Controller
                name="skillLevel"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-3">
              <Label>Interested Technologies * (Select multiple)</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {techOptions.map((tech) => (
                  <div key={tech} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`tech-${tech}`} 
                      checked={interestedTech?.includes(tech)}
                      onCheckedChange={() => toggleTech(tech)}
                    />
                    <Label htmlFor={`tech-${tech}`} className="cursor-pointer">{tech}</Label>
                  </div>
                ))}
              </div>
              {errors.interestedTech && <p className="text-sm text-red-500">{errors.interestedTech.message}</p>}
            </div>

            <div className="space-y-2">
              <Label>Primary Career Goal *</Label>
              <Controller
                name="careerGoal"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select career goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INTERNSHIP">Secure an Internship</SelectItem>
                      <SelectItem value="PLACEMENT">Full-time Placement</SelectItem>
                      <SelectItem value="SKILL_ENHANCEMENT">Skill Enhancement</SelectItem>
                      <SelectItem value="CAREER_SWITCH">Career Switch</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label>Short Self Introduction / Goals *</Label>
              <Textarea {...register("selfIntro")} placeholder="Tell us a bit about yourself and what you hope to achieve..." rows={3} />
              {errors.selfIntro && <p className="text-sm text-red-500">{errors.selfIntro.message}</p>}
            </div>
          </div>
        );

      case 5: // Documents
        return (
          <div className="space-y-6">
            <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center hover:bg-muted/50 transition-colors">
              <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">Upload Resume / CV *</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">PDF, DOCX up to 5MB</p>
              <Input type="file" className="max-w-xs mx-auto" accept=".pdf,.doc,.docx" />
            </div>

            {studentType === "COLLEGE" && (
              <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center hover:bg-muted/50 transition-colors">
                <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">Upload College ID Card *</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">JPG, PNG, PDF up to 2MB</p>
                <Input type="file" className="max-w-xs mx-auto" accept="image/*,.pdf" />
              </div>
            )}
            <p className="text-xs text-muted-foreground text-center">Note: File uploads are simulated in this demo.</p>
          </div>
        );

      case 6: // Account Setup
        return (
          <div className="space-y-4 max-w-md mx-auto">
            <div className="space-y-2">
              <Label>Password *</Label>
              <Input type="password" {...register("password")} placeholder="Create a strong password" />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <Label>Confirm Password *</Label>
              <Input type="password" {...register("confirmPassword")} placeholder="Confirm password" />
              {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>
        );

      case 7: // Review & Submit
        const formData = watch();
        return (
          <div className="space-y-6 text-sm">
            <div className="rounded-lg border p-4 space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Summary</h3>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-muted-foreground">Type:</div>
                <div className="font-medium">{formData.studentType}</div>
                
                <div className="text-muted-foreground">Name:</div>
                <div className="font-medium">{formData.fullName}</div>
                
                <div className="text-muted-foreground">Email:</div>
                <div className="font-medium">{formData.email}</div>
                
                <div className="text-muted-foreground">Course:</div>
                <div className="font-medium">{formData.courseId}</div>
              </div>
            </div>

            <div className="flex items-start space-x-3 bg-muted/50 p-4 rounded-lg">
              <Controller
                name="agreeTerms"
                control={control}
                render={({ field }) => (
                  <Checkbox 
                    id="terms" 
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="mt-1"
                  />
                )}
              />
              <div className="space-y-1">
                <Label htmlFor="terms" className="font-medium">Declaration & Consent *</Label>
                <p className="text-muted-foreground text-xs leading-snug">
                  I hereby declare that all the information provided is true. I consent to M2I LMS storing my data and tracking my academic progress for performance evaluation and mentor allocation.
                </p>
                {errors.agreeTerms && <p className="text-xs text-red-500 mt-1">{errors.agreeTerms.message}</p>}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="w-full max-w-3xl mb-8">
        <h1 className="text-3xl font-bold text-center text-stone-900 mb-2">Student Onboarding</h1>
        <p className="text-center text-stone-500">Join the M2I LMS Platform to kickstart your career journey.</p>
      </div>

      <Card className="w-full max-w-3xl shadow-lg border-stone-200">
        <CardHeader className="bg-stone-50/50 border-b">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-xl text-primary">Step {currentStep + 1}: {STEPS[currentStep]}</CardTitle>
            <span className="text-sm font-medium text-muted-foreground">{currentStep + 1} of {STEPS.length}</span>
          </div>
          {/* Simple Progress Bar */}
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-300 ease-in-out"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </CardHeader>
        
        <CardContent className="p-6 sm:p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="min-h-[300px]">
              {renderStepContent()}
            </div>

            <CardFooter className="px-0 pt-8 mt-8 border-t flex justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 0 || isSubmitting}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>
              
              {currentStep < STEPS.length - 1 ? (
                <Button type="button" onClick={nextStep}>
                  Continue <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
                  ) : (
                    <><CheckCircle2 className="w-4 h-4 mr-2" /> Complete Onboarding</>
                  )}
                </Button>
              )}
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
