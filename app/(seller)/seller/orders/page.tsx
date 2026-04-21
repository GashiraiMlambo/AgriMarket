'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Eye, MoreVertical, Package, Truck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EmptyState } from '@/components/empty-state';
import { mockOrders } from '@/lib/mock-data';
import { toast } from 'sonner';
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

export default function SellerOrdersPage() {
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

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    toast.success(`Order status updated to ${newStatus.replace('_', ' ')}`);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Orders</h1>
        <p className="mt-1 text-muted-foreground">
          Manage and fulfill customer orders
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {[
          { label: 'Pending', count: mockOrders.filter((o) => o.status === 'pending').length, color: 'bg-yellow-500' },
          { label: 'Processing', count: mockOrders.filter((o) => ['confirmed', 'processing'].includes(o.status)).length, color: 'bg-blue-500' },
          { label: 'Shipped', count: mockOrders.filter((o) => o.status === 'shipped').length, color: 'bg-indigo-500' },
          { label: 'Delivered', count: mockOrders.filter((o) => o.status === 'delivered').length, color: 'bg-green-500' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-4">
              <div className={`h-3 w-3 rounded-full ${stat.color}`} />
              <div>
                <p className="text-2xl font-bold">{stat.count}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
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
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      {filteredOrders.length === 0 ? (
        <EmptyState
          icon="package"
          title="No orders found"
          description={
            searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Orders will appear here when customers place them'
          }
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <p className="font-medium">#{order.orderNumber}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{order.deliveryAddress.fullName}</p>
                        <p className="text-sm text-muted-foreground">{order.deliveryAddress.phone}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded">
                            <Image
                              src={order.items[0]?.productImage || '/placeholder.jpg'}
                              alt="Order"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm">
                            {order.items.length} item{order.items.length > 1 ? 's' : ''}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">${order.total.toFixed(2)}</span>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[order.status]}>
                          {order.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/seller/orders/${order.id}`}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'confirmed')}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Confirmed
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'processing')}>
                              <Package className="mr-2 h-4 w-4" />
                              Mark Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, 'shipped')}>
                              <Truck className="mr-2 h-4 w-4" />
                              Mark Shipped
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
