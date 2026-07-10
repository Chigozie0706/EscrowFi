"use client";

export function GradientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#7C3AED]/10 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#14F195]/5 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '6s', animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#9945FF]/5 rounded-full blur-3xl animate-pulse" 
           style={{ animationDuration: '8s', animationDelay: '2s' }} />
    </div>
  );
}
