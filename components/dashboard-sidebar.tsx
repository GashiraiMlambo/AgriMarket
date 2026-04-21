'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Heart,
  MapPin,
  Settings,
  Bell,
  MessageCircle,
  User,
  Store,
  Plus,
  BarChart3,
  Wallet,
  FileText,
  BadgeCheck,
  LogOut,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { useUIStore, useAuthStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

const buyerNavItems: NavItem[] = [
  { href: '/buyer/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/buyer/orders', label: 'My Orders', icon: Package },
  { href: '/buyer/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/buyer/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/buyer/addresses', label: 'Addresses', icon: MapPin },
  { href: '/buyer/messages', label: 'Messages', icon: MessageCircle },
  { href: '/buyer/notifications', label: 'Notifications', icon: Bell },
  { href: '/buyer/profile', label: 'Profile', icon: User },
  { href: '/buyer/settings', label: 'Settings', icon: Settings },
];

const sellerNavItems: NavItem[] = [
  { href: '/seller/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/seller/products', label: 'Products', icon: Store },
  { href: '/seller/products/new', label: 'Add Product', icon: Plus },
  { href: '/seller/orders', label: 'Orders', icon: Package },
  { href: '/seller/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/seller/earnings', label: 'Earnings', icon: Wallet },
  { href: '/seller/reviews', label: 'Reviews', icon: FileText },
  { href: '/seller/messages', label: 'Messages', icon: MessageCircle },
  { href: '/seller/notifications', label: 'Notifications', icon: Bell },
  { href: '/seller/verification', label: 'Verification', icon: BadgeCheck },
  { href: '/seller/profile', label: 'Profile', icon: User },
  { href: '/seller/settings', label: 'Settings', icon: Settings },
];

interface DashboardSidebarProps {
  role: 'buyer' | 'seller';
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = role === 'buyer' ? buyerNavItems : sellerNavItems;

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <Logo showText={sidebarOpen || isMobile} size="sm" />
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hidden lg:flex"
          >
            {sidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => isMobile && setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {(sidebarOpen || isMobile) && (
                  <>
                    <span className="flex-1">{item.label}</span>
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className={cn(
                        'rounded-full px-2 py-0.5 text-xs',
                        isActive
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-primary text-primary-foreground'
                      )}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Logout */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start gap-3 text-muted-foreground hover:text-destructive',
            !sidebarOpen && !isMobile && 'justify-center'
          )}
          onClick={logout}
        >
          <LogOut className="h-5 w-5" />
          {(sidebarOpen || isMobile) && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 left-4 z-40 h-12 w-12 rounded-full shadow-lg lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Dashboard Navigation</SheetTitle>
          <SidebarContent isMobile />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          'sticky top-16 z-30 hidden h-[calc(100vh-4rem)] shrink-0 border-r bg-card transition-all duration-300 lg:block',
          sidebarOpen ? 'w-64' : 'w-[70px]'
        )}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
