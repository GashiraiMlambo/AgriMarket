'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronRight,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Phone,
  MessageCircle,
  Download,
  RotateCcw,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { mockOrders } from '@/lib/mock-data';
import type { OrderStatus } from '@/types';

const statusSteps: { status: OrderStatus; label: string; icon: typeof Package }[] = [
  { status: 'pending', label: 'Order Placed', icon: Package },
  { status: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { status: 'processing', label: 'Processing', icon: Clock },
  { status: 'shipped', label: 'Shipped', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: CheckCircle },
];

const statusIndex: Record<OrderStatus, number> = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  out_for_delivery: 4,
  delivered: 5,
  cancelled: -1,
  refunded: -1,
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Order not found</h1>
          <p className="mt-2 text-muted-foreground">The order you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/buyer/orders">
            <Button className="mt-4">View All Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentStatusIndex = statusIndex[order.status];
  const isCancelled = order.status === 'cancelled' || order.status === 'refunded';

  const paymentMethodLabels: Record<string, string> = {
    ecocash: 'EcoCash',
    onemoney: 'OneMoney',
    visa: 'Visa Card',
    paypal: 'PayPal',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/buyer/orders" className="hover:text-foreground">Orders</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{order.orderNumber}</span>
      </nav>

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Order #{order.orderNumber}</h1>
          <p className="mt-1 text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Download Invoice
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Reorder
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Order Status Tracker */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Order Status
                <Badge
                  variant={
                    isCancelled
                      ? 'destructive'
                      : order.status === 'delivered'
                      ? 'default'
                      : 'secondary'
                  }
                  className="capitalize"
                >
                  {order.status.replace('_', ' ')}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isCancelled ? (
                <div className="flex items-center gap-4 rounded-lg bg-destructive/10 p-4">
                  <XCircle className="h-8 w-8 text-destructive" />
                  <div>
                    <p className="font-medium">Order {order.status}</p>
                    <p className="text-sm text-muted-foreground">
                      This order has been {order.status}. Contact support for more information.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute left-4 top-0 h-full w-0.5 bg-muted" />
                  <div className="space-y-6">
                    {statusSteps.map((step, index) => {
                      const isCompleted = index <= currentStatusIndex;
                      const isCurrent = index === currentStatusIndex;
                      return (
                        <div key={step.status} className="relative flex items-start gap-4">
                          <div
                            className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${
                              isCompleted
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}
                          >
                            <step.icon className="h-4 w-4" />
                          </div>
                          <div className={isCurrent ? '' : 'opacity-60'}>
                            <p className={`font-medium ${isCurrent ? 'text-primary' : ''}`}>
                              {step.label}
                            </p>
                            {isCurrent && order.estimatedDelivery && (
                              <p className="text-sm text-muted-foreground">
                                Estimated delivery: {order.estimatedDelivery}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items ({order.items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.productImage || '/placeholder.jpg'}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link href={`/products/${item.productId}`} className="font-medium hover:text-primary">
                        {item.productName}
                      </Link>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} x ${item.unitPrice.toFixed(2)} / {item.unit}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="mr-1 h-3 w-3" />
                          Review
                        </Button>
                      </div>
                    </div>
                    <p className="font-semibold">${item.totalPrice.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-success">-${order.discount.toFixed(2)}</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span className="text-primary">${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="font-medium">{order.deliveryAddress.fullName}</p>
              <p className="text-muted-foreground">{order.deliveryAddress.street}</p>
              <p className="text-muted-foreground">
                {order.deliveryAddress.city}, {order.deliveryAddress.province}
              </p>
              <p className="text-muted-foreground">{order.deliveryAddress.country}</p>
              <p className="mt-2 flex items-center gap-1 text-muted-foreground">
                <Phone className="h-4 w-4" />
                {order.deliveryAddress.phone}
              </p>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method</span>
                <span>{paymentMethodLabels[order.paymentMethod]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={order.paymentStatus === 'completed' ? 'default' : 'secondary'} className="capitalize">
                  {order.paymentStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Need Help */}
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium">Need Help?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Contact our support team for any questions about your order.
              </p>
              <Button variant="outline" className="mt-3 w-full gap-2">
                <MessageCircle className="h-4 w-4" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
