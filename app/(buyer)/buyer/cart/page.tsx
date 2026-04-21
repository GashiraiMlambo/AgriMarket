'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EmptyState } from '@/components/empty-state';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

const deliveryLabels: Record<string, string> = {
  pickup: 'Store Pickup',
  local_delivery: 'Local Delivery',
  nationwide: 'Nationwide',
};

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getDeliveryFee, getTotal } = useCartStore();

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    removeItem(productId);
    toast.success(`${productName} removed from cart`);
  };

  if (items.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="mb-8 text-2xl font-bold sm:text-3xl">Shopping Cart</h1>
        <EmptyState
          icon="cart"
          title="Your cart is empty"
          description="Looks like you haven't added any products yet."
          action={
            <Link href="/products">
              <Button className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                Start Shopping
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="mb-8 text-2xl font-bold sm:text-3xl">Shopping Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cart Items ({items.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-lg border p-4">
                  {/* Image */}
                  <Link href={`/products/${item.product.slug}`}>
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.product.images[0]?.url || '/placeholder.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-medium hover:text-primary">{item.product.name}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      Sold by: {item.product.sellerName}
                    </p>
                    
                    {/* Delivery Option */}
                    <div className="mt-2">
                      <Select
                        value={item.selectedDeliveryOption}
                        onValueChange={(value) => {
                          // In production, update delivery option in cart
                        }}
                      >
                        <SelectTrigger className="h-8 w-40 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {item.product.deliveryOptions.map((option) => (
                            <SelectItem key={option} value={option} className="text-xs">
                              {deliveryLabels[option]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price & Quantity */}
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                          disabled={item.quantity <= item.product.minOrderQuantity}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockQuantity}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {item.product.unit}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          {item.product.discountedPrice ? (
                            <>
                              <p className="font-semibold text-primary">
                                ${(item.product.discountedPrice * item.quantity).toFixed(2)}
                              </p>
                              <p className="text-xs text-muted-foreground line-through">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </p>
                            </>
                          ) : (
                            <p className="font-semibold">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleRemoveItem(item.productId, item.product.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Coupon */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input placeholder="Coupon code" className="pl-9" />
                </div>
                <Button variant="outline">Apply</Button>
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>
                    {getDeliveryFee() === 0 ? 'Free' : `$${getDeliveryFee().toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-success">-$0.00</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-primary">${getTotal().toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              <Link href="/buyer/checkout" className="w-full">
                <Button className="w-full gap-2" size="lg">
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/products" className="w-full">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
