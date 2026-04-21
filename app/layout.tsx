import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'sonner';
import './globals.css';

const _geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const _geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

export const metadata: Metadata = {
  title: {
    default: 'Agro Market - Fresh Pork, Farm Crops, Trusted Trade',
    template: '%s | Agro Market',
  },
  description: 'Zimbabwe\'s leading agricultural marketplace for fresh pork, farm crops, and produce. Connect with trusted farmers and sellers.',
  keywords: ['agriculture', 'marketplace', 'pork', 'farm', 'crops', 'Zimbabwe', 'fresh produce', 'meat', 'vegetables'],
  authors: [{ name: 'Agro Market' }],
  creator: 'Agro Market',
  openGraph: {
    type: 'website',
    locale: 'en_ZW',
    url: 'https://agromarket.co.zw',
    siteName: 'Agro Market',
    title: 'Agro Market - Fresh Pork, Farm Crops, Trusted Trade',
    description: 'Zimbabwe\'s leading agricultural marketplace for fresh pork, farm crops, and produce.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Agro Market - Fresh Pork, Farm Crops, Trusted Trade',
    description: 'Zimbabwe\'s leading agricultural marketplace for fresh pork, farm crops, and produce.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#6b2737' },
    { media: '(prefers-color-scheme: dark)', color: '#4a1a24' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        {children}
        <Toaster position="top-right" richColors closeButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
