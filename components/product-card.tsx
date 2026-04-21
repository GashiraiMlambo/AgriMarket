'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, MapPin, Truck, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore, useWishlistStore } from '@/lib/store';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal';
}

export function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);
  const { isInWishlist, toggleItem } = useWishlistStore();

  const isWishlisted = isInWishlist(product.id);
  const hasDiscount = product.discountedPrice && product.discountedPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.discountedPrice!) / product.price) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const getStockBadge = () => {
    switch (product.availabilityStatus) {
      case 'in_stock':
        return null;
      case 'low_stock':
        return <Badge variant="secondary" className="bg-warning text-warning-foreground">Low Stock</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Out of Stock</Badge>;
      case 'pre_order':
        return <Badge variant="secondary">Pre-Order</Badge>;
    }
  };

  if (variant === 'horizontal') {
    return (
      <Link href={`/products/${product.slug}`}>
        <Card className="group overflow-hidden transition-all hover:shadow-md">
          <div className="flex">
            <div className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-40">
              <Image
                src={product.images[0]?.url || '/placeholder.jpg'}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {hasDiscount && (
                <Badge className="absolute left-2 top-2 bg-destructive text-destructive-foreground">
                  -{discountPercent}%
                </Badge>
              )}
            </div>
            <CardContent className="flex flex-1 flex-col justify-between p-4">
              <div>
                <p className="text-xs text-muted-foreground">{product.sellerName}</p>
                <h3 className="font-semibold line-clamp-1">{product.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {product.shortDescription}
                </p>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {hasDiscount ? (
                    <>
                      <span className="font-bold text-primary">
                        ${product.discountedPrice!.toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground">/{product.unit}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-accent text-accent" />
                  <span>{product.averageRating.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === 'compact') {
    return (
      <Link href={`/products/${product.slug}`}>
        <Card className="group overflow-hidden transition-all hover:shadow-md">
          <div className="relative aspect-square">
            <Image
              src={product.images[0]?.url || '/placeholder.jpg'}
              alt={product.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <CardContent className="p-3">
            <h3 className="text-sm font-medium line-clamp-1">{product.name}</h3>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-bold text-primary text-sm">
                ${(product.discountedPrice || product.price).toFixed(2)}
              </span>
              <span className="text-xs text-muted-foreground">/{product.unit}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-product overflow-hidden">
          <Image
            src={product.images[0]?.url || '/placeholder.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {hasDiscount && (
              <Badge className="bg-destructive text-destructive-foreground">
                -{discountPercent}%
              </Badge>
            )}
            {product.isFeatured && (
              <Badge className="bg-accent text-accent-foreground">Featured</Badge>
            )}
            {getStockBadge()}
          </div>

          {/* Quick Actions */}
          <div className="absolute right-2 top-2 flex flex-col gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full"
              onClick={handleToggleWishlist}
            >
              <Heart
                className={cn('h-4 w-4', isWishlisted && 'fill-destructive text-destructive')}
              />
            </Button>
          </div>

          {/* Freshness Badge */}
          <div className="absolute bottom-2 left-2">
            <Badge
              variant="secondary"
              className={cn(
                'text-xs capitalize',
                product.freshnessType === 'fresh' && 'bg-success/90 text-success-foreground',
                product.freshnessType === 'frozen' && 'bg-blue-500/90 text-white'
              )}
            >
              {product.freshnessType}
            </Badge>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Seller Info */}
          <div className="mb-2 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{product.sellerName}</p>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-accent text-accent" />
              <span className="text-xs font-medium">{product.averageRating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">({product.totalReviews})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-semibold text-foreground line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Location */}
          <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="line-clamp-1">{product.location}</span>
          </div>

          {/* Price */}
          <div className="mt-3 flex items-center gap-2">
            {hasDiscount ? (
              <>
                <span className="text-lg font-bold text-primary">
                  ${product.discountedPrice!.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
            )}
            <span className="text-sm text-muted-foreground">/{product.unit}</span>
          </div>

          {/* Delivery Options */}
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            {product.deliveryOptions.includes('local_delivery') && (
              <div className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                <span>Delivery</span>
              </div>
            )}
            {product.deliveryOptions.includes('pickup') && (
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Pickup</span>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            className="mt-4 w-full"
            size="sm"
            onClick={handleAddToCart}
            disabled={product.availabilityStatus === 'out_of_stock'}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}

// Loading skeleton for product card
export function ProductCardSkeleton({ variant = 'default' }: { variant?: 'default' | 'compact' | 'horizontal' }) {
  if (variant === 'horizontal') {
    return (
      <Card className="overflow-hidden">
        <div className="flex">
          <div className="h-32 w-32 shrink-0 animate-pulse bg-muted sm:h-40 sm:w-40" />
          <CardContent className="flex flex-1 flex-col justify-between p-4">
            <div className="space-y-2">
              <div className="h-3 w-16 animate-pulse rounded bg-muted" />
              <div className="h-5 w-32 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
            </div>
            <div className="flex items-center justify-between">
              <div className="h-5 w-20 animate-pulse rounded bg-muted" />
              <div className="h-4 w-12 animate-pulse rounded bg-muted" />
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className="overflow-hidden">
        <div className="aspect-square animate-pulse bg-muted" />
        <CardContent className="p-3">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-20 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="aspect-product animate-pulse bg-muted" />
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <div className="h-3 w-20 animate-pulse rounded bg-muted" />
          <div className="h-3 w-12 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-5 w-full animate-pulse rounded bg-muted" />
        <div className="mt-2 h-3 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-6 w-28 animate-pulse rounded bg-muted" />
        <div className="mt-3 h-3 w-20 animate-pulse rounded bg-muted" />
        <div className="mt-4 h-9 w-full animate-pulse rounded bg-muted" />
      </CardContent>
    </Card>
  );
}
