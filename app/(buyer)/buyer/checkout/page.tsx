'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin,
  Plus,
  Truck,
  Store,
  ChevronRight,
  ShieldCheck,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { PaymentMethodSelector } from '@/components/payment-method-selector';
import { EmptyState } from '@/components/empty-state';
import { useCartStore } from '@/lib/store';
import { mockBuyer } from '@/lib/mock-data';
import type { PaymentMethod, DeliveryOption } from '@/types';
import { toast } from 'sonner';

const checkoutSchema = z.object({
  addressId: z.string().min(1, 'Please select a delivery address'),
  deliveryOption: z.enum(['pickup', 'local_delivery', 'nationwide']),
  paymentMethod: z.enum(['ecocash', 'onemoney', 'visa', 'paypal']),
  notes: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const { items, getSubtotal, getDeliveryFee, getTotal, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      addressId: mockBuyer.savedAddresses.find((a) => a.isDefault)?.id || '',
      deliveryOption: 'local_delivery',
      paymentMethod: 'ecocash',
      notes: '',
    },
  });

  const selectedAddressId = watch('addressId');
  const selectedDelivery = watch('deliveryOption');
  const selectedPayment = watch('paymentMethod');

  const selectedAddress = mockBuyer.savedAddresses.find((a) => a.id === selectedAddressId);

  const deliveryFees: Record<DeliveryOption, number> = {
    pickup: 0,
    local_delivery: 3.50,
    nationwide: 8.00,
  };

  const currentDeliveryFee = deliveryFees[selectedDelivery as DeliveryOption];
  const total = getSubtotal() + currentDeliveryFee;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    // Clear cart and redirect to success page
    clearCart();
    toast.success('Order placed successfully!');
    router.push('/buyer/orders/success');
  };

  if (items.length === 0) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="mb-8 text-2xl font-bold sm:text-3xl">Checkout</h1>
        <EmptyState
          icon="cart"
          title="Your cart is empty"
          description="Add some products to proceed with checkout."
          action={
            <Link href="/products">
              <Button>Browse Products</Button>
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/buyer/cart" className="hover:text-foreground">Cart</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Checkout</span>
      </nav>

      <h1 className="mb-8 text-2xl font-bold sm:text-3xl">Checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Delivery Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="h-5 w-5" />
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAddressId}
                  onValueChange={(value) => setValue('addressId', value)}
                  className="space-y-3"
                >
                  {mockBuyer.savedAddresses.map((address) => (
                    <label
                      key={address.id}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        selectedAddressId === address.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <RadioGroupItem value={address.id} className="mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{address.label}</span>
                          {address.isDefault && (
                            <span className="rounded bg-primary/10 px-2 py-0.5 text-xs text-primary">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {address.fullName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {address.street}, {address.city}
                        </p>
                        <p className="text-sm text-muted-foreground">{address.phone}</p>
                      </div>
                    </label>
                  ))}
                </RadioGroup>
                {errors.addressId && (
                  <p className="mt-2 text-sm text-destructive">{errors.addressId.message}</p>
                )}
                <Button variant="outline" className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Address
                </Button>
              </CardContent>
            </Card>

            {/* Delivery Option */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Truck className="h-5 w-5" />
                  Delivery Option
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedDelivery}
                  onValueChange={(value) => setValue('deliveryOption', value as DeliveryOption)}
                  className="space-y-3"
                >
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                      selectedDelivery === 'pickup'
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="pickup" />
                      <Store className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Store Pickup</p>
                        <p className="text-sm text-muted-foreground">
                          Pick up from seller&apos;s location
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold text-success">Free</span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                      selectedDelivery === 'local_delivery'
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="local_delivery" />
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Local Delivery</p>
                        <p className="text-sm text-muted-foreground">
                          Same-day delivery within city
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold">$3.50</span>
                  </label>

                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors ${
                      selectedDelivery === 'nationwide'
                        ? 'border-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="nationwide" />
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Nationwide Shipping</p>
                        <p className="text-sm text-muted-foreground">
                          2-5 business days delivery
                        </p>
                      </div>
                    </div>
                    <span className="font-semibold">$8.00</span>
                  </label>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Lock className="h-5 w-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PaymentMethodSelector
                  selected={selectedPayment as PaymentMethod}
                  onChange={(method) => setValue('paymentMethod', method)}
                />
              </CardContent>
            </Card>

            {/* Order Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  {...register('notes')}
                  placeholder="Any special instructions for your order..."
                  rows={3}
                />
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
                {/* Items */}
                <div className="max-h-64 space-y-3 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={item.product.images[0]?.url || '/placeholder.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity} x ${(item.product.discountedPrice || item.product.price).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        ${((item.product.discountedPrice || item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>
                      {currentDeliveryFee === 0 ? 'Free' : `$${currentDeliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                {/* Security Note */}
                <div className="flex items-center gap-2 rounded-lg bg-muted p-3 text-xs text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>Processing...</>
                  ) : (
                    <>Place Order - ${total.toFixed(2)}</>
                  )}
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By placing this order, you agree to our{' '}
                  <Link href="/terms" className="underline hover:text-foreground">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="underline hover:text-foreground">
                    Privacy Policy
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
