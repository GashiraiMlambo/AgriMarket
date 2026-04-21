import Image from 'next/image';
import { Leaf, Users, ShieldCheck, TruckIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">About Agro Market</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Zimbabwe&apos;s leading agricultural marketplace connecting farmers, sellers, and buyers
        </p>
      </div>

      {/* Hero Image */}
      <div className="relative mt-12 aspect-video overflow-hidden rounded-xl">
        <Image
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1200&h=600&fit=crop"
          alt="Farm landscape"
          fill
          className="object-cover"
        />
      </div>

      {/* Mission */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Agro Market was founded with a simple mission: to bridge the gap between Zimbabwe&apos;s 
          hardworking farmers and consumers seeking fresh, quality agricultural products. We believe 
          that everyone deserves access to fresh pork and farm produce, while farmers deserve a fair 
          platform to sell their goods.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Our platform empowers local farmers and meat producers by providing them with direct access 
          to urban and rural markets, eliminating middlemen and ensuring better prices for both 
          producers and consumers.
        </p>
      </section>

      {/* Values */}
      <section className="mt-16">
        <h2 className="mb-8 text-2xl font-bold">Our Values</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              icon: Leaf,
              title: 'Fresh Quality',
              description: 'We ensure all products meet strict quality standards, delivering fresh goods from farm to table.',
            },
            {
              icon: Users,
              title: 'Community First',
              description: 'We support local farmers and communities by providing fair trading opportunities.',
            },
            {
              icon: ShieldCheck,
              title: 'Trust & Safety',
              description: 'Verified sellers, secure payments, and buyer protection on every transaction.',
            },
            {
              icon: TruckIcon,
              title: 'Reliable Delivery',
              description: 'Fast and reliable delivery options to get fresh products to your doorstep.',
            },
          ].map((value) => (
            <Card key={value.title}>
              <CardContent className="flex items-start gap-4 pt-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{value.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{value.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mt-16 rounded-xl bg-primary p-8 text-primary-foreground">
        <h2 className="mb-8 text-center text-2xl font-bold">Our Impact</h2>
        <div className="grid gap-8 text-center sm:grid-cols-4">
          {[
            { value: '500+', label: 'Active Sellers' },
            { value: '10,000+', label: 'Happy Customers' },
            { value: '50,000+', label: 'Orders Delivered' },
            { value: '95%', label: 'Satisfaction Rate' },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-primary-foreground/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-16 text-center">
        <h2 className="text-2xl font-bold">Join Our Community</h2>
        <p className="mt-4 text-muted-foreground">
          Whether you&apos;re a farmer looking to sell your produce or a buyer seeking fresh products, 
          Agro Market is here for you.
        </p>
      </section>
    </div>
  );
}
