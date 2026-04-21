'use client';

import Link from 'next/link';
import { CheckCircle, Package, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function OrderSuccessPage() {
  const orderNumber = `AGM-${Date.now().toString().slice(-8)}`;

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="w-full max-w-lg text-center">
        <CardContent className="pt-8 pb-8">
          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold sm:text-3xl">Order Placed Successfully!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {/* Order Number */}
          <div className="mt-6 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="text-xl font-bold text-primary">{orderNumber}</p>
          </div>

          {/* Info */}
          <div className="mt-6 space-y-3 text-sm text-muted-foreground">
            <p>We&apos;ve sent a confirmation email with your order details.</p>
            <p>You can track your order status in your dashboard.</p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/buyer/orders">
              <Button className="w-full gap-2 sm:w-auto">
                <Package className="h-4 w-4" />
                View My Orders
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" className="w-full gap-2 sm:w-auto">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Link href="/" className="mt-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
