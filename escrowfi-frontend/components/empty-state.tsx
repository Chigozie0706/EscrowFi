"use client";

import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
        <CardContent className="p-12 text-center">
          <div className="w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-6">
            <Icon className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
          {actionLabel && onAction && (
            <Button onClick={onAction} className="bg-[#7C3AED] hover:bg-[#6D31D4]">
              {actionLabel}
            </Button>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
