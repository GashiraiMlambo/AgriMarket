import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShoppingCart,
  Store,
  TruckIcon,
  ShieldCheck,
  Star,
  ChevronRight,
  Search,
  Leaf,
  BadgeCheck,
  Clock,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductCard } from '@/components/product-card';
import { mockProducts, productCategories, testimonials, faqData } from '@/lib/mock-data';

// Get featured products
const featuredPorkProducts = mockProducts.filter(
  (p) => p.category === 'pork_meat' && p.isFeatured
).slice(0, 4);
const featuredCropProducts = mockProducts.filter(
  (p) => p.category !== 'pork_meat' && p.isFeatured
).slice(0, 4);
const onSaleProducts = mockProducts.filter((p) => p.isOnSale).slice(0, 4);

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Promotional Banner */}
      <div className="bg-primary px-4 py-2 text-center text-primary-foreground">
        <p className="text-sm font-medium">
          Weekend Special: 20% off all pork products! Use code{' '}
          <span className="rounded bg-primary-foreground/20 px-2 py-0.5 font-bold">
            WEEKEND20
          </span>
        </p>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&q=80')] bg-cover bg-center opacity-5" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20">
                <Leaf className="mr-1 h-3 w-3" />
                Fresh from Local Farms
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-foreground">Fresh Pork,</span>
                <br />
                <span className="text-primary">Farm Crops,</span>
                <br />
                <span className="text-foreground">Trusted Trade</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                Zimbabwe&apos;s leading agricultural marketplace connecting farmers, 
                sellers, and buyers. Get quality pork and fresh produce delivered to your door.
              </p>
              
              {/* Search Bar */}
              <form className="mt-8 flex flex-col sm:flex-row gap-3" action="/products">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    name="search"
                    placeholder="Search products..."
                    className="h-12 pl-10 pr-4 text-base w-full"
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-6 w-full sm:w-auto">
                  Search
                </Button>
              </form>

              {/* CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/products" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Start Shopping
                  </Button>
                </Link>
                <Link href="/auth/welcome" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full gap-2">
                    <Store className="h-5 w-5" />
                    Become a Seller
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-10 grid grid-cols-1 gap-4 sm:flex sm:flex-wrap sm:items-center sm:gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-success" />
                  <span>Verified Sellers</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-5 w-5 text-success" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-3">
                  <TruckIcon className="h-5 w-5 text-success" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="relative h-[500px] w-full">
                <div className="absolute right-0 top-0 h-72 w-72 rounded-2xl bg-primary/10" />
                <div className="absolute bottom-0 left-0 h-72 w-72 rounded-2xl bg-accent/10" />
                <Image
                  src="https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=600&h=500&fit=crop"
                  alt="Fresh pork meat"
                  fill
                  className="rounded-2xl object-cover shadow-2xl"
                  priority
                />
                {/* Floating Card */}
                <div className="absolute -left-8 bottom-20 rounded-xl bg-card p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                      <TruckIcon className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="font-semibold">Fast Delivery</p>
                      <p className="text-sm text-muted-foreground">Same-day local delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="border-y bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <p className="mt-2 text-muted-foreground">
              Find exactly what you need from our wide selection
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
            {productCategories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group"
              >
                <Card className="overflow-hidden transition-all hover:shadow-lg hover:border-primary">
                  <div className="relative aspect-square">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-white">{category.name}</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pork Products */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Premium Pork Selection</h2>
              <p className="mt-1 text-muted-foreground">
                Fresh pork from trusted local farms
              </p>
            </div>
            <Link href="/products?category=pork_meat">
              <Button variant="ghost" className="gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPorkProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="bg-primary py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 text-center text-primary-foreground md:flex-row md:text-left">
            <div>
              <Badge className="mb-2 bg-primary-foreground/20 text-primary-foreground">
                <Clock className="mr-1 h-3 w-3" />
                Limited Time Offer
              </Badge>
              <h2 className="text-2xl font-bold sm:text-3xl">Weekend Flash Sale!</h2>
              <p className="mt-2 text-primary-foreground/80">
                Save up to 25% on selected fresh products. Hurry, offer ends Sunday!
              </p>
            </div>
            <Link href="/products?sale=true" className="w-full md:w-auto">
              <Button size="lg" variant="secondary" className="w-full gap-2">
                Shop Sale
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Crops & Vegetables */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">Fresh Crops & Vegetables</h2>
              <p className="mt-1 text-muted-foreground">
                Farm-fresh produce delivered to you
              </p>
            </div>
            <Link href="/products?category=vegetables">
              <Button variant="ghost" className="gap-1">
                View All
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredCropProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="mt-2 text-muted-foreground">
              Simple steps to get fresh products from farm to your table
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {/* For Buyers */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">For Buyers</h3>
              </div>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Browse Products', desc: 'Explore our wide selection of pork and farm produce' },
                  { step: 2, title: 'Add to Cart', desc: 'Select your items and quantities' },
                  { step: 3, title: 'Secure Checkout', desc: 'Pay securely with EcoCash, OneMoney, Visa, or PayPal' },
                  { step: 4, title: 'Get Delivered', desc: 'Receive fresh products at your doorstep' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* For Sellers */}
            <Card className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Store className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold">For Sellers</h3>
              </div>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Register Your Business', desc: 'Create a seller account and verify your farm' },
                  { step: 2, title: 'List Your Products', desc: 'Add photos, descriptions, and prices' },
                  { step: 3, title: 'Receive Orders', desc: 'Get notified when buyers place orders' },
                  { step: 4, title: 'Earn Money', desc: 'Fulfill orders and receive payments securely' },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">Why Choose Agro Market?</h2>
            <p className="mt-2 text-muted-foreground">
              We make buying and selling agricultural products simple and secure
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: BadgeCheck,
                title: 'Verified Sellers',
                description: 'All sellers go through a verification process to ensure quality and trust.',
                color: 'bg-blue-500/10 text-blue-600',
              },
              {
                icon: ShieldCheck,
                title: 'Secure Payments',
                description: 'Pay safely with EcoCash, OneMoney, Visa, or PayPal with buyer protection.',
                color: 'bg-success/10 text-success',
              },
              {
                icon: TruckIcon,
                title: 'Fast Delivery',
                description: 'Same-day local delivery available. Track your orders in real-time.',
                color: 'bg-accent/10 text-accent',
              },
              {
                icon: Leaf,
                title: 'Fresh Quality',
                description: 'Direct from farms to your table. Quality guaranteed on all products.',
                color: 'bg-primary/10 text-primary',
              },
            ].map((benefit) => (
              <Card key={benefit.title} className="text-center">
                <CardContent className="pt-6">
                  <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${benefit.color}`}>
                    <benefit.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="border-y bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Trusted Payment Methods</h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              {[
                { name: 'EcoCash', color: 'bg-green-600' },
                { name: 'OneMoney', color: 'bg-orange-500' },
                { name: 'Visa', color: 'bg-blue-600' },
                { name: 'PayPal', color: 'bg-blue-500' },
              ].map((method) => (
                <div
                  key={method.name}
                  className={`${method.color} rounded-lg px-6 py-3 text-sm font-medium text-white shadow-sm`}
                >
                  {method.name}
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              All payments are processed securely. Your financial information is never stored.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
            <p className="mt-2 text-muted-foreground">
              Join thousands of satisfied buyers and sellers
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="relative">
                <CardContent className="pt-6">
                  {/* Stars */}
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  {/* Quote */}
                  <p className="mb-6 text-muted-foreground">&quot;{testimonial.comment}&quot;</p>
                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}, {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-2 text-muted-foreground">
              Got questions? We&apos;ve got answers.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 text-center">
            <p className="mb-4 text-muted-foreground">Still have questions?</p>
            <Link href="/contact">
              <Button variant="outline">Contact Support</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Join thousands of farmers, sellers, and buyers on Zimbabwe&apos;s trusted agricultural marketplace.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 w-full max-w-sm mx-auto sm:max-w-none">
            <Link href="/auth/welcome" className="w-full sm:w-auto">
              <Button size="lg" variant="secondary" className="w-full gap-2">
                Create Account
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/products" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
