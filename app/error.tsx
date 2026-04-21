'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <h1 className="mt-6 text-2xl font-semibold">Something went wrong!</h1>
        <p className="mt-2 text-muted-foreground">
          We apologize for the inconvenience. Please try again.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={reset} className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="w-full gap-2 sm:w-auto">
              <Home className="h-4 w-4" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
