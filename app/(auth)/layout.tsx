import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />
          <nav className="flex items-center gap-4">
            <Link
              href="/products"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Browse Products
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              About Us
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center px-4 pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 border-t bg-background/80 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-4 px-4 text-sm text-muted-foreground">
          <Link href="/terms" className="hover:text-foreground">Terms</Link>
          <span>|</span>
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          <span>|</span>
          <span>&copy; {new Date().getFullYear()} Agro Market</span>
        </div>
      </footer>
    </div>
  );
}
