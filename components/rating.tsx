'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onChange?: (value: number) => void;
  className?: string;
}

export function Rating({
  value,
  max = 5,
  size = 'md',
  interactive = false,
  onChange,
  className,
}: RatingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleClick = (rating: number) => {
    if (interactive && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className={cn('flex gap-1', className)}>
      {Array.from({ length: max }).map((_, i) => {
        const rating = i + 1;
        const isFilled = rating <= value;

        return (
          <button
            key={i}
            onClick={() => handleClick(rating)}
            disabled={!interactive}
            className={cn(
              'transition-colors',
              interactive && 'cursor-pointer hover:scale-110',
              !interactive && 'cursor-default'
            )}
            aria-label={`${rating} out of ${max} stars`}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

interface RatingWithTextProps extends RatingProps {
  count?: number;
  showText?: boolean;
}

export function RatingWithText({
  value,
  count,
  showText = true,
  ...props
}: RatingWithTextProps) {
  return (
    <div className="flex items-center gap-2">
      <Rating value={value} {...props} />
      {showText && (
        <div className="text-sm">
          <span className="font-medium">{value.toFixed(1)}</span>
          {count && <span className="text-muted-foreground"> ({count})</span>}
        </div>
      )}
    </div>
  );
}
