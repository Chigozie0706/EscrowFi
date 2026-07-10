"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar,
  Star,
  Briefcase,
  Award,
  Edit,
  ExternalLink
} from "lucide-react";
import { motion } from "motion/react";

const skills = [
  "React", "TypeScript", "Solana", "Web3", "UI/UX Design", 
  "Smart Contracts", "Figma", "Tailwind CSS"
];

const completedProjects = [
  {
    title: "E-commerce Platform",
    client: "TechCorp Inc.",
    rating: 5,
    amount: "12.5 SOL",
    date: "June 2026"
  },
  {
    title: "NFT Marketplace",
    client: "CryptoArt",
    rating: 5,
    amount: "18.0 SOL",
    date: "May 2026"
  },
  {
    title: "DeFi Dashboard",
    client: "Protocol Labs",
    rating: 5,
    amount: "25.0 SOL",
    date: "April 2026"
  }
];

export function Profile() {
  return (
    <div className="max-w-5xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Profile</h1>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#9945FF] flex items-center justify-center flex-shrink-0">
                <User className="w-16 h-16 text-white" />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Alex Johnson</h2>
                    <p className="text-muted-foreground">Full-Stack Developer & Designer</p>
                  </div>
                  <Badge variant="outline" className="bg-[#14F195]/10 text-[#14F195] border-[#14F195]/20">
                    <Award className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    alex.johnson@email.com
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Joined May 2024
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    48 Jobs Completed
                  </div>
                </div>

                <div className="flex items-center gap-6 p-4 rounded-xl bg-gradient-to-r from-[#7C3AED]/10 to-[#9945FF]/10 border border-[#7C3AED]/20">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Rating</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-[#14F195] text-[#14F195]" />
                      <span className="text-xl font-bold">5.0</span>
                      <span className="text-sm text-muted-foreground">(48 reviews)</span>
                    </div>
                  </div>
                  <div className="h-12 w-px bg-border/40" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Earned</div>
                    <div className="text-xl font-bold text-[#14F195]">124.5 SOL</div>
                  </div>
                  <div className="h-12 w-px bg-border/40" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Success Rate</div>
                    <div className="text-xl font-bold">100%</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Experienced full-stack developer specializing in Web3 and blockchain technologies. 
                Passionate about building decentralized applications on Solana with a focus on 
                user experience and performance. 5+ years of experience in React, TypeScript, 
                and modern web development.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    variant="outline" 
                    className="bg-[#7C3AED]/10 text-[#7C3AED] border-[#7C3AED]/20"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Portfolio & Completed Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {completedProjects.map((project, index) => (
              <div 
                key={index}
                className="p-4 rounded-xl border border-border/40 hover:border-[#7C3AED]/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{project.title}</h4>
                    <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-border/40">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      {[...Array(project.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#14F195] text-[#14F195]" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                  </div>
                  <span className="font-semibold text-[#14F195]">{project.amount}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Wallet Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 rounded-xl bg-muted/30 font-mono text-sm">
              <div className="text-xs text-muted-foreground mb-2">Solana Wallet Address</div>
              <div className="break-all">7x8kA...mPq9T</div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Profile;
