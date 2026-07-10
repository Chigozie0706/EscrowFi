"use client";

import { Badge } from "./ui/badge";

type EscrowStatus = "created" | "funded" | "accepted" | "submitted" | "released" | "cancelled";

interface StatusBadgeProps {
  status: EscrowStatus;
}

const statusConfig: Record<EscrowStatus, { label: string; className: string }> = {
  created: { 
    label: "Created", 
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20" 
  },
  funded: { 
    label: "Funded", 
    className: "bg-[#14F195]/10 text-[#14F195] border-[#14F195]/20" 
  },
  accepted: { 
    label: "In Progress", 
    className: "bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20" 
  },
  submitted: { 
    label: "Submitted", 
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" 
  },
  released: { 
    label: "Completed", 
    className: "bg-[#14F195]/10 text-[#14F195] border-[#14F195]/20" 
  },
  cancelled: { 
    label: "Cancelled", 
    className: "bg-red-500/10 text-red-500 border-red-500/20" 
  }
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
}
