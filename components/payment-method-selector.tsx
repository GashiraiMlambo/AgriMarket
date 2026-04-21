'use client';

import { CreditCard, Smartphone, Wallet } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import type { PaymentMethod } from '@/types';
import { cn } from '@/lib/utils';

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

const paymentMethods: {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}[] = [
  {
    id: 'ecocash',
    name: 'EcoCash',
    description: 'Pay with your EcoCash mobile wallet',
    icon: <Smartphone className="h-5 w-5" />,
    color: 'bg-green-600',
  },
  {
    id: 'onemoney',
    name: 'OneMoney',
    description: 'Pay with your OneMoney mobile wallet',
    icon: <Smartphone className="h-5 w-5" />,
    color: 'bg-orange-500',
  },
  {
    id: 'visa',
    name: 'Visa Card',
    description: 'Pay with your Visa debit or credit card',
    icon: <CreditCard className="h-5 w-5" />,
    color: 'bg-blue-600',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay securely with your PayPal account',
    icon: <Wallet className="h-5 w-5" />,
    color: 'bg-blue-500',
  },
];

export function PaymentMethodSelector({ value, onChange }: PaymentMethodSelectorProps) {
  return (
    <RadioGroup
      value={value}
      onValueChange={(val) => onChange(val as PaymentMethod)}
      className="grid gap-3 sm:grid-cols-2"
    >
      {paymentMethods.map((method) => (
        <Label
          key={method.id}
          htmlFor={method.id}
          className="cursor-pointer"
        >
          <Card
            className={cn(
              'flex items-center gap-4 p-4 transition-all hover:shadow-md',
              value === method.id && 'border-2 border-primary ring-2 ring-primary/20'
            )}
          >
            <RadioGroupItem
              value={method.id}
              id={method.id}
              className="sr-only"
            />
            <div
              className={cn(
                'flex h-10 w-10 items-center justify-center rounded-lg text-white',
                method.color
              )}
            >
              {method.icon}
            </div>
            <div className="flex-1">
              <p className="font-medium">{method.name}</p>
              <p className="text-xs text-muted-foreground">{method.description}</p>
            </div>
            <div
              className={cn(
                'h-4 w-4 rounded-full border-2',
                value === method.id
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground'
              )}
            >
              {value === method.id && (
                <div className="m-0.5 h-2 w-2 rounded-full bg-white" />
              )}
            </div>
          </Card>
        </Label>
      ))}
    </RadioGroup>
  );
}

// Compact payment method display
export function PaymentMethodBadge({ method }: { method: PaymentMethod }) {
  const config = paymentMethods.find((m) => m.id === method);
  if (!config) return null;

  return (
    <div className="flex items-center gap-2">
      <div
        className={cn(
          'flex h-6 w-6 items-center justify-center rounded text-white',
          config.color
        )}
      >
        <Smartphone className="h-3 w-3" />
      </div>
      <span className="text-sm font-medium">{config.name}</span>
    </div>
  );
}
