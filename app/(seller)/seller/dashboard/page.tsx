'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertTriangle,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StatCard } from '@/components/stat-card';
import { mockSellerAnalytics, mockProducts, mockOrders, mockSellers } from '@/lib/mock-data';
import type { OrderStatus } from '@/types';

const statusColors: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  out_for_delivery: 'bg-cyan-100 text-cyan-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800',
};

export default function SellerDashboardPage() {
  const seller = mockSellers[0];
  const sellerProducts = mockProducts.filter((p) => p.sellerId === seller.id);
  const lowStockProducts = sellerProducts.filter(
    (p) => p.availabilityStatus === 'low_stock' || p.stockQuantity < 10
  );
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Welcome back, {seller.firstName}!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s an overview of your store performance
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={`$${mockSellerAnalytics.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          description="This month"
          trend="up"
          trendValue="+12.5%"
        />
        <StatCard
          title="Total Orders"
          value={mockSellerAnalytics.totalOrders}
          icon={ShoppingCart}
          description="All time"
        />
        <StatCard
          title="Pending Orders"
          value={mockSellerAnalytics.pendingOrders}
          icon={Clock}
          description="Needs attention"
          trend="warning"
        />
        <StatCard
          title="Active Products"
          value={mockSellerAnalytics.activeListings}
          icon={Package}
          description={`${sellerProducts.length} total products`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Orders</CardTitle>
            <Link href="/seller/orders">
              <Button variant="ghost" size="sm" className="gap-1">
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <div className="py-8 text-center">
                <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-muted-foreground">No orders yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={order.items[0]?.productImage || '/placeholder.jpg'}
                          alt="Order"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">#{order.orderNumber}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} items
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={`${statusColors[order.status]} capitalize`}>
                        {order.status.replace('_', ' ')}
                      </Badge>
                      <p className="mt-1 text-sm font-medium">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length === 0 ? (
              <div className="py-4 text-center">
                <CheckCircle className="mx-auto h-8 w-8 text-success" />
                <p className="mt-2 text-sm text-muted-foreground">All products well stocked!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
                        <Image
                          src={product.images[0]?.url || '/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium truncate max-w-32">{product.name}</p>
                        <p className="text-xs text-destructive">
                          {product.stockQuantity} left
                        </p>
                      </div>
                    </div>
                    <Link href={`/seller/products/${product.id}/edit`}>
                      <Button variant="outline" size="sm">
                        Restock
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Top Selling Products</CardTitle>
          <Link href="/seller/products">
            <Button variant="ghost" size="sm" className="gap-1">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockSellerAnalytics.topProducts.map((item, index) => {
              const product = sellerProducts.find((p) => p.id === item.productId);
              return (
                <div
                  key={item.productId}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={product?.images[0]?.url || '/placeholder.jpg'}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        ${product?.price.toFixed(2)} / {product?.unit}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{item.sales} sales</p>
                    <Link href={`/seller/products/${item.productId}`}>
                      <Button variant="ghost" size="sm" className="mt-1 gap-1">
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
