'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Heart,
  Bell,
  User,
  ChevronDown,
  LogOut,
  Package,
  Settings,
  Store,
  LayoutDashboard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { useAuthStore } from '@/lib/store';
import { useCartStore } from '@/lib/store';
import { useNotificationStore } from '@/lib/store';
import { useWishlistStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { productCategories } from '@/lib/mock-data';

const publicNavLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/products?category=pork_meat', label: 'Pork Meat' },
  { href: '/products?category=vegetables', label: 'Vegetables' },
  { href: '/products?category=grains', label: 'Grains' },
  { href: '/sellers', label: 'Sellers' },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { user, isAuthenticated, logout } = useAuthStore();
  const cartItemCount = useCartStore((state) => state.itemCount());
  const unreadNotifications = useNotificationStore((state) => state.unreadCount);
  const wishlistCount = useWishlistStore((state) => state.items.length);

  const isBuyer = user?.role === 'buyer';
  const isSeller = user?.role === 'seller';

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Logo className="shrink-0" />

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {publicNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                  pathname === link.href || pathname.startsWith(link.href + '?')
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground">
                  Categories <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {productCategories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={`/products?category=${category.id}`}>
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden flex-1 max-w-md lg:flex">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4"
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist - Buyer only */}
            {(!isAuthenticated || isBuyer) && (
              <Link href="/buyer/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                      {wishlistCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* Cart - Buyer only */}
            {(!isAuthenticated || isBuyer) && (
              <Link href="/buyer/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* Notifications */}
            {isAuthenticated && (
              <Link href={isSeller ? '/seller/notifications' : '/buyer/notifications'}>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadNotifications > 0 && (
                    <Badge variant="destructive" className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.firstName}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    <span className="hidden md:inline-block">{user?.firstName}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  {isBuyer ? (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/buyer/dashboard">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/buyer/orders">
                          <Package className="mr-2 h-4 w-4" />
                          My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/buyer/profile">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/seller/dashboard">
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/seller/products">
                          <Store className="mr-2 h-4 w-4" />
                          My Products
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/seller/orders">
                          <Package className="mr-2 h-4 w-4" />
                          Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/seller/profile">
                          <User className="mr-2 h-4 w-4" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={isSeller ? '/seller/settings' : '/buyer/settings'}>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/welcome">
                  <Button size="sm">Get Started</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-4 pt-4">
                  <Logo />
                  <nav className="flex flex-col gap-1">
                    {publicNavLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent',
                          pathname === link.href ? 'bg-accent' : ''
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                  {!isAuthenticated && (
                    <div className="flex flex-col gap-2 border-t pt-4">
                      <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full">
                          Login
                        </Button>
                      </Link>
                      <Link href="/auth/welcome" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                  <div className="border-t pt-4">
                    <p className="mb-2 px-3 text-xs font-medium text-muted-foreground">Categories</p>
                    <nav className="flex flex-col gap-1">
                      {productCategories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/products?category=${category.id}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <form onSubmit={handleSearch} className="pb-4 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products, sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4"
                autoFocus
              />
            </div>
          </form>
        )}
      </div>
    </header>
  );
}
