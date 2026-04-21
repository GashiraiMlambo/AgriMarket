'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Star, Store, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SellerBadge } from '@/components/seller-badge';
import { mockSellers, mockProducts } from '@/lib/mock-data';

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSellers = mockSellers.filter((seller) =>
    seller.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    seller.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Our Sellers</h1>
        <p className="mt-2 text-muted-foreground">
          Discover trusted farmers and vendors on Agro Market
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search sellers by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Sellers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSellers.map((seller) => {
          const sellerProducts = mockProducts.filter((p) => p.sellerId === seller.id);
          
          return (
            <Link key={seller.id} href={`/sellers/${seller.id}`}>
              <Card className="h-full transition-all hover:shadow-lg hover:border-primary">
                <CardContent className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={seller.avatar || '/placeholder.jpg'}
                        alt={seller.businessName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold truncate">{seller.businessName}</h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {seller.firstName} {seller.lastName}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {seller.badges.slice(0, 3).map((badge) => (
                          <SellerBadge key={badge} badge={badge} size="sm" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                    {seller.businessDescription}
                  </p>

                  {/* Stats */}
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium">{seller.rating}</span>
                      <span className="text-muted-foreground">({seller.totalReviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Store className="h-4 w-4" />
                      <span>{sellerProducts.length} products</span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mt-4 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{seller.location}</span>
                  </div>

                  {/* View Button */}
                  <Button variant="ghost" className="mt-4 w-full justify-between" size="sm">
                    View Store
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {filteredSellers.length === 0 && (
        <div className="py-12 text-center">
          <Store className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No sellers found</h3>
          <p className="mt-2 text-muted-foreground">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
}
