"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Bell, 
  Shield, 
  Wallet,
  Mail,
  Smartphone
} from "lucide-react";
import { motion } from "motion/react";

export function Settings() {
  return (
    <div className="max-w-4xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </motion.div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  defaultValue="Alex" 
                  className="bg-input-background border-border/40"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  defaultValue="Johnson" 
                  className="bg-input-background border-border/40"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue="alex.johnson@email.com" 
                className="bg-input-background border-border/40"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input 
                id="bio" 
                defaultValue="Full-Stack Developer & Designer" 
                className="bg-input-background border-border/40"
              />
            </div>

            <Button className="bg-[#7C3AED] hover:bg-[#6D31D4]">
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Manage how you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div>
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive updates via email</div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator className="bg-border/40" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-[#7C3AED]" />
                </div>
                <div>
                  <div className="font-medium">Push Notifications</div>
                  <div className="text-sm text-muted-foreground">Get notified in-app</div>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator className="bg-border/40" />

            <div className="space-y-4">
              <h4 className="font-semibold">Email Preferences</h4>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Escrow Updates</div>
                  <div className="text-xs text-muted-foreground">Status changes on your escrows</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Payment Notifications</div>
                  <div className="text-xs text-muted-foreground">When you receive or send payments</div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium">Marketing Emails</div>
                  <div className="text-xs text-muted-foreground">Tips, news, and updates</div>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Wallet Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Wallet Settings
            </CardTitle>
            <CardDescription>Manage your connected wallets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-xl bg-[#14F195]/10 border border-[#14F195]/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-[#14F195]" />
                    <span className="text-sm font-medium">Connected</span>
                  </div>
                  <div className="font-mono text-sm">7x8kA...mPq9T</div>
                </div>
                <div className="text-2xl">👻</div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Phantom Wallet</span>
                <Button variant="ghost" size="sm">Disconnect</Button>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Connect Additional Wallet
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-border/40 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>Keep your account secure</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
              </div>
              <Switch />
            </div>

            <Separator className="bg-border/40" />

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Transaction Confirmations</div>
                <div className="text-sm text-muted-foreground">Require confirmation for payments</div>
              </div>
              <Switch defaultChecked />
            </div>

            <Separator className="bg-border/40" />

            <div>
              <h4 className="font-semibold mb-2">Recent Activity</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <span>Last login</span>
                  <span>June 28, 2026 at 10:30 AM</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                  <span>IP Address</span>
                  <span>192.168.1.1</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="border-destructive/40 bg-destructive/5 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>Irreversible actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Delete Account</div>
                <div className="text-sm text-muted-foreground">Permanently delete your account and all data</div>
              </div>
              <Button variant="destructive">Delete</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default Settings;
