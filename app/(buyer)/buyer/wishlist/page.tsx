'use client';

import Link from 'next/link';
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product-card';
import { EmptyState } from '@/components/empty-state';
import { useWishlistStore } from '@/lib/store';
import { mockProducts } from '@/lib/mock-data';

export default function WishlistPage() {
  const wishlistItems = useWishlistStore((state) => state.items);
  const wishlistProducts = mockProducts.filter((p) => wishlistItems.includes(p.id));

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">My Wishlist</h1>
        <p className="mt-1 text-muted-foreground">
          {wishlistProducts.length} items saved for later
        </p>
      </div>

      {wishlistProducts.length === 0 ? (
        <EmptyState
          icon="heart"
          title="Your wishlist is empty"
          description="Save products you like by clicking the heart icon"
          action={
            <Link href="/products">
              <Button className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                Browse Products
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
