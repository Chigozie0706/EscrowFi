"use client";
import "@/lib/polyfills";
import { use } from "react";
import { useEffect, useState } from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  ExternalLink,
  CheckCircle,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  fetchEscrow,
  acceptJob,
  deposit,
  submitProof,
  releasePayment,
  cancelEscrow,
  refundEscrow,
  closeEscrow,
  getStatusLabel,
  lamportsToSol,
  shortAddress,
  EscrowAccount,
} from "@/lib/escrowfi";

const STEPS = ["Created", "Accepted", "Funded", "ProofSubmitted", "Completed"];

const STATUS_COLORS: Record<string, string> = {
  Created: "text-indigo-400",
  Accepted: "text-yellow-400",
  Funded: "text-blue-400",
  ProofSubmitted: "text-purple-400",
  Completed: "text-emerald-400",
  Cancelled: "text-red-400",
};

export default function EscrowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { publicKey } = useWallet();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();

  const [escrow, setEscrow] = useState<EscrowAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [proofUrl, setProofUrl] = useState("");

  const escrowPubkey = (() => {
    try {
      return new PublicKey(id);
    } catch {
      return null;
    }
  })();

  const load = async () => {
    if (!anchorWallet || !escrowPubkey) return;
    try {
      const data = await fetchEscrow(anchorWallet, connection, escrowPubkey);
      setEscrow(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load escrow");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [anchorWallet, connection, id]);

  const runAction = async (label: string, fn: () => Promise<string>) => {
    setActionLoading(label);
    try {
      const sig = await fn();
      toast.success(`${label} successful!`, {
        description: `TX: ${sig.slice(0, 8)}...${sig.slice(-8)}`,
      });
      await load();
    } catch (err: any) {
      console.error(err);
      toast.error(`${label} failed`, { description: err?.message });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-[#7C3AED]" />
      </div>
    );
  }

  if (!escrow) {
    return (
      <div className="text-center py-24">
        <p className="text-muted-foreground">Escrow not found</p>
        <Button
          className="mt-4"
          onClick={() => router.push("/dashboard/my-escrows")}
        >
          Back to My Escrows
        </Button>
      </div>
    );
  }

  const status = getStatusLabel(escrow.status);
  const isClient = publicKey?.equals(escrow.client);
  const isFreelancer = publicKey?.equals(escrow.freelancer);
  const deadline = new Date(escrow.deadline.toNumber() * 1000);
  const isExpired = deadline < new Date();
  const currentStep = STEPS.indexOf(status);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Button
          variant="ghost"
          className="mb-4 -ml-2"
          onClick={() => router.push("/dashboard/my-escrows")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{escrow.description}</h1>
            <p className="font-mono text-xs text-muted-foreground mt-1">{id}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-[#14F195]">
              {lamportsToSol(escrow.amount)} SOL
            </p>
            <p className={`text-sm font-semibold ${STATUS_COLORS[status]}`}>
              {status}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress */}
      <Card className="border-border/40 bg-card/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-border/40 mx-8" />
            {STEPS.map((step, i) => {
              const done = currentStep >= i && status !== "Cancelled";
              return (
                <div
                  key={step}
                  className="flex flex-col items-center gap-2 z-10"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                      done
                        ? "bg-[#7C3AED] border-[#7C3AED]"
                        : "bg-background border-border/40"
                    }`}
                  >
                    {done ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <span className="text-xs text-muted-foreground">
                        {i + 1}
                      </span>
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium ${done ? "text-[#7C3AED]" : "text-muted-foreground"}`}
                  >
                    {step === "ProofSubmitted" ? "Proof" : step}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Details */}
      <Card className="border-border/40 bg-card/50">
        <CardHeader>
          <CardTitle className="text-base">Escrow Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          {[
            { label: "Client", value: shortAddress(escrow.client), mono: true },
            {
              label: "Freelancer",
              value: shortAddress(escrow.freelancer),
              mono: true,
            },
            { label: "Amount", value: `${lamportsToSol(escrow.amount)} SOL` },
            {
              label: "Deadline",
              value: deadline.toLocaleString(),
              color: isExpired ? "text-red-400" : "",
            },
            {
              label: "Created",
              value: new Date(
                escrow.createdAt.toNumber() * 1000,
              ).toLocaleString(),
            },
          ].map(({ label, value, mono, color }) => (
            <div
              key={label}
              className="flex justify-between items-center py-2 border-b border-border/20 last:border-0"
            >
              <span className="text-muted-foreground">{label}</span>
              <span
                className={`font-medium ${mono ? "font-mono text-xs" : ""} ${color || ""}`}
              >
                {value}
              </span>
            </div>
          ))}

          {escrow.proofUrl && (
            <div className="flex justify-between items-center py-2">
              <span className="text-muted-foreground">Proof URL</span>
              <a
                href={escrow.proofUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-[#14F195] text-xs font-mono hover:underline max-w-[200px] truncate"
              >
                {escrow.proofUrl}
                <ExternalLink className="w-3 h-3 flex-shrink-0" />
              </a>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Actions */}
      <Card className="border-border/40 bg-card/50">
        <CardHeader>
          <CardTitle className="text-base">Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {status === "Created" && isFreelancer && (
            <Button
              className="w-full bg-[#7C3AED] hover:bg-[#6D31D4]"
              disabled={!!actionLoading}
              onClick={() =>
                runAction("Accept Job", () =>
                  acceptJob(anchorWallet!, connection, escrowPubkey!),
                )
              }
            >
              {actionLoading === "Accept Job" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              ✅ Accept Job
            </Button>
          )}

          {status === "Accepted" && isClient && (
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              disabled={!!actionLoading}
              onClick={() =>
                runAction("Deposit", () =>
                  deposit(anchorWallet!, connection, escrowPubkey!),
                )
              }
            >
              {actionLoading === "Deposit" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              💰 Deposit {lamportsToSol(escrow.amount)} SOL
            </Button>
          )}

          {status === "Funded" && isFreelancer && (
            <div className="space-y-2">
              <Input
                placeholder="GitHub URL or IPFS CID"
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                className="bg-input-background border-border/40 font-mono text-sm"
              />
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={!!actionLoading || !proofUrl}
                onClick={() =>
                  runAction("Submit Proof", () =>
                    submitProof(
                      anchorWallet!,
                      connection,
                      escrowPubkey!,
                      proofUrl,
                    ),
                  )
                }
              >
                {actionLoading === "Submit Proof" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                📄 Submit Proof
              </Button>
            </div>
          )}

          {status === "ProofSubmitted" && isClient && (
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              disabled={!!actionLoading}
              onClick={() =>
                runAction("Release Payment", () =>
                  releasePayment(
                    anchorWallet!,
                    connection,
                    escrowPubkey!,
                    escrow.freelancer,
                  ),
                )
              }
            >
              {actionLoading === "Release Payment" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              🚀 Release Payment → {lamportsToSol(escrow.amount)} SOL
            </Button>
          )}

          {["Created", "Accepted"].includes(status) && isClient && (
            <Button
              variant="outline"
              className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
              disabled={!!actionLoading}
              onClick={() =>
                runAction("Cancel", () =>
                  cancelEscrow(anchorWallet!, connection, escrowPubkey!),
                )
              }
            >
              {actionLoading === "Cancel" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              ✕ Cancel Escrow
            </Button>
          )}

          {["Funded", "ProofSubmitted"].includes(status) &&
            isClient &&
            isExpired && (
              <Button
                variant="outline"
                className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
                disabled={!!actionLoading}
                onClick={() =>
                  runAction("Refund", () =>
                    refundEscrow(anchorWallet!, connection, escrowPubkey!),
                  )
                }
              >
                {actionLoading === "Refund" ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : null}
                ↩ Refund (Deadline Passed)
              </Button>
            )}

          {["Completed", "Cancelled"].includes(status) && isClient && (
            <Button
              variant="outline"
              className="w-full"
              disabled={!!actionLoading}
              onClick={() =>
                runAction("Close & Reclaim Rent", () =>
                  closeEscrow(anchorWallet!, connection, escrowPubkey!),
                )
              }
            >
              {actionLoading === "Close & Reclaim Rent" ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              🗑 Close Escrow & Reclaim Rent
            </Button>
          )}

          {!isClient && !isFreelancer && (
            <p className="text-center text-muted-foreground text-sm py-4">
              You are not a party to this escrow
            </p>
          )}

          {/* Explorer link */}
          <a
            href={`https://explorer.solana.com/address/${id}?cluster=devnet`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors pt-2"
          >
            <ExternalLink className="w-3 h-3" />
            View on Solana Explorer
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
