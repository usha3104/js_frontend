"use client";

import { Award, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Certificate {
  id: string;
  courseTitle: string;
  issuedAt: string;
  certificateUrl?: string;
}

const mockCertificates: Certificate[] = [
  {
    id: "1",
    courseTitle: "Web Development Fundamentals",
    issuedAt: "2024-12-01",
    certificateUrl: "#",
  },
];

export default function CertificatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Certificates</h1>
        <p className="text-muted-foreground">
          View and download your earned certificates
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockCertificates.map((cert) => (
          <Card key={cert.id}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">{cert.courseTitle}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Issued: {cert.issuedAt}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download Certificate
              </Button>
            </CardContent>
          </Card>
        ))}
        {mockCertificates.length === 0 && (
          <Card className="col-span-full">
            <CardContent className="py-12 text-center">
              <Award className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                No certificates earned yet. Complete courses to earn certificates.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
