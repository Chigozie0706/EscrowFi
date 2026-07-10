"use client";

import { useEffect, useState } from "react";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, PlusCircle, Wallet, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  fetchClientEscrows,
  fetchFreelancerEscrows,
  getStatusLabel,
  lamportsToSol,
  shortAddress,
  EscrowWithPubkey,
} from "@/lib/escrowfi";

const STATUS_COLORS: Record<string, { bg: string; text: string; dot: string }> =
  {
    Created: {
      bg: "bg-indigo-500/10",
      text: "text-indigo-400",
      dot: "bg-indigo-400",
    },
    Accepted: {
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      dot: "bg-yellow-400",
    },
    Funded: { bg: "bg-blue-500/10", text: "text-blue-400", dot: "bg-blue-400" },
    ProofSubmitted: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      dot: "bg-purple-400",
    },
    Completed: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      dot: "bg-emerald-400",
    },
    Cancelled: { bg: "bg-red-500/10", text: "text-red-400", dot: "bg-red-400" },
  };

function EscrowCard({
  escrow,
  role,
}: {
  escrow: EscrowWithPubkey;
  role: "client" | "freelancer";
}) {
  const router = useRouter();
  const { account, publicKey } = escrow;
  const status = getStatusLabel(account.status);
  const colors = STATUS_COLORS[status] || STATUS_COLORS.Created;
  const deadline = new Date(account.deadline.toNumber() * 1000);
  const isExpired = deadline < new Date();

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card
        className="border-border/40 bg-card/50 backdrop-blur-sm hover:border-[#7C3AED]/40 transition-all cursor-pointer"
        onClick={() => router.push(`/dashboard/escrow/${publicKey.toString()}`)}
      >
        <CardContent className="pt-5 pb-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate mb-1">
                {account.description}
              </p>
              <p className="font-mono text-xs text-muted-foreground">
                {shortAddress(publicKey)}
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-[#14F195]">
                {lamportsToSol(account.amount)} SOL
              </p>
              <p
                className={`text-xs mt-1 ${isExpired ? "text-red-400" : "text-muted-foreground"}`}
              >
                {isExpired ? "Expired" : `Due ${deadline.toLocaleDateString()}`}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
              {status}
            </span>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span>
                {role === "client"
                  ? `Freelancer: ${shortAddress(account.freelancer)}`
                  : `Client: ${shortAddress(account.client)}`}
              </span>
              <ExternalLink className="w-3 h-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function EmptyState({
  label,
  onAction,
}: {
  label: string;
  onAction: () => void;
}) {
  return (
    <div className="text-center py-16 space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center mx-auto">
        <PlusCircle className="w-8 h-8 text-[#7C3AED]" />
      </div>
      <div>
        <p className="font-semibold text-lg">{label}</p>
        <p className="text-muted-foreground text-sm mt-1">
          Get started by creating your first escrow
        </p>
      </div>
      <Button className="bg-[#7C3AED] hover:bg-[#6D31D4]" onClick={onAction}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create Escrow
      </Button>
    </div>
  );
}

export default function MyEscrowsPage() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const anchorWallet = useAnchorWallet();
  const { connection } = useConnection();
  const router = useRouter();

  const [clientEscrows, setClientEscrows] = useState<EscrowWithPubkey[]>([]);
  const [freelancerEscrows, setFreelancerEscrows] = useState<
    EscrowWithPubkey[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!anchorWallet) return;

    const load = async () => {
      setLoading(true);
      try {
        const [asClient, asFreelancer] = await Promise.all([
          fetchClientEscrows(anchorWallet, connection),
          fetchFreelancerEscrows(anchorWallet, connection),
        ]);
        setClientEscrows(asClient);
        setFreelancerEscrows(asFreelancer);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load escrows");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [anchorWallet, connection]);

  if (!connected) {
    return (
      <div className="text-center py-24 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-[#7C3AED]/10 flex items-center justify-center mx-auto">
          <Wallet className="w-8 h-8 text-[#7C3AED]" />
        </div>
        <p className="font-semibold text-lg">
          Connect your wallet to view escrows
        </p>
        <Button
          className="bg-[#7C3AED] hover:bg-[#6D31D4]"
          onClick={() => setVisible(true)}
        >
          Connect Wallet
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Escrows</h1>
          <p className="text-muted-foreground mt-1">
            All your on-chain escrow agreements
          </p>
        </div>
        <Button
          className="bg-[#7C3AED] hover:bg-[#6D31D4]"
          onClick={() => router.push("/dashboard/create-escrow")}
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          New Escrow
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-[#7C3AED]" />
        </div>
      ) : (
        <Tabs defaultValue="client">
          <TabsList className="bg-card/50 border border-border/40">
            <TabsTrigger value="client">
              As Client ({clientEscrows.length})
            </TabsTrigger>
            <TabsTrigger value="freelancer">
              As Freelancer ({freelancerEscrows.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="client" className="space-y-3 mt-4">
            {clientEscrows.length === 0 ? (
              <EmptyState
                label="No escrows as client"
                onAction={() => router.push("/dashboard/create-escrow")}
              />
            ) : (
              clientEscrows.map((e) => (
                <EscrowCard
                  key={e.publicKey.toString()}
                  escrow={e}
                  role="client"
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="freelancer" className="space-y-3 mt-4">
            {freelancerEscrows.length === 0 ? (
              <EmptyState
                label="No escrows as freelancer"
                onAction={() => router.push("/dashboard/create-escrow")}
              />
            ) : (
              freelancerEscrows.map((e) => (
                <EscrowCard
                  key={e.publicKey.toString()}
                  escrow={e}
                  role="freelancer"
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
