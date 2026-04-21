import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusType =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
  | 'in_stock'
  | 'low_stock'
  | 'out_of_stock'
  | 'pre_order';

const statusConfig: Record<StatusType, { bg: string; text: string; label: string }> = {
  pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
  confirmed: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Confirmed' },
  processing: { bg: 'bg-purple-100', text: 'text-purple-800', label: 'Processing' },
  shipped: { bg: 'bg-indigo-100', text: 'text-indigo-800', label: 'Shipped' },
  out_for_delivery: { bg: 'bg-cyan-100', text: 'text-cyan-800', label: 'Out for Delivery' },
  delivered: { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-800', label: 'Cancelled' },
  refunded: { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Refunded' },
  in_stock: { bg: 'bg-green-100', text: 'text-green-800', label: 'In Stock' },
  low_stock: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Low Stock' },
  out_of_stock: { bg: 'bg-red-100', text: 'text-red-800', label: 'Out of Stock' },
  pre_order: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Pre-Order' },
};

interface StatusBadgeProps {
  status: StatusType;
  children?: string;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const config = statusConfig[status];
  const label = children || config.label;

  return (
    <Badge className={cn(config.bg, config.text)}>
      {label}
    </Badge>
  );
}
