import { AlertCircle, Heart, Package, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NoDataProps {
  type?: 'search' | 'cart' | 'wishlist' | 'orders' | 'products' | 'messages';
  title?: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
}

const noDataConfig = {
  search: {
    icon: Search,
    title: 'No results found',
    description: 'Try adjusting your search terms or filters',
  },
  cart: {
    icon: Package,
    title: 'Your cart is empty',
    description: 'Add some products to get started',
  },
  wishlist: {
    icon: Heart,
    title: 'Your wishlist is empty',
    description: 'Save products you like for later',
  },
  orders: {
    icon: Package,
    title: 'No orders yet',
    description: 'Start shopping to see your orders here',
  },
  products: {
    icon: Package,
    title: 'No products found',
    description: 'Add your first product to get started',
  },
  messages: {
    icon: AlertCircle,
    title: 'No messages',
    description: 'Your conversations will appear here',
  },
};

export function NoData({
  type = 'search',
  title,
  description,
  className,
  icon: customIcon,
}: NoDataProps) {
  const config = noDataConfig[type];
  const Icon = customIcon ? null : config.icon;
  const finalTitle = title || config.title;
  const finalDescription = description || config.description;

  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      {customIcon || (Icon && <Icon className="h-12 w-12 text-muted-foreground mb-4" />)}
      <h3 className="text-lg font-semibold text-foreground">{finalTitle}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{finalDescription}</p>
    </div>
  );
}
