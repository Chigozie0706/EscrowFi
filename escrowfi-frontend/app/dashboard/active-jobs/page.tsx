"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Wallet, Clock } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const jobs = [
  {
    id: "1",
    title: "E-commerce Website Development",
    client: "TechCorp Inc.",
    amount: "12.5 SOL",
    status: "in-progress",
    progress: 65,
    deadline: "June 15, 2026",
    timeLeft: "7 days"
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    client: "StartupXYZ",
    amount: "8.0 SOL",
    status: "review",
    progress: 100,
    deadline: "June 10, 2026",
    timeLeft: "2 days"
  },
  {
    id: "3",
    title: "Smart Contract Development",
    client: "DeFi Protocol",
    amount: "15.0 SOL",
    status: "in-progress",
    progress: 30,
    deadline: "June 20, 2026",
    timeLeft: "12 days"
  },
  {
    id: "5",
    title: "NFT Marketplace Frontend",
    client: "Web3 Startup",
    amount: "20.0 SOL",
    status: "in-progress",
    progress: 45,
    deadline: "June 25, 2026",
    timeLeft: "17 days"
  }
];

export function ActiveJobs() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Active Jobs</h1>
        <p className="text-muted-foreground">Track all your ongoing projects</p>
      </motion.div>

      <div className="grid gap-6">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/dashboard/escrow/${job.id}`}>
              <Card className="border-border/40 bg-card/50 backdrop-blur-sm hover:border-[#7C3AED]/50 transition-all duration-300 group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#9945FF]/20 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-8 h-8 text-[#7C3AED]" />
                    </div>

                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-xl font-semibold group-hover:text-[#7C3AED] transition-colors">
                            {job.title}
                          </h3>
                          <Badge 
                            variant="outline" 
                            className={job.status === 'review' 
                              ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' 
                              : 'bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20'
                            }
                          >
                            {job.status === 'review' ? 'Under Review' : 'In Progress'}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground">Client: {job.client}</p>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-[#14F195]" />
                          <div>
                            <div className="text-xs text-muted-foreground">Budget</div>
                            <div className="font-semibold text-[#14F195]">{job.amount}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#9945FF]" />
                          <div>
                            <div className="text-xs text-muted-foreground">Deadline</div>
                            <div className="font-semibold">{job.deadline}</div>
                          </div>
                        </div>

                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Time Left</div>
                          <div className="font-semibold">{job.timeLeft}</div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">{job.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-[#7C3AED] to-[#9945FF] transition-all duration-500"
                            style={{ width: `${job.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ActiveJobs;
