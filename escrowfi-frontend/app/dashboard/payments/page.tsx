"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight, ArrowDownLeft, Download, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const payments = [
  {
    id: "1",
    type: "received",
    description: "Payment from TechCorp Inc.",
    project: "E-commerce Website",
    amount: "12.5 SOL",
    date: "June 8, 2026",
    status: "completed"
  },
  {
    id: "2",
    type: "sent",
    description: "Escrow deposit",
    project: "Landing Page Design",
    amount: "3.5 SOL",
    date: "June 5, 2026",
    status: "completed"
  },
  {
    id: "3",
    type: "received",
    description: "Payment from Marketing Agency",
    project: "Social Media Graphics",
    amount: "2.0 SOL",
    date: "June 1, 2026",
    status: "completed"
  },
  {
    id: "4",
    type: "sent",
    description: "Escrow deposit",
    project: "Smart Contract Audit",
    amount: "15.0 SOL",
    date: "May 28, 2026",
    status: "completed"
  },
  {
    id: "5",
    type: "received",
    description: "Payment from StartupXYZ",
    project: "Mobile App UI",
    amount: "8.0 SOL",
    date: "May 25, 2026",
    status: "completed"
  },
  {
    id: "6",
    type: "pending",
    description: "Pending release",
    project: "NFT Marketplace",
    amount: "20.0 SOL",
    date: "May 20, 2026",
    status: "pending"
  }
];

const stats = [
  {
    title: "Total Received",
    value: "124.5 SOL",
    subtitle: "≈ $24,900 USD",
    trend: "+12.5%",
    color: "text-[#14F195]"
  },
  {
    title: "Total Sent",
    value: "45.8 SOL",
    subtitle: "≈ $9,160 USD",
    trend: "+8.2%",
    color: "text-[#7C3AED]"
  },
  {
    title: "Pending",
    value: "20.0 SOL",
    subtitle: "≈ $4,000 USD",
    trend: "-2 escrows",
    color: "text-yellow-500"
  }
];

export function Payments() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Payments</h1>
          <p className="text-muted-foreground">View your payment history and transactions</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </motion.div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{stat.title}</span>
                  <div className="flex items-center gap-1 text-sm text-[#14F195]">
                    <TrendingUp className="w-3 h-3" />
                    {stat.trend}
                  </div>
                </div>
                <div className={`text-2xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Payment History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-border/40 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30 hover:bg-muted/30">
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment, index) => (
                    <motion.tr
                      key={payment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-accent/50 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {payment.type === 'received' ? (
                            <div className="w-8 h-8 rounded-lg bg-[#14F195]/10 flex items-center justify-center">
                              <ArrowDownLeft className="w-4 h-4 text-[#14F195]" />
                            </div>
                          ) : payment.type === 'sent' ? (
                            <div className="w-8 h-8 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center">
                              <ArrowUpRight className="w-4 h-4 text-[#7C3AED]" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                              <ArrowDownLeft className="w-4 h-4 text-yellow-500" />
                            </div>
                          )}
                          <span className="capitalize">{payment.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell className="text-muted-foreground">{payment.project}</TableCell>
                      <TableCell>
                        <span className={`font-semibold ${
                          payment.type === 'received' ? 'text-[#14F195]' : 
                          payment.type === 'sent' ? 'text-foreground' : 
                          'text-yellow-500'
                        }`}>
                          {payment.type === 'sent' ? '-' : '+'}{payment.amount}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{payment.date}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={payment.status === 'completed' 
                            ? 'bg-[#14F195]/10 text-[#14F195] border-[#14F195]/20' 
                            : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                          }
                        >
                          {payment.status === 'completed' ? 'Completed' : 'Pending'}
                        </Badge>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Payments;
