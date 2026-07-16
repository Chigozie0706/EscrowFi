"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Zap,
  Globe,
  Lock,
  ArrowRight,
  CheckCircle2,
  Star,
  TrendingUp,
  Users,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    icon: Shield,
    title: "Secure Escrow",
    description:
      "Smart contracts ensure funds are only released when work is completed and approved.",
  },
  {
    icon: Zap,
    title: "Instant Payments",
    description:
      "Get paid instantly in SOL once the client approves your work. No waiting for bank transfers.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description:
      "Work with anyone, anywhere. No borders, no restrictions, no middlemen.",
  },
  {
    icon: Lock,
    title: "Trustless System",
    description:
      "Built on Solana blockchain for transparent, immutable, and secure transactions.",
  },
];

// const stats = [
//   { label: "Total Escrow Value", value: "$2.4M", icon: DollarSign },
//   { label: "Active Freelancers", value: "12,500+", icon: Users },
//   { label: "Jobs Completed", value: "45,000+", icon: CheckCircle2 },
//   { label: "Average Growth", value: "+127%", icon: TrendingUp }
// ];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Full-Stack Developer",
    content:
      "EscrowFi completely changed how I work with clients. No more payment delays or disputes. Everything is transparent and secure.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Design Agency Owner",
    content:
      "The best platform for managing freelance payments. The smart contracts give both parties peace of mind.",
    rating: 5,
  },
  {
    name: "Aisha Patel",
    role: "Web3 Developer",
    content:
      "Fast, secure, and incredibly easy to use. This is the future of freelance work.",
    rating: 5,
  },
];

const faqs = [
  {
    question: "How does EscrowFi work?",
    answer:
      "EscrowFi uses Solana smart contracts to hold funds in escrow until work is completed. The client deposits funds, the freelancer completes the work and submits proof, and once approved, funds are automatically released.",
  },
  {
    question: "What fees does EscrowFi charge?",
    answer:
      "We charge a flat 2.5% fee on all transactions, significantly lower than traditional platforms. Plus, you benefit from Solana's ultra-low gas fees.",
  },
  {
    question: "How long does it take to receive payment?",
    answer:
      "Once a client approves your work, payment is released instantly. Funds appear in your Solana wallet within seconds.",
  },
  {
    question: "Is my money safe?",
    answer:
      "Absolutely. All funds are held in audited smart contracts on the Solana blockchain. Neither party can access the funds until the agreed conditions are met.",
  },
  {
    question: "Do I need crypto experience?",
    answer:
      "Not at all! We've designed EscrowFi to be user-friendly for everyone. If you can use a regular app, you can use EscrowFi.",
  },
];

export function LandingPage() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border/40 backdrop-blur-xl sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#9945FF] flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold">EscrowFi</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection("features")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                How it Works
              </button>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Testimonials
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                FAQ
              </button>
            </div>

            {/* <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-[#7C3AED] hover:bg-[#6D31D4]">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7C3AED]/10 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#7C3AED]/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#14F195]/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 py-24 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C3AED]/10 border border-[#7C3AED]/20 mb-6">
              <Zap className="w-4 h-4 text-[#14F195]" />
              <span className="text-sm">Built on Solana</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Secure Freelance Payments on the Blockchain
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The decentralized escrow platform for Web3. Create secure jobs,
              submit work, and get paid instantly with zero trust required.
            </p>

            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/dashboard/create-escrow">
                <Button
                  size="lg"
                  className="bg-[#7C3AED] hover:bg-[#6D31D4] h-12 px-8"
                >
                  Create Escrow
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/dashboard/my-escrows">
                <Button size="lg" variant="outline" className="h-12 px-8">
                  Browse Jobs
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#14F195]" />
                <span>No setup fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#14F195]" />
                <span>Instant payouts</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#14F195]" />
                <span>2.5% platform fee</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-center pb-8">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-16 border-y border-border/40">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Why Choose EscrowFi?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for the modern workforce. Powered by blockchain technology.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="p-6 rounded-2xl bg-card border border-border/40 h-full hover:border-[#7C3AED]/50 transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#7C3AED]/10 flex items-center justify-center mb-4 group-hover:bg-[#7C3AED]/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-[#7C3AED]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and transparent. Get started in minutes.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "Client Creates Escrow",
                  description:
                    "Client creates a job posting and deposits funds into a secure smart contract escrow.",
                },
                {
                  step: "02",
                  title: "Freelancer Accepts Job",
                  description:
                    "Freelancer browses available jobs and accepts the one that fits their skills.",
                },
                {
                  step: "03",
                  title: "Work Completion",
                  description:
                    "Freelancer completes the work and submits proof (code, files, demo links, etc.).",
                },
                {
                  step: "04",
                  title: "Payment Release",
                  description:
                    "Client reviews and approves the work. Funds are instantly released to the freelancer.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#9945FF] flex items-center justify-center text-2xl font-bold">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-lg">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Loved by Freelancers & Clients
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users already using EscrowFi.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-card border border-border/40"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#14F195] text-[#14F195]"
                    />
                  ))}
                </div>
                <p className="text-foreground/90 mb-6">{testimonial.content}</p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about EscrowFi.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/40 rounded-2xl px-6 bg-card"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#7C3AED]/20 via-[#9945FF]/20 to-[#14F195]/20" />
        <div className="container mx-auto px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the future of freelance work. Create your first escrow in
              minutes.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-[#7C3AED] hover:bg-[#6D31D4] h-14 px-10 text-lg"
              >
                Launch App
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#9945FF] flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold">EscrowFi</span>
              </div>
              <p className="text-sm text-muted-foreground">
                The decentralized escrow platform built on Solana.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Licenses
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2026 EscrowFi. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Discord
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
