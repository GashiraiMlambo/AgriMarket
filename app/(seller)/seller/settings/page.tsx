'use client';

import { useState } from 'react';
import { Bell, Lock, Eye, EyeOff, CreditCard, Store, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function SellerSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    lowStock: true,
    reviews: true,
    messages: true,
  });
  const [storeSettings, setStoreSettings] = useState({
    autoConfirm: false,
    vacationMode: false,
  });

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Password changed successfully');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Settings</h1>
        <p className="mt-1 text-muted-foreground">Manage your store and account settings</p>
      </div>

      <div className="space-y-6">
        {/* Store Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Store className="h-5 w-5" />
              Store Settings
            </CardTitle>
            <CardDescription>Configure your store preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-confirm">Auto-Confirm Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically confirm orders when payment is received
                </p>
              </div>
              <Switch
                id="auto-confirm"
                checked={storeSettings.autoConfirm}
                onCheckedChange={(checked) =>
                  setStoreSettings({ ...storeSettings, autoConfirm: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="vacation-mode">Vacation Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Temporarily pause your store and hide listings
                </p>
              </div>
              <Switch
                id="vacation-mode"
                checked={storeSettings.vacationMode}
                onCheckedChange={(checked) =>
                  setStoreSettings({ ...storeSettings, vacationMode: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>Choose what notifications you want to receive</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="new-orders">New Orders</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when you receive a new order
                </p>
              </div>
              <Switch
                id="new-orders"
                checked={notifications.newOrders}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, newOrders: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="low-stock">Low Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when products are running low
                </p>
              </div>
              <Switch
                id="low-stock"
                checked={notifications.lowStock}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, lowStock: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="reviews">New Reviews</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when customers leave reviews
                </p>
              </div>
              <Switch
                id="reviews"
                checked={notifications.reviews}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, reviews: checked })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="messages">Messages</Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when customers send messages
                </p>
              </div>
              <Switch
                id="messages"
                checked={notifications.messages}
                onCheckedChange={(checked) =>
                  setNotifications({ ...notifications, messages: checked })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Settings
            </CardTitle>
            <CardDescription>Manage your payout preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Payout Method</Label>
              <Select defaultValue="ecocash">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ecocash">EcoCash</SelectItem>
                  <SelectItem value="onemoney">OneMoney</SelectItem>
                  <SelectItem value="bank">Bank Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Payout Frequency</Label>
              <Select defaultValue="weekly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your password and security</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                />
              </div>
              <Button type="submit">Change Password</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
