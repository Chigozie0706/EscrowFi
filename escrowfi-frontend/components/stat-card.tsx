"use client";

import { Card, CardContent } from "./ui/card";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "motion/react";

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: LucideIcon;
  trend?: "up" | "down";
  color?: string;
  delay?: number;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend = "up", 
  color = "text-[#14F195]",
  delay = 0
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="border-border/40 bg-card/50 backdrop-blur-sm hover:border-[#7C3AED]/30 transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#9945FF]/20 flex items-center justify-center">
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            {change && (
              <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-[#14F195]' : 'text-red-500'}`}>
                {trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                {change}
              </div>
            )}
          </div>
          <div className="text-2xl font-bold mb-1">{value}</div>
          <div className="text-sm text-muted-foreground">{title}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
