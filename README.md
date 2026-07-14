# EscrowFi — Trustless Freelance Escrow on Solana

**Live Demo:** https://escrowfi-psi.vercel.app  
**Program ID:** `5z3EUnqxaD6TdwA9rJSG7EgT8tJaAm2vp4j61Wrqvy7D` (Devnet)  
**Explorer:** [View on Solana Explorer](https://explorer.solana.com/address/5z3EUnqxaD6TdwA9rJSG7EgT8tJaAm2vp4j61Wrqvy7D?cluster=devnet)

---

## What is EscrowFi?

EscrowFi is a decentralized escrow platform for freelance work, built on Solana. It eliminates payment fraud between clients and freelancers by locking SOL in a program-owned vault that only releases when both parties fulfill their obligations — no middlemen, no trust required.

**The problem:** Freelancers get scammed by clients who refuse to pay after work is delivered. Clients get scammed by freelancers who disappear after receiving payment. Traditional escrow services are slow, expensive, and require trusting a third party.

**The solution:** An on-chain escrow where SOL is locked in a PDA vault and released only when the client approves the freelancer's proof of delivery — enforced by code, not contracts

---

## How It Works

```
Client creates escrow  →  Freelancer accepts  →  Client deposits SOL
       ↓
Freelancer submits proof (GitHub URL / IPFS CID)
       ↓
Client releases payment  →  SOL sent to freelancer instantly
       ↓
(If deadline passes without completion → Client can refund)
```

---

## Features

| Feature                                                   | Status        |
| --------------------------------------------------------- | ------------- |
| Create escrow with deadline & description                 | ✅ Live       |
| Freelancer accepts job on-chain                           | ✅ Live       |
| SOL deposited into secure vault PDA                       | ✅ Live       |
| Proof of delivery (GitHub URL / IPFS CID) stored on-chain | ✅ Live       |
| Client releases payment to freelancer                     | ✅ Live       |
| Cancel (before deposit)                                   | ✅ Live       |
| Refund after deadline passes                              | ✅ Live       |
| Close escrow & reclaim rent                               | ✅ Live       |
| Escrow history via on-chain events                        | ✅ Live       |
| Freelancer reputation system                              | 🗺️ v2 Roadmap |
| Dispute resolution via arbiter                            | 🗺️ v2 Roadmap |
| IPFS file upload integration                              | 🗺️ v2 Roadmap |
| Mainnet deployment                                        | 🗺️ Post-audit |

---

## Architecture

### On-Chain Program (Anchor)

The program manages two PDAs per escrow:

```
EscrowState PDA
├── seeds: ["escrow", client_pubkey, escrow_id]
├── client: Pubkey
├── freelancer: Pubkey
├── amount: u64 (lamports)
├── deadline: i64 (Unix timestamp)
├── status: EscrowStatus enum
├── proof_url: String (GitHub URL or IPFS CID)
├── description: String
└── timestamps: created_at, accepted_at, funded_at, completed_at

VaultPDA
├── seeds: ["vault", escrow_pubkey]
├── space: 0 (holds SOL only, no data)
└── owned by the program — only releasable via program instructions
```

### Status Flow

```
Created → Accepted → Funded → ProofSubmitted → Completed
                                              ↘ Cancelled (via refund after deadline)
```

### Instructions

| Instruction       | Signer     | Action                           |
| ----------------- | ---------- | -------------------------------- |
| `create_escrow`   | Client     | Creates EscrowState + Vault PDAs |
| `accept_job`      | Freelancer | Moves status Created → Accepted  |
| `deposit`         | Client     | Transfers SOL client → Vault PDA |
| `submit_proof`    | Freelancer | Stores proof URL on-chain        |
| `release_payment` | Client     | Transfers SOL Vault → Freelancer |
| `cancel`          | Client     | Cancels before deposit           |
| `refund`          | Client     | Returns SOL after deadline       |
| `close_escrow`    | Client     | Reclaims rent from both accounts |

### Frontend Stack

- **Framework:** Next.js 16 (App Router)
- **Wallet:** `@solana/wallet-adapter-react` (Phantom, Solflare)
- **Program Client:** `@coral-xyz/anchor` v0.29
- **UI:** Tailwind CSS, Radix UI, shadcn/ui
- **Deployment:** Vercel

---

## Security Design

- **Vault is a zero-data PDA** owned by the program — no EOA can drain it
- **Bump stored on escrow state** — prevents PDA re-derivation attacks
- **Status guards** on every instruction — invalid state transitions revert
- **Deadline enforced by `Clock::get()`** — cannot be manipulated client-side
- **Refund only after deadline** — prevents premature client clawback
- **`cancel` vs `refund` separated** — clean accounting, no edge cases

---

## Running Locally

```bash
# Clone
git clone https://github.com/Chigozie0706/EscrowFi
cd EscrowFi/escrowfi-frontend

# Install
pnpm install

# Run
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) and connect Phantom on Devnet.

**Get Devnet SOL:** https://faucet.solana.com

---

## Anchor Program

The program source is in `/program/lib.rs`. It was built and deployed using [Solana Playground](https://beta.solpg.io).

To verify:

```bash
# Check the program is deployed
solana program show 5z3EUnqxaD6TdwA9rJSG7EgT8tJaAm2vp4j61Wrqvy7D --url devnet
```

---

## Roadmap

**v2 — Reputation System**
Each freelancer will have an on-chain reputation PDA that tracks completed escrows, total volume, and a score. Clients can filter freelancers by reputation before creating an escrow.

**v2 — Dispute Resolution**
An optional arbiter address stored at escrow creation. If client and freelancer disagree, the arbiter can release or refund. Arbiter is set at creation time — trustless by default, opt-in mediation available.

**v2 — IPFS Integration**
Freelancers will be able to upload files directly from the dashboard via Pinata/Web3.Storage. The IPFS CID is stored on-chain as proof of delivery.

**Mainnet**
After a security audit and sufficient devnet usage, EscrowFi will deploy to Solana mainnet with USDC payment support via SPL tokens.

---

## Built By

[@chigz on Farcaster](https://warpcast.com/chigz) — solo founder building in the Solana ecosystem.
