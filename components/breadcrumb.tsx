'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  href: string;
  label: string;
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ href: '/', label: 'Home' }];

  let path = '';
  segments.forEach((segment, index) => {
    path += `/${segment}`;
    
    // Skip some internal segments
    if (['buyer', 'seller', 'auth'].includes(segment)) return;
    
    const label = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      href: path,
      label,
    });
  });

  return breadcrumbs;
}

export function Breadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  // Don't show breadcrumbs on home page
  if (pathname === '/') return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link
        href="/"
        className="hover:text-foreground transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" />
      </Link>

      {breadcrumbs.slice(1).map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center gap-2">
          <ChevronRight className="h-4 w-4" />
          <Link
            href={breadcrumb.href}
            className={`transition-colors hover:text-foreground ${
              index === breadcrumbs.length - 2 ? 'font-medium text-foreground' : ''
            }`}
          >
            {breadcrumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
