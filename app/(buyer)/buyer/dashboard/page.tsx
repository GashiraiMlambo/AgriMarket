'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Heart,
  MapPin,
  Clock,
  ShoppingCart,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/stat-card';
import { ProductCard } from '@/components/product-card';
import { useWishlistStore, useRecentlyViewedStore } from '@/lib/store';
import { mockOrders, mockProducts, mockBuyer } from '@/lib/mock-data';

export default function BuyerDashboardPage() {
  const wishlistItems = useWishlistStore((state) => state.items);
  const recentlyViewed = useRecentlyViewedStore((state) => state.items);

  const recentOrders = mockOrders.slice(0, 3);
  const wishlistProducts = mockProducts.filter((p) => wishlistItems.includes(p.id)).slice(0, 4);
  const recentlyViewedProducts = mockProducts.filter((p) => recentlyViewed.includes(p.id)).slice(0, 4);
  const recommendedProducts = mockProducts.filter((p) => p.isFeatured).slice(0, 4);

  const orderStats = {
    total: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === 'pending' || o.status === 'processing').length,
    delivered: mockOrders.filter((o) => o.status === 'delivered').length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome back, {mockBuyer.firstName}!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s what&apos;s happening with your orders today.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Orders"
          value={orderStats.total}
          icon={Package}
          description="All time orders"
        />
        <StatCard
          title="Pending Orders"
          value={orderStats.pending}
          icon={Clock}
          description="Awaiting delivery"
          trend="warning"
        />
        <StatCard
          title="Delivered"
          value={orderStats.delivered}
          icon={TrendingUp}
          description="Successfully delivered"
          trend="up"
        />
        <StatCard
          title="Wishlist Items"
          value={wishlistItems.length}
          icon={Heart}
          description="Saved for later"
        />
      </div>

      {/* Recent Orders */}
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Orders</CardTitle>
          <Link href="/buyer/orders">
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <div className="py-8 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">No orders yet</p>
              <Link href="/products">
                <Button className="mt-4">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <Link key={order.id} href={`/buyer/orders/${order.id}`}>
                  <div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={order.items[0]?.productImage || '/placeholder.jpg'}
                        alt={order.items[0]?.productName || 'Order'}
                        fill
                        className="object-cover"
                      />
                      {order.items.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white">
                          +{order.items.length - 1}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium">Order #{order.orderNumber}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {order.items.map((i) => i.productName).join(', ')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          order.status === 'delivered'
                            ? 'default'
                            : order.status === 'cancelled'
                            ? 'destructive'
                            : 'secondary'
                        }
                        className="capitalize"
                      >
                        {order.status.replace('_', ' ')}
                      </Badge>
                      <p className="mt-1 font-medium">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Wishlist */}
      {wishlistProducts.length > 0 && (
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Wishlist</h2>
            <Link href="/buyer/wishlist">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewedProducts.length > 0 && (
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recently Viewed</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentlyViewedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Recommended */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recommended for You</h2>
          <Link href="/products">
            <Button variant="ghost" size="sm" className="gap-1">
              Browse All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
