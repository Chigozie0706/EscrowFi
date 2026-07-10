import "@/lib/polyfills";
import { Program, AnchorProvider, BN, setProvider } from "@coral-xyz/anchor";
import { Buffer } from "buffer";
if (typeof window !== "undefined") {
  window.Buffer = window.Buffer ?? Buffer;
}

import {
  Connection,
  PublicKey,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import idl from "./idl.json";

//  Constants
export const PROGRAM_ID = new PublicKey(
  "5z3EUnqxaD6TdwA9rJSG7EgT8tJaAm2vp4j61Wrqvy7D",
);
export const DEVNET_RPC = "https://api.devnet.solana.com";

//  Types
export type EscrowStatus =
  | { created: {} }
  | { accepted: {} }
  | { funded: {} }
  | { proofSubmitted: {} }
  | { completed: {} }
  | { cancelled: {} };

export interface EscrowAccount {
  escrowId: BN;
  client: PublicKey;
  freelancer: PublicKey;
  amount: BN;
  deadline: BN;
  status: EscrowStatus;
  proofUrl: string;
  description: string;
  createdAt: BN;
  acceptedAt: BN;
  fundedAt: BN;
  completedAt: BN;
  bump: number;
  vaultBump: number;
}

export interface EscrowWithPubkey {
  publicKey: PublicKey;
  account: EscrowAccount;
}

//  Helpers
export function getStatusLabel(status: EscrowStatus): string {
  if ("created" in status) return "Created";
  if ("accepted" in status) return "Accepted";
  if ("funded" in status) return "Funded";
  if ("proofSubmitted" in status) return "ProofSubmitted";
  if ("completed" in status) return "Completed";
  if ("cancelled" in status) return "Cancelled";
  return "Unknown";
}

export function lamportsToSol(lamports: BN): number {
  return lamports.toNumber() / LAMPORTS_PER_SOL;
}

export function solToLamports(sol: number): BN {
  return new BN(Math.floor(sol * LAMPORTS_PER_SOL));
}

export function shortAddress(pubkey: PublicKey | string): string {
  const str = pubkey.toString();
  return `${str.slice(0, 4)}...${str.slice(-4)}`;
}

//  PDA Derivation
export function getEscrowPDA(
  client: PublicKey,
  escrowId: BN,
): [PublicKey, number] {
  const idBytes = Buffer.alloc(8);
  idBytes.writeBigUInt64LE(BigInt(escrowId.toString()));
  return PublicKey.findProgramAddressSync(
    [Buffer.from("escrow"), client.toBuffer(), idBytes],
    PROGRAM_ID,
  );
}

export function getVaultPDA(escrowPubkey: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("vault"), escrowPubkey.toBuffer()],
    PROGRAM_ID,
  );
}

// ── Program Client
// export function getProgram(wallet: AnchorWallet, connection: Connection) {
//   const provider = new AnchorProvider(connection, wallet, {
//     commitment: "confirmed",
//   });
//   setProvider(provider);
//   return new Program(idl as any, provider) as any;
// }

export function getProgram(wallet: AnchorWallet, connection: Connection) {
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  setProvider(provider);
  const idlWithAddress = { ...idl, address: PROGRAM_ID.toString() };
  return new Program(idl as any, PROGRAM_ID, provider) as any;
}

// ── Instructions

/**
 * Create a new escrow. Client signs.
 * Returns the transaction signature.
 */
export async function createEscrow(
  wallet: AnchorWallet,
  connection: Connection,
  params: {
    escrowId: number;
    freelancer: PublicKey;
    amountSol: number;
    deadlineDate: Date;
    description: string;
  },
): Promise<{ sig: string; escrowPubkey: PublicKey }> {
  const program = getProgram(wallet, connection);
  const escrowId = new BN(params.escrowId);
  const amount = solToLamports(params.amountSol);
  const deadline = new BN(Math.floor(params.deadlineDate.getTime() / 1000));

  const [escrowPubkey] = getEscrowPDA(wallet.publicKey, escrowId);
  const [vaultPubkey] = getVaultPDA(escrowPubkey);

  const sig = await program.methods
    .createEscrow(escrowId, amount, deadline, params.description)
    .accounts({
      escrow: escrowPubkey,
      vault: vaultPubkey,
      client: wallet.publicKey,
      freelancer: params.freelancer,
      systemProgram: SystemProgram.programId,
    })
    .rpc();

  return { sig, escrowPubkey };
}

/**
 * Freelancer accepts the job.
 */
