"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Github, Globe, ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";

export function SubmitWork() {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    description: "",
    githubUrl: "",
    demoUrl: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Work submitted successfully!", {
      description: "The client will review your submission."
    });
    setTimeout(() => {
      router.push(`/dashboard/escrow/${id}`);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link href={`/dashboard/escrow/${id}`}>
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Escrow
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-2">Submit Work</h1>
        <p className="text-muted-foreground">Upload your completed work for client review</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Proof of Work</CardTitle>
            <CardDescription>
              Provide all deliverables and documentation for the client to review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what you've completed and any important details the client should know..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="bg-input-background border-border/40 min-h-32 resize-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="files">Upload Files</Label>
                <div className="border-2 border-dashed border-border/40 rounded-xl p-8 text-center hover:border-[#7C3AED]/50 transition-colors cursor-pointer group">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center group-hover:bg-[#7C3AED]/20 transition-colors">
                      <Upload className="w-8 h-8 text-[#7C3AED]" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Click to upload or drag and drop</p>
                      <p className="text-sm text-muted-foreground">
                        PDF, ZIP, or any file type (Max 50MB)
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    id="files"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Repository (Optional)</Label>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="github"
                      type="url"
                      placeholder="https://github.com/..."
                      value={formData.githubUrl}
                      onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      className="bg-input-background border-border/40 pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="demo">Live Demo URL (Optional)</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="demo"
                      type="url"
                      placeholder="https://..."
                      value={formData.demoUrl}
                      onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                      className="bg-input-background border-border/40 pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional information, instructions, or comments for the client..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-input-background border-border/40 min-h-24 resize-none"
                />
              </div>

              <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex gap-3">
                  <FileText className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold mb-1 text-yellow-500">Important</p>
                    <p className="text-muted-foreground">
                      Once you submit your work, the client will be notified to review. Make sure all files and links are correct before submitting.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push(`/dashboard/escrow/${id}`)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#7C3AED] hover:bg-[#6D31D4]"
                >
                  Submit Work
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default SubmitWork;
