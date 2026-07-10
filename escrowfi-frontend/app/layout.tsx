import "buffer";

import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { SolanaWalletProvider } from "@/components/wallet-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "EscrowFi",
  description: "Trustless escrow payments for freelance work on Solana",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        <SolanaWalletProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#18181B",
                color: "#FAFAFA",
                border: "1px solid #27272A",
              },
            }}
          />
        </SolanaWalletProvider>
      </body>
    </html>
  );
}