export async function acceptJob(
  wallet: AnchorWallet,
  connection: Connection,
  escrowPubkey: PublicKey,
): Promise<string> {
  const program = getProgram(wallet, connection);
  return program.methods
    .acceptJob()
    .accounts({
      escrow: escrowPubkey,
      freelancer: wallet.publicKey,
    })
    .rpc();
}

/**
 * Client deposits SOL into the vault.
 */
export async function deposit(
  wallet: AnchorWallet,
  connection: Connection,
  escrowPubkey: PublicKey,
): Promise<string> {
  const program = getProgram(wallet, connection);
  const [vaultPubkey] = getVaultPDA(escrowPubkey);

  return program.methods
    .deposit()
    .accounts({
      escrow: escrowPubkey,
      vault: vaultPubkey,
      client: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
}

/**
 * Freelancer submits proof of work (GitHub URL or IPFS CID).
 */
export async function submitProof(
  wallet: AnchorWallet,
  connection: Connection,
  escrowPubkey: PublicKey,
  proofUrl: string,
): Promise<string> {
  const program = getProgram(wallet, connection);
  return program.methods
    .submitProof(proofUrl)
    .accounts({
      escrow: escrowPubkey,
      freelancer: wallet.publicKey,
    })
    .rpc();
}

/**
 * Client approves work and releases payment to freelancer.
 */
export async function releasePayment(
  wallet: AnchorWallet,
  connection: Connection,
  escrowPubkey: PublicKey,
  freelancerPubkey: PublicKey,
): Promise<string> {
  const program = getProgram(wallet, connection);
  const [vaultPubkey] = getVaultPDA(escrowPubkey);

  return program.methods
    .releasePayment()
    .accounts({
      escrow: escrowPubkey,
      vault: vaultPubkey,
      freelancer: freelancerPubkey,
      client: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
}

/**
 * Client cancels escrow (only when no funds deposited yet).
 */
export async function cancelEscrow(
  wallet: AnchorWallet,
  connection: Connection,
  escrowPubkey: PublicKey,
): Promise<string> {
  const program = getProgram(wallet, connection);
  return program.methods
    .cancel()
    .accounts({
      escrow: escrowPubkey,
      client: wallet.publicKey,
    })
    .rpc();
}

/**
 * Client refunds SOL after deadline passes (funds already in vault).
 */
export async function refundEscrow(
  wallet: AnchorWallet,
  connection: Connection,
  escrowPubkey: PublicKey,
): Promise<string> {
  const program = getProgram(wallet, connection);
  const [vaultPubkey] = getVaultPDA(escrowPubkey);

  return program.methods
    .refund()
    .accounts({
      escrow: escrowPubkey,
      vault: vaultPubkey,
      client: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
}

/**
 * Close escrow and reclaim rent (after Completed or Cancelled).
 */
export async function closeEscrow(
  wallet: AnchorWallet,
  connection: Connection,
  escrowPubkey: PublicKey,
): Promise<string> {
  const program = getProgram(wallet, connection);
  const [vaultPubkey] = getVaultPDA(escrowPubkey);

  return program.methods
    .closeEscrow()
    .accounts({
      escrow: escrowPubkey,
      vault: vaultPubkey,
      client: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
}

//  Fetch Helpers

/**
 * Fetch all escrows where wallet is the client.
 */
export async function fetchClientEscrows(
  wallet: AnchorWallet,
  connection: Connection,
): Promise<EscrowWithPubkey[]> {
  const program = getProgram(wallet, connection);
  const escrows = await program.account.escrowState.all([
    {
      memcmp: {
        offset: 8 + 8, // discriminator + escrowId
        bytes: wallet.publicKey.toBase58(),
      },
    },
  ]);
  return escrows as EscrowWithPubkey[];
}

/**
 * Fetch all escrows where wallet is the freelancer.
 */
export async function fetchFreelancerEscrows(
  wallet: AnchorWallet,
  connection: Connection,
): Promise<EscrowWithPubkey[]> {
  const program = getProgram(wallet, connection);
  const escrows = await program.account.escrowState.all([
    {
      memcmp: {
        offset: 8 + 8 + 32, // discriminator + escrowId + client
        bytes: wallet.publicKey.toBase58(),
      },
    },
  ]);
  return escrows as EscrowWithPubkey[];
}

/**
 * Fetch a single escrow by its public key.
 */
export async function fetchEscrow(
  wallet: AnchorWallet,
  connection: Connection,
  escrowPubkey: PublicKey,
): Promise<EscrowAccount> {
  const program = getProgram(wallet, connection);
  return program.account.escrowState.fetch(
    escrowPubkey,
  ) as Promise<EscrowAccount>;
}
