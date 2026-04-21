'use client';

import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Star, Store, Package, Calendar, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product-card';
import { SellerBadge } from '@/components/seller-badge';
import { mockSellers, mockProducts, mockReviews } from '@/lib/mock-data';

export default function SellerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const seller = mockSellers.find((s) => s.id === id);
  const sellerProducts = mockProducts.filter((p) => p.sellerId === id);
  const sellerReviews = mockReviews.filter((r) => 
    sellerProducts.some((p) => p.id === r.productId)
  );

  if (!seller) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Seller not found</h1>
        <p className="mt-2 text-muted-foreground">The seller you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/sellers">
          <Button className="mt-4">Browse Sellers</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Seller Header */}
      <Card className="mb-8 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/20" />
        <CardContent className="relative px-6 pb-6">
          <div className="flex flex-col items-start gap-6 sm:flex-row">
            {/* Avatar */}
            <div className="relative -mt-16 h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-background">
              <Image
                src={seller.avatar || '/placeholder.jpg'}
                alt={seller.businessName}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 pt-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold">{seller.businessName}</h1>
                  <p className="text-muted-foreground">
                    {seller.firstName} {seller.lastName}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {seller.badges.map((badge) => (
                      <SellerBadge key={badge} badge={badge} />
                    ))}
                  </div>
                </div>
                <Button className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Seller
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-accent text-accent" />
                  <span className="font-semibold">{seller.rating}</span>
                  <span className="text-muted-foreground">({seller.totalReviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Package className="h-5 w-5" />
                  <span>{seller.totalSales} sales</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Store className="h-5 w-5" />
                  <span>{sellerProducts.length} products</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="h-5 w-5" />
                  <span>{seller.location}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                  <span>Joined {new Date(seller.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-4 text-muted-foreground">{seller.businessDescription}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="products" className="w-full">
        <TabsList>
          <TabsTrigger value="products">Products ({sellerProducts.length})</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({sellerReviews.length})</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          {sellerProducts.length === 0 ? (
            <div className="py-12 text-center">
              <Package className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No products yet</h3>
              <p className="mt-2 text-muted-foreground">This seller hasn&apos;t listed any products.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {sellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          {sellerReviews.length === 0 ? (
            <div className="py-12 text-center">
              <Star className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No reviews yet</h3>
              <p className="mt-2 text-muted-foreground">Be the first to review this seller&apos;s products.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sellerReviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <Image
                          src={review.buyerAvatar || '/placeholder.jpg'}
                          alt={review.buyerName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{review.buyerName}</span>
                          {review.isVerifiedPurchase && (
                            <Badge variant="secondary" className="text-xs">Verified</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? 'fill-accent text-accent' : 'fill-muted text-muted'}`}
                            />
                          ))}
                          <span className="ml-2 text-xs text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-2">About {seller.businessName}</h3>
                <p className="text-muted-foreground">{seller.businessDescription}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">{seller.location}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Contact</h3>
                <p className="text-muted-foreground">{seller.email}</p>
                <p className="text-muted-foreground">{seller.phone}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Verification Status</h3>
                <Badge variant={seller.kycStatus === 'verified' ? 'default' : 'secondary'} className="capitalize">
                  {seller.kycStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
