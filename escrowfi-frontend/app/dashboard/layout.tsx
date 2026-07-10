"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  Briefcase,
  Wallet,
  Bell,
  User,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Copy,
  CheckCheck,
} from "lucide-react";
import { useState } from "react";
import { GradientBackground } from "@/components/gradient-bg";
import { FloatingActionButton } from "@/components/floating-action-button";
import { motion, AnimatePresence } from "motion/react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { shortAddress } from "@/lib/escrowfi";
import { toast } from "sonner";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "My Escrows", path: "/dashboard/my-escrows" },
  {
    icon: PlusCircle,
    label: "Create Escrow",
    path: "/dashboard/create-escrow",
  },
  { icon: Briefcase, label: "Active Jobs", path: "/dashboard/active-jobs" },
  { icon: Wallet, label: "Payments", path: "/dashboard/payments" },
  { icon: Bell, label: "Notifications", path: "/dashboard/notifications" },
  { icon: User, label: "Profile", path: "/dashboard/profile" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

function WalletPanel() {
  const { publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toString());
    setCopied(true);
    toast.success("Address copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!connected || !publicKey) {
    return (
      <Button
        className="w-full bg-[#7C3AED] hover:bg-[#6D31D4]"
        onClick={() => setVisible(true)}
      >
        <Wallet className="w-4 h-4 mr-2" />
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="p-3 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 space-y-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-[#14F195] animate-pulse" />
        <span className="text-xs text-muted-foreground">
          Connected · Devnet
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-sm">{shortAddress(publicKey)}</span>
        <button
          onClick={copyAddress}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <CheckCheck className="w-4 h-4 text-[#14F195]" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start text-muted-foreground hover:text-foreground"
        onClick={() => {
          disconnect();
          toast.success("Wallet disconnected");
        }}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Disconnect
      </Button>
    </div>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      <GradientBackground />

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 border-r border-border/40 bg-card/30 backdrop-blur-xl flex-col fixed h-screen">
        <div className="p-6 border-b border-border/40">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#9945FF] flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold">EscrowFi</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start gap-3 h-11 ${
                      isActive
                        ? "bg-[#7C3AED]/10 text-[#7C3AED] hover:bg-[#7C3AED]/20"
                        : "hover:bg-accent"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-border/40">
          <WalletPanel />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border/40">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#9945FF] flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold">EscrowFi</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="lg:hidden fixed inset-0 z-40 bg-background"
          >
            <div className="pt-20 p-4">
              <nav className="space-y-1 mb-6">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start gap-3 h-11 ${
                          isActive ? "bg-[#7C3AED]/10 text-[#7C3AED]" : ""
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
              <WalletPanel />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        <main className="p-6 lg:p-8 pt-20 lg:pt-8">{children}</main>
      </div>

      <FloatingActionButton />
    </div>
  );
}
