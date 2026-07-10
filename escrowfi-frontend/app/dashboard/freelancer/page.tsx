"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Wallet, Clock, TrendingUp, Briefcase } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const stats = [
  { title: "Total Earnings", value: "124.5 SOL", icon: Wallet, color: "text-[#14F195]" },
  { title: "Active Jobs", value: "5", icon: Briefcase, color: "text-[#7C3AED]" },
  { title: "Completed", value: "48", icon: TrendingUp, color: "text-[#14F195]" },
  { title: "Avg. Time", value: "8 days", icon: Clock, color: "text-[#9945FF]" }
];

const availableJobs = [
  {
    id: "10",
    title: "NFT Collection Website",
    client: "CryptoArt Studio",
    budget: "18.0 SOL",
    deadline: "July 5, 2026",
    description: "Build a responsive website to showcase an NFT collection with wallet integration.",
    tags: ["React", "Web3", "Design"]
  },
  {
    id: "11",
    title: "DeFi Dashboard UI",
    client: "Protocol Labs",
    budget: "25.0 SOL",
    deadline: "July 10, 2026",
    description: "Design and develop a modern dashboard for DeFi analytics and portfolio tracking.",
    tags: ["UI/UX", "Charts", "React"]
  },
  {
    id: "12",
    title: "Token Swap Interface",
    client: "SwapProtocol",
    budget: "15.0 SOL",
    deadline: "June 30, 2026",
    description: "Create an intuitive swap interface similar to Uniswap with price charts.",
    tags: ["Web3", "TypeScript", "Solana"]
  },
  {
    id: "13",
    title: "Brand Identity Design",
    client: "NewDAO",
    budget: "10.0 SOL",
    deadline: "July 2, 2026",
    description: "Complete brand identity including logo, color palette, and design system.",
    tags: ["Branding", "Design", "Figma"]
  }
];

const activeJobs = [
  {
    id: "1",
    title: "E-commerce Website Development",
    client: "TechCorp Inc.",
    amount: "12.5 SOL",
    progress: 65,
    deadline: "June 15, 2026"
  },
  {
    id: "3",
    title: "Smart Contract Development",
    client: "DeFi Protocol",
    amount: "15.0 SOL",
    progress: 30,
    deadline: "June 20, 2026"
  }
];

export function FreelancerDashboard() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Freelancer Dashboard</h1>
        <p className="text-muted-foreground">Find jobs and manage your work</p>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#9945FF]/20 flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.title}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Active Jobs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>My Active Jobs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/dashboard/escrow/${job.id}`}>
                  <div className="p-4 rounded-xl border border-border/40 hover:border-[#7C3AED]/50 transition-all duration-300 hover:bg-accent/50 group cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1 group-hover:text-[#7C3AED] transition-colors">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">Client: {job.client}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-[#14F195]">{job.amount}</div>
                        <div className="text-xs text-muted-foreground">Due: {job.deadline}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">{job.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#7C3AED] to-[#9945FF] transition-all duration-500"
                        style={{ width: `${job.progress}%` }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Available Jobs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <CardTitle>Available Jobs</CardTitle>
              <div className="relative w-full md:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  className="pl-10 bg-input-background border-border/40 md:w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {availableJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-5 rounded-xl border border-border/40 hover:border-[#7C3AED]/50 transition-all duration-300 hover:bg-accent/50 group"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2 group-hover:text-[#7C3AED] transition-colors text-lg">{job.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end">
                    <div className="font-bold text-xl text-[#14F195]">{job.budget}</div>
                    <div className="text-xs text-muted-foreground">Due: {job.deadline}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border/40">
                  <div className="text-sm text-muted-foreground">
                    Posted by {job.client}
                  </div>
                  <Button size="sm" className="bg-[#7C3AED] hover:bg-[#6D31D4]">
                    Accept Job
                  </Button>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default FreelancerDashboard;
