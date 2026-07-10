"use client";
export const dynamic = "force-dynamic";
import "@/lib/polyfills";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Wallet, ArrowRight, Info, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import {
  useWallet,
  useConnection,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { PublicKey } from "@solana/web3.js";
import { createEscrow } from "@/lib/escrowfi";

export default function CreateEscrowPage() {
  const router = useRouter();
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: "",
    budget: "",
    deadline: "",
    freelancerWallet: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!connected || !anchorWallet) {
      setVisible(true);
      return;
    }

    // Validate freelancer wallet
    let freelancerPubkey: PublicKey;
    try {
      freelancerPubkey = new PublicKey(formData.freelancerWallet);
    } catch {
      toast.error("Invalid freelancer wallet address");
      return;
    }

    if (freelancerPubkey.equals(anchorWallet.publicKey)) {
      toast.error("Freelancer cannot be the same as client");
      return;
    }

    const deadlineDate = new Date(formData.deadline);
    if (deadlineDate <= new Date()) {
      toast.error("Deadline must be in the future");
      return;
    }

    const amountSol = parseFloat(formData.budget);
    if (!amountSol || amountSol <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }

    setLoading(true);
    try {
      // Use timestamp as unique escrow ID
      // const escrowId = Date.now();
      const escrowId = Math.floor(Date.now() / 1000); // Unix timestamp, safe u64
      const { sig, escrowPubkey } = await createEscrow(
        anchorWallet,
        connection,
        {
          escrowId,
          freelancer: freelancerPubkey,
          amountSol,
          deadlineDate,
          description: formData.description,
        },
      );

      toast.success("Escrow created on Solana!", {
        description: `TX: ${sig.slice(0, 8)}...${sig.slice(-8)}`,
      });

      // Navigate to the escrow detail page
      setTimeout(() => {
        router.push(`/dashboard/escrow/${escrowPubkey.toString()}`);
      }, 1500);
    } catch (err: any) {
      console.error(err);
      toast.error("Transaction failed", {
        description: err?.message ?? "Check console for details",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Create Escrow</h1>
        <p className="text-muted-foreground">
          Set up a secure escrow for your project on Solana Devnet
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>
              Provide information about the work you need completed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the project requirements and deliverables... (max 200 chars)"
                  maxLength={200}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="bg-input-background border-border/40 min-h-32 resize-none"
                  required
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.description.length}/200
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="budget">Amount (SOL)</Label>
                  <div className="relative">
                    <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="budget"
                      type="number"
                      step="0.01"
                      min="0.001"
                      placeholder="0.00"
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="bg-input-background border-border/40 pl-10"
                      required
                    />
                  </div>
                  {formData.budget && (
                    <p className="text-xs text-muted-foreground">
                      ≈ ${(parseFloat(formData.budget) * 150).toFixed(2)} USD
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="deadline"
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={formData.deadline}
                      onChange={(e) =>
                        setFormData({ ...formData, deadline: e.target.value })
                      }
                      className="bg-input-background border-border/40 pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="freelancerWallet">
                  Freelancer Wallet Address
                </Label>
                <Input
                  id="freelancerWallet"
                  placeholder="Solana public key (e.g. 5z3EU...)"
                  value={formData.freelancerWallet}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      freelancerWallet: e.target.value,
                    })
                  }
                  className="bg-input-background border-border/40 font-mono text-sm"
                  required
                />
                <p className="text-xs text-muted-foreground flex items-start gap-2">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  The freelancer must sign to accept this job before you deposit
                  funds.
                </p>
              </div>

              {/* Fee breakdown */}
              <div className="p-4 rounded-xl bg-[#7C3AED]/10 border border-[#7C3AED]/20 space-y-2">
                <h4 className="font-semibold flex items-center gap-2 text-sm">
                  <Info className="w-4 h-4" />
                  Transaction Summary
                </h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Escrow Amount:
                    </span>
                    <span className="font-medium">
                      {formData.budget || "0.00"} SOL
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Network (Devnet):
                    </span>
                    <span className="font-medium text-[#14F195]">Free</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#7C3AED]/20">
                    <span className="font-semibold">Deposited on Accept:</span>
                    <span className="font-bold text-[#14F195]">
                      {formData.budget || "0.00"} SOL
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push("/dashboard")}
                  disabled={loading}
                >
                  Cancel
                </Button>

                {!connected ? (
                  <Button
                    type="button"
                    className="flex-1 bg-[#7C3AED] hover:bg-[#6D31D4]"
                    onClick={() => setVisible(true)}
                  >
                    Connect Wallet First
                    <Wallet className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="flex-1 bg-[#7C3AED] hover:bg-[#6D31D4]"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating on Solana...
                      </>
                    ) : (
                      <>
                        Create Escrow
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="pt-6">
            <h4 className="font-semibold mb-3">How it works</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              {[
                "Escrow account is created on-chain — no SOL moved yet",
                "Freelancer accepts the job with their wallet",
                "You deposit SOL into the secure vault PDA",
                "Freelancer submits proof (GitHub URL or IPFS CID)",
                "You approve and SOL is released instantly",
              ].map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#7C3AED]/20 flex items-center justify-center flex-shrink-0 text-[#7C3AED] font-semibold text-xs">
                    {i + 1}
                  </div>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
