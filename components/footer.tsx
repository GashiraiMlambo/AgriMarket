import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  shop: [
    { href: '/products?category=pork_meat', label: 'Pork Meat' },
    { href: '/products?category=vegetables', label: 'Vegetables' },
    { href: '/products?category=grains', label: 'Grains & Cereals' },
    { href: '/products?category=fruits', label: 'Fruits' },
    { href: '/products', label: 'All Products' },
    { href: '/sellers', label: 'Find Sellers' },
  ],
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/careers', label: 'Careers' },
    { href: '/blog', label: 'Blog' },
    { href: '/press', label: 'Press' },
  ],
  support: [
    { href: '/help', label: 'Help Center' },
    { href: '/faq', label: 'FAQ' },
    { href: '/shipping', label: 'Shipping Info' },
    { href: '/returns', label: 'Returns' },
    { href: '/seller-guide', label: 'Seller Guide' },
  ],
  legal: [
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/cookies', label: 'Cookie Policy' },
  ],
};

const paymentMethods = [
  { name: 'EcoCash', color: 'bg-green-600' },
  { name: 'OneMoney', color: 'bg-orange-500' },
  { name: 'Visa', color: 'bg-blue-600' },
  { name: 'PayPal', color: 'bg-blue-500' },
];

const socialLinks = [
  { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
  { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
  { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
  { href: 'https://youtube.com', icon: Youtube, label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-12 rounded-2xl bg-primary/5 p-8 text-center">
          <h3 className="mb-2 text-2xl font-bold">Stay Updated</h3>
          <p className="mb-6 text-muted-foreground">
            Subscribe to get special offers, free giveaways, and farming tips.
          </p>
          <form className="mx-auto flex max-w-md gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-background"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>

        {/* Main Footer Content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Logo size="lg" className="mb-4" />
            <p className="mb-6 text-sm text-muted-foreground">
              Zimbabwe&apos;s leading agricultural marketplace connecting farmers, 
              sellers, and buyers for fresh pork, crops, and farm produce.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>123 Agriculture Road, Harare, Zimbabwe</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+263 24 2700000</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@agromarket.co.zw</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="mb-4 font-semibold">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">We accept:</span>
            <div className="flex gap-2">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className={`${method.color} rounded px-2 py-1 text-xs font-medium text-white`}
                >
                  {method.name}
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Agro Market. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
