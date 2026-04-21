import Link from 'next/link';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        <p className="mt-2 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/">
            <Button className="w-full gap-2 sm:w-auto">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" className="w-full gap-2 sm:w-auto">
              <Search className="h-4 w-4" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
