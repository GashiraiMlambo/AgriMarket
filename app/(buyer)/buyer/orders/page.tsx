'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, Package, ChevronRight, RotateCcw, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EmptyState } from '@/components/empty-state';
import { mockOrders } from '@/lib/mock-data';
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

export default function BuyerOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ordersByStatus = {
    all: mockOrders.length,
    pending: mockOrders.filter((o) => o.status === 'pending').length,
    processing: mockOrders.filter((o) => ['confirmed', 'processing', 'shipped', 'out_for_delivery'].includes(o.status)).length,
    delivered: mockOrders.filter((o) => o.status === 'delivered').length,
    cancelled: mockOrders.filter((o) => o.status === 'cancelled' || o.status === 'refunded').length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">My Orders</h1>
        <p className="mt-1 text-muted-foreground">Track and manage your orders</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Orders ({ordersByStatus.all})</SelectItem>
            <SelectItem value="pending">Pending ({ordersByStatus.pending})</SelectItem>
            <SelectItem value="processing">Processing ({ordersByStatus.processing})</SelectItem>
            <SelectItem value="delivered">Delivered ({ordersByStatus.delivered})</SelectItem>
            <SelectItem value="cancelled">Cancelled ({ordersByStatus.cancelled})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          icon="package"
          title="No orders found"
          description={
            searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : "You haven't placed any orders yet"
          }
          action={
            <Link href="/products">
              <Button>Start Shopping</Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Order Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b bg-muted/50 p-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order Number</p>
                      <p className="font-semibold">{order.orderNumber}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm text-muted-foreground">Order Date</p>
                      <p className="font-medium">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-semibold text-primary">${order.total.toFixed(2)}</p>
                    </div>
                  </div>
                  <Badge className={`${statusColors[order.status]} capitalize`}>
                    {order.status.replace('_', ' ')}
                  </Badge>
                </div>

                {/* Order Items */}
                <div className="p-4">
                  <div className="space-y-3">
                    {order.items.slice(0, 2).map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                          <Image
                            src={item.productImage || '/placeholder.jpg'}
                            alt={item.productName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium truncate">{item.productName}</p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity} x ${item.unitPrice.toFixed(2)}
                          </p>
                        </div>
                        <p className="font-medium">${item.totalPrice.toFixed(2)}</p>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-sm text-muted-foreground">
                        +{order.items.length - 2} more items
                      </p>
                    )}
                  </div>

                  {/* Order Actions */}
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t pt-4">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <RotateCcw className="h-4 w-4" />
                        <span className="hidden sm:inline">Reorder</span>
                      </Button>
                      <Button variant="outline" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Invoice</span>
                      </Button>
                    </div>
                    <Link href={`/buyer/orders/${order.id}`}>
                      <Button size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        View Details
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
