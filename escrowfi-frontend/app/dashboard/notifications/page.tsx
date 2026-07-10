"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Wallet,
  FileText,
  Bell,
  CheckCheck
} from "lucide-react";
import { motion } from "motion/react";

const notifications = [
  {
    id: "1",
    type: "success",
    title: "Payment Released",
    message: "8.0 SOL has been released for Mobile App UI/UX Design",
    time: "2 hours ago",
    read: false
  },
  {
    id: "2",
    type: "warning",
    title: "Work Submitted",
    message: "Marcus Rodriguez submitted work for review",
    time: "5 hours ago",
    read: false
  },
  {
    id: "3",
    type: "info",
    title: "New Escrow Created",
    message: "Your escrow for Website Redesign has been created",
    time: "1 day ago",
    read: true
  },
  {
    id: "4",
    type: "success",
    title: "Job Accepted",
    message: "Sarah Chen accepted your Smart Contract Audit job",
    time: "2 days ago",
    read: true
  },
  {
    id: "5",
    type: "pending",
    title: "Pending Approval",
    message: "Work is waiting for your approval on E-commerce Website",
    time: "3 days ago",
    read: true
  },
  {
    id: "6",
    type: "wallet",
    title: "Funds Deposited",
    message: "15.0 SOL deposited into escrow contract",
    time: "4 days ago",
    read: true
  }
];

export function Notifications() {
  return (
    <div className="max-w-3xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-muted-foreground">
            {notifications.filter(n => !n.read).length} unread notifications
          </p>
        </div>
        <Button variant="outline" size="sm">
          <CheckCheck className="w-4 h-4 mr-2" />
          Mark all as read
        </Button>
      </motion.div>

      <div className="space-y-3">
        {notifications.map((notification, index) => {
          const icons = {
            success: { icon: CheckCircle2, color: "text-[#14F195]", bg: "bg-[#14F195]/10" },
            warning: { icon: AlertCircle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            info: { icon: FileText, color: "text-[#7C3AED]", bg: "bg-[#7C3AED]/10" },
            pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-500/10" },
            wallet: { icon: Wallet, color: "text-[#14F195]", bg: "bg-[#14F195]/10" }
          };

          const config = icons[notification.type as keyof typeof icons];
          const Icon = config.icon;

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`border-border/40 backdrop-blur-sm cursor-pointer hover:border-[#7C3AED]/50 transition-all ${
                notification.read ? 'bg-card/30' : 'bg-card/70'
              }`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-xl ${config.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${config.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-[#7C3AED] flex-shrink-0 mt-2" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                        {!notification.read && (
                          <Badge variant="outline" className="bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {notifications.length === 0 && (
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No notifications</h3>
            <p className="text-muted-foreground">You're all caught up!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default Notifications;
