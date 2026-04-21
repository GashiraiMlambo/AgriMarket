import Link from 'next/link';
import { Wheat } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-xl' },
    lg: { icon: 36, text: 'text-2xl' },
  };

  return (
    <Link href="/" className={cn('flex items-center gap-2', className)}>
      <div className="relative flex items-center justify-center rounded-lg bg-primary p-1.5">
        <Wheat className="text-primary-foreground" size={sizes[size].icon} />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn('font-bold leading-tight text-foreground', sizes[size].text)}>
            Agro Market
          </span>
          {size === 'lg' && (
            <span className="text-xs text-muted-foreground">Fresh Pork, Farm Crops, Trusted Trade</span>
          )}
        </div>
      )}
    </Link>
  );
}
