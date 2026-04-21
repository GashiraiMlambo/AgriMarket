import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: {
    value: number;
    label: string;
  };
  className?: string;
}

export function StatCard({ title, value, icon: Icon, change, className }: StatCardProps) {
  const isPositive = change && change.value >= 0;

  return (
    <Card className={cn('', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-2 text-2xl font-bold">{value}</h3>
            {change && (
              <div className={cn(
                'mt-2 flex items-center gap-1 text-sm',
                isPositive ? 'text-success' : 'text-destructive'
              )}>
                {isPositive ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{isPositive ? '+' : ''}{change.value}%</span>
                <span className="text-muted-foreground">{change.label}</span>
              </div>
            )}
          </div>
          <div className="rounded-full bg-primary/10 p-3">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading skeleton for stat card
export function StatCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-8 w-32 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
          <div className="h-12 w-12 animate-pulse rounded-full bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}
