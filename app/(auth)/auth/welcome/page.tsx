'use client';

import Link from 'next/link';
import { ShoppingBag, Store, ArrowRight, Check } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const roles = [
  {
    id: 'buyer',
    title: 'I want to Buy',
    description: 'Browse and purchase fresh pork, crops, and farm produce from trusted sellers.',
    icon: ShoppingBag,
    href: '/auth/signup/buyer',
    benefits: [
      'Access to verified sellers',
      'Secure payment options',
      'Track your orders',
      'Save favorites to wishlist',
    ],
    color: 'bg-primary',
  },
  {
    id: 'seller',
    title: 'I want to Sell',
    description: 'List your products and reach thousands of buyers across Zimbabwe.',
    icon: Store,
    href: '/auth/signup/seller',
    benefits: [
      'Reach more customers',
      'Easy product management',
      'Secure payments to your account',
      'Analytics dashboard',
    ],
    color: 'bg-accent',
  },
];

export default function WelcomePage() {
  return (
    <div className="w-full max-w-4xl py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome to Agro Market
        </h1>
        <p className="mt-2 text-muted-foreground">
          Choose how you would like to use the platform
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {roles.map((role) => (
          <Link key={role.id} href={role.href}>
            <Card className="group h-full cursor-pointer transition-all hover:shadow-lg hover:border-primary">
              <CardHeader>
                <div className={cn(
                  'mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-white transition-transform group-hover:scale-110',
                  role.color
                )}>
                  <role.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl">{role.title}</CardTitle>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="mb-6 space-y-2">
                  {role.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-success" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button className="w-full group-hover:bg-primary">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Already have account */}
      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      {/* Info Section */}
      <div className="mt-12 rounded-2xl bg-muted/50 p-6 text-center">
        <h3 className="mb-2 font-semibold">Why Agro Market?</h3>
        <p className="text-sm text-muted-foreground">
          We connect local farmers and sellers with buyers across Zimbabwe. 
          Our platform ensures secure transactions, quality products, and reliable delivery.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4 text-success" />
            <span>Verified Sellers</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4 text-success" />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4 text-success" />
            <span>Fresh Products</span>
          </div>
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4 text-success" />
            <span>Local Support</span>
          </div>
        </div>
      </div>
    </div>
  );
}
