"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { motion } from "motion/react";

interface WalletModalProps {
  open: boolean;
  onClose: () => void;
  onConnect: (walletType: string) => void;
}

const wallets = [
  {
    name: "Phantom",
    icon: "👻",
    description: "The most popular Solana wallet",
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Solflare",
    icon: "🔥",
    description: "Secure and user-friendly",
    color: "from-orange-500 to-red-600"
  },
  {
    name: "Backpack",
    icon: "🎒",
    description: "Next-gen crypto wallet",
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Glow",
    icon: "✨",
    description: "Simple and elegant",
    color: "from-green-500 to-emerald-600"
  }
];

export function WalletModal({ open, onClose, onConnect }: WalletModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-border/40 bg-card">
        <DialogHeader>
          <DialogTitle>Connect Your Wallet</DialogTitle>
          <DialogDescription>
            Choose your preferred Solana wallet to continue
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 mt-4">
          {wallets.map((wallet, index) => (
            <motion.div
              key={wallet.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                variant="outline"
                className="w-full h-auto p-4 justify-start gap-4 hover:border-[#7C3AED]/50 group"
                onClick={() => onConnect(wallet.name)}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${wallet.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  {wallet.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="font-semibold">{wallet.name}</div>
                  <div className="text-sm text-muted-foreground">{wallet.description}</div>
                </div>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground">
          <p className="flex items-start gap-2">
            <span className="text-[#14F195] mt-0.5">ⓘ</span>
            <span>New to Solana? Install a wallet extension to get started.</span>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
