import { LucideIcon, Package, ShoppingCart, Heart, Search, FileText, Bell, MessageCircle, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon = Package,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      <div className="mb-4 rounded-full bg-muted p-4">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && (
        action.href ? (
          <Link href={action.href}>
            <Button>{action.label}</Button>
          </Link>
        ) : (
          <Button onClick={action.onClick}>{action.label}</Button>
        )
      )}
    </div>
  );
}

// Pre-configured empty states
export function EmptyCart() {
  return (
    <EmptyState
      icon={ShoppingCart}
      title="Your cart is empty"
      description="Looks like you haven't added any products to your cart yet. Start shopping to fill it up!"
      action={{ label: 'Browse Products', href: '/products' }}
    />
  );
}

export function EmptyWishlist() {
  return (
    <EmptyState
      icon={Heart}
      title="Your wishlist is empty"
      description="Save products you like by clicking the heart icon. They'll appear here for easy access."
      action={{ label: 'Explore Products', href: '/products' }}
    />
  );
}

export function EmptyOrders() {
  return (
    <EmptyState
      icon={Package}
      title="No orders yet"
      description="You haven't placed any orders yet. Start shopping to see your orders here."
      action={{ label: 'Start Shopping', href: '/products' }}
    />
  );
}

export function EmptySearch({ query }: { query?: string }) {
  return (
    <EmptyState
      icon={Search}
      title="No results found"
      description={query ? `We couldn't find any products matching "${query}". Try a different search term.` : 'Try adjusting your filters or search terms.'}
      action={{ label: 'Clear Search', href: '/products' }}
    />
  );
}

export function EmptyProducts() {
  return (
    <EmptyState
      icon={Store}
      title="No products listed"
      description="You haven't listed any products yet. Start adding products to your store."
      action={{ label: 'Add Product', href: '/seller/products/new' }}
    />
  );
}

export function EmptyNotifications() {
  return (
    <EmptyState
      icon={Bell}
      title="No notifications"
      description="You're all caught up! New notifications will appear here."
    />
  );
}

export function EmptyMessages() {
  return (
    <EmptyState
      icon={MessageCircle}
      title="No messages"
      description="Start a conversation with a seller or buyer. Messages will appear here."
    />
  );
}

export function EmptyReviews() {
  return (
    <EmptyState
      icon={FileText}
      title="No reviews yet"
      description="This product hasn't received any reviews yet. Be the first to review!"
    />
  );
}
