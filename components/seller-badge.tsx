import { BadgeCheck, Award, Leaf, Truck, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { SellerBadge as SellerBadgeType } from '@/types';
import { cn } from '@/lib/utils';

interface SellerBadgeProps {
  badge: SellerBadgeType;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const badgeConfig: Record<SellerBadgeType, {
  label: string;
  description: string;
  icon: typeof BadgeCheck;
  className: string;
}> = {
  verified: {
    label: 'Verified Seller',
    description: 'This seller has been verified by Agro Market',
    icon: BadgeCheck,
    className: 'bg-blue-500/10 text-blue-600 border-blue-200',
  },
  top_seller: {
    label: 'Top Seller',
    description: 'One of our highest-rated and most trusted sellers',
    icon: Award,
    className: 'bg-accent/10 text-accent border-accent/30',
  },
  trusted_farm: {
    label: 'Trusted Farm',
    description: 'A certified farm with quality assurance practices',
    icon: Leaf,
    className: 'bg-success/10 text-success border-success/30',
  },
  fast_delivery: {
    label: 'Fast Delivery',
    description: 'Known for quick and reliable deliveries',
    icon: Truck,
    className: 'bg-purple-500/10 text-purple-600 border-purple-200',
  },
  premium: {
    label: 'Premium Seller',
    description: 'Offers premium quality products',
    icon: Crown,
    className: 'bg-primary/10 text-primary border-primary/30',
  },
};

export function SellerBadge({ badge, showLabel = false, size = 'md' }: SellerBadgeProps) {
  const config = badgeConfig[badge];
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className={cn('gap-1 font-medium', config.className)}
          >
            <Icon className={sizeClasses[size]} />
            {showLabel && config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{config.label}</p>
          <p className="text-xs text-muted-foreground">{config.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface SellerBadgesProps {
  badges: SellerBadgeType[];
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
  max?: number;
}

export function SellerBadges({ badges, showLabels = false, size = 'md', max }: SellerBadgesProps) {
  const displayBadges = max ? badges.slice(0, max) : badges;
  const remaining = max ? badges.length - max : 0;

  return (
    <div className="flex flex-wrap items-center gap-1">
      {displayBadges.map((badge) => (
        <SellerBadge key={badge} badge={badge} showLabel={showLabels} size={size} />
      ))}
      {remaining > 0 && (
        <Badge variant="outline" className="text-xs text-muted-foreground">
          +{remaining} more
        </Badge>
      )}
    </div>
  );
}
