"use client";

import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

export function FloatingActionButton() {
  return (
    <Link href="/dashboard/create-escrow">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 lg:hidden z-50"
      >
        <Button 
          size="lg" 
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-[#7C3AED] to-[#9945FF] hover:shadow-xl hover:shadow-[#7C3AED]/50 transition-all"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </motion.div>
    </Link>
  );
}
