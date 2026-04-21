import { Skeleton } from '@/components/ui/skeleton';

export function ProductCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-8 w-full" />
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-12 w-12 rounded-lg" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Skeleton className="h-10 w-20" />
    </div>
  );
}

export function OrderCardSkeleton() {
  return (
    <div className="space-y-4 rounded-lg border p-4">
      <div className="flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-px w-full" />
      <div className="space-y-2">
        <TableRowSkeleton />
        <TableRowSkeleton />
      </div>
    </div>
  );
}
