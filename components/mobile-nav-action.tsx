'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

interface NavLink {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface MobileNavActionProps {
  links: NavLink[];
  title?: string;
}

export function MobileNavAction({ links, title = 'Menu' }: MobileNavActionProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-72">
        <h2 className="mb-6 text-lg font-semibold">{title}</h2>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              {link.icon && <span className="flex-shrink-0">{link.icon}</span>}
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
