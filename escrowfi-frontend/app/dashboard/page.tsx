"use client";
export const dynamic = "force-dynamic";
import "@/lib/polyfills";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Briefcase,
  CheckCircle2,
  Clock,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

const stats = [
  {
    title: "Total Escrow Value",
    value: "45.8 SOL",
    change: "+12.5%",
    icon: DollarSign,
    trend: "up",
    color: "text-[#14F195]",
  },
  // {
  //   title: "Active Jobs",
  //   value: "8",
  //   change: "+2",
  //   icon: Briefcase,
  //   trend: "up",
  //   color: "text-[#7C3AED]",
  // },
  {
    title: "Completed Jobs",
    value: "124",
    change: "+18",
    icon: CheckCircle2,
    trend: "up",
    color: "text-[#14F195]",
  },
  {
    title: "Pending Payments",
    value: "3",
    change: "-1",
    icon: Clock,
    trend: "down",
    color: "text-[#9945FF]",
  },
];

const recentActivity = [
  {
    type: "created",
    title: "New escrow created: Website Redesign",
    amount: "5.5 SOL",
    time: "2 hours ago",
    status: "funded",
  },
  {
    type: "submitted",
    title: "Work submitted: Mobile App UI",
    amount: "3.2 SOL",
    time: "5 hours ago",
    status: "submitted",
  },
  {
    type: "released",
    title: "Payment released: Landing Page",
    amount: "2.8 SOL",
    time: "1 day ago",
    status: "released",
  },
  {
    type: "accepted",
    title: "Job accepted: Smart Contract Audit",
    amount: "8.0 SOL",
    time: "2 days ago",
    status: "accepted",
  },
  {
    type: "released",
    title: "Payment released: Logo Design",
    amount: "1.5 SOL",
    time: "3 days ago",
    status: "released",
  },
];

const activeEscrows = [
  {
    id: "1",
    title: "E-commerce Website Development",
    client: "TechCorp Inc.",
    freelancer: "Sarah Chen",
    amount: "12.5 SOL",
    status: "accepted",
    deadline: "June 15, 2026",
    progress: 65,
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    client: "StartupXYZ",
    freelancer: "Marcus Rodriguez",
    amount: "8.0 SOL",
    status: "submitted",
    deadline: "June 10, 2026",
    progress: 100,
  },
  {
    id: "3",
    title: "Smart Contract Development",
    client: "DeFi Protocol",
    freelancer: "Aisha Patel",
    amount: "15.0 SOL",
    status: "funded",
    deadline: "June 20, 2026",
    progress: 30,
  },
];

const statusConfig = {
  created: {
    label: "Created",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  },
  funded: {
    label: "Funded",
    color: "bg-[#14F195]/10 text-[#14F195] border-[#14F195]/20",
  },
  accepted: {
    label: "In Progress",
    color: "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20",
  },
  submitted: {
    label: "Submitted",
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  },
  released: {
    label: "Completed",
    color: "bg-[#14F195]/10 text-[#14F195] border-[#14F195]/20",
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-500/10 text-red-500 border-red-500/20",
  },
};

export function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your escrows.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/create-escrow">
            <Button className="bg-[#7C3AED] hover:bg-[#6D31D4]">
              Create Escrow
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm hover:border-[#7C3AED]/30 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br from-[#7C3AED]/20 to-[#9945FF]/20 flex items-center justify-center`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-[#14F195]" : "text-red-500"}`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.title}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Escrows */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle>Active Escrows</CardTitle>
              <Link href="/dashboard/my-escrows">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeEscrows.map((escrow, index) => (
                <motion.div
                  key={escrow.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/dashboard/escrow/${escrow.id}`}>
                    <div className="p-4 rounded-xl border border-border/40 hover:border-[#7C3AED]/50 transition-all duration-300 hover:bg-accent/50 group cursor-pointer">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1 group-hover:text-[#7C3AED] transition-colors">
                            {escrow.title}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Client: {escrow.client}</span>
                            {escrow.freelancer && (
                              <span>Freelancer: {escrow.freelancer}</span>
                            )}
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            statusConfig[
                              escrow.status as keyof typeof statusConfig
                            ].color
                          }
                        >
                          {
                            statusConfig[
                              escrow.status as keyof typeof statusConfig
                            ].label
                          }
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">
                          Progress
                        </span>
                        <span className="text-sm font-medium">
                          {escrow.progress}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#7C3AED] to-[#9945FF] transition-all duration-500"
                          style={{ width: `${escrow.progress}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/40">
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-[#14F195]" />
                          <span className="font-semibold">{escrow.amount}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          Due: {escrow.deadline}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Wallet Balance */}
          <Card className="border-border/40 bg-gradient-to-br from-[#7C3AED]/10 to-[#9945FF]/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Wallet Balance
                  </p>
                  <p className="text-4xl font-bold mb-1">12.45 SOL</p>
                  <p className="text-sm text-muted-foreground">
                    ≈ $2,489.00 USD
                  </p>
                </div>
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#9945FF] flex items-center justify-center">
                  <Wallet className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                  Deposit
                </Button>
                <Button className="flex-1 bg-white/10 hover:bg-white/20 backdrop-blur-sm">
                  Withdraw
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div>
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3 pb-4 border-b border-border/40 last:border-0 last:pb-0"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activity.type === "released"
                          ? "bg-[#14F195]/10"
                          : activity.type === "created"
                            ? "bg-blue-500/10"
                            : activity.type === "submitted"
                              ? "bg-yellow-500/10"
                              : "bg-[#7C3AED]/10"
                      }`}
                    >
                      {activity.type === "released" && (
                        <CheckCircle2 className="w-5 h-5 text-[#14F195]" />
                      )}
                      {activity.type === "created" && (
                        <DollarSign className="w-5 h-5 text-blue-500" />
                      )}
                      {activity.type === "submitted" && (
                        <Clock className="w-5 h-5 text-yellow-500" />
                      )}
                      {activity.type === "accepted" && (
                        <Briefcase className="w-5 h-5 text-[#7C3AED]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium mb-1">
                        {activity.title}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {activity.time}
                        </span>
                        <span className="text-xs font-semibold text-[#14F195]">
                          {activity.amount}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm mt-6">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#14F195]" />
                This Month
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Earned</span>
                <span className="font-semibold text-[#14F195]">+24.5 SOL</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Spent</span>
                <span className="font-semibold">-18.2 SOL</span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-border/40">
                <span className="text-sm font-semibold">Net</span>
                <span className="font-bold text-[#14F195]">+6.3 SOL</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DashboardOverview;
