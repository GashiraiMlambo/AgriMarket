'use client';

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Share2,
  Star,
  MapPin,
  Truck,
  ShieldCheck,
  Store,
  MessageCircle,
  Flag,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProductCard } from '@/components/product-card';
import { SellerBadge } from '@/components/seller-badge';
import { useCartStore, useWishlistStore, useRecentlyViewedStore } from '@/lib/store';
import { mockProducts, mockReviews, mockSellers } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedDelivery, setSelectedDelivery] = useState<string>('');

  const product = mockProducts.find((p) => p.slug === slug);
  const seller = mockSellers.find((s) => s.id === product?.sellerId);
  const productReviews = mockReviews.filter((r) => r.productId === product?.id);
  
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();
  const { addItem: addToRecentlyViewed } = useRecentlyViewedStore();

  // Add to recently viewed
  if (product) {
    addToRecentlyViewed(product.id);
  }

  // Related products
  const relatedProducts = mockProducts
    .filter((p) => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/products">
          <Button className="mt-4">Browse Products</Button>
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const discountPercentage = product.discountedPrice
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedDelivery) {
      toast.error('Please select a delivery option');
      return;
    }
    addItem(product, quantity);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlistToggle = () => {
    toggleItem(product.id);
    toast.success(inWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const deliveryLabels: Record<string, string> = {
    pickup: 'Store Pickup (Free)',
    local_delivery: 'Local Delivery ($3.50)',
    nationwide: 'Nationwide Shipping ($8.00)',
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/products?category=${product.category}`} className="hover:text-foreground capitalize">
          {product.category.replace('_', ' ')}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Image
              src={product.images[selectedImage]?.url || '/placeholder.jpg'}
              alt={product.images[selectedImage]?.alt || product.name}
              fill
              className="object-cover"
              priority
            />
            {product.isOnSale && (
              <Badge className="absolute left-4 top-4 bg-destructive text-destructive-foreground">
                -{discountPercentage}% OFF
              </Badge>
            )}
            {product.availabilityStatus === 'low_stock' && (
              <Badge variant="outline" className="absolute right-4 top-4 bg-background">
                Low Stock
              </Badge>
            )}
            
            {/* Image Navigation */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                    selectedImage === index ? 'border-primary' : 'border-transparent opacity-70 hover:opacity-100'
                  )}
                >
                  <Image src={image.url} alt={image.alt} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Category & Tags */}
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="capitalize">
              {product.category.replace('_', ' ')}
            </Badge>
            {product.freshnessType && (
              <Badge variant="outline" className="capitalize">
                {product.freshnessType}
              </Badge>
            )}
          </div>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">{product.name}</h1>
            <p className="mt-2 text-muted-foreground">{product.shortDescription}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-5 w-5',
                    i < Math.floor(product.averageRating)
                      ? 'fill-accent text-accent'
                      : 'fill-muted text-muted'
                  )}
                />
              ))}
              <span className="ml-2 text-sm font-medium">{product.averageRating.toFixed(1)}</span>
            </div>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm text-muted-foreground">{product.totalReviews} reviews</span>
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm text-muted-foreground">{product.stockQuantity} in stock</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            {product.discountedPrice ? (
              <>
                <span className="text-3xl font-bold text-primary">
                  ${product.discountedPrice.toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
                <Badge className="bg-destructive text-destructive-foreground">
                  Save ${(product.price - product.discountedPrice).toFixed(2)}
                </Badge>
              </>
            ) : (
              <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
            )}
            <span className="text-muted-foreground">/ {product.unit}</span>
          </div>

          <Separator />

          {/* Seller Info */}
          <Link href={`/sellers/${seller?.id}`} className="block">
            <Card className="transition-colors hover:bg-muted/50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={seller?.avatar || '/placeholder.jpg'}
                    alt={seller?.businessName || 'Seller'}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{seller?.businessName}</span>
                    <div className="flex gap-1">
                      {seller?.badges.map((badge) => (
                        <SellerBadge key={badge} badge={badge} size="sm" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span>{seller?.rating}</span>
                    <span>({seller?.totalReviews} reviews)</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Store className="mr-2 h-4 w-4" />
                  View Store
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{product.location}</span>
          </div>

          <Separator />

          {/* Quantity & Delivery */}
          <div className="space-y-4">
            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Quantity:</span>
              <div className="flex items-center rounded-md border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-r-none"
                  onClick={() => setQuantity(Math.max(product.minOrderQuantity, quantity - 1))}
                  disabled={quantity <= product.minOrderQuantity}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-l-none"
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  disabled={quantity >= product.stockQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                Min: {product.minOrderQuantity} {product.unit}
              </span>
            </div>

            {/* Delivery Option */}
            <div className="space-y-2">
              <span className="text-sm font-medium">Delivery Option:</span>
              <Select value={selectedDelivery} onValueChange={setSelectedDelivery}>
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery option" />
                </SelectTrigger>
                <SelectContent>
                  {product.deliveryOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {deliveryLabels[option]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={handleAddToCart}
              disabled={product.availabilityStatus === 'out_of_stock'}
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button
              size="lg"
              variant={inWishlist ? 'secondary' : 'outline'}
              onClick={handleWishlistToggle}
            >
              <Heart className={cn('h-5 w-5', inWishlist && 'fill-current text-destructive')} />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4">
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="h-5 w-5 text-success" />
              <span>Quality Guaranteed</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Truck className="h-5 w-5 text-primary" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check className="h-5 w-5 text-success" />
              <span>Fresh Products</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b bg-transparent p-0">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Reviews ({productReviews.length})
            </TabsTrigger>
            <TabsTrigger
              value="shipping"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Shipping & Returns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Product Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">SKU</span>
                      <span>{product.sku}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span className="capitalize">{product.category.replace('_', ' ')}</span>
                    </div>
                    {product.subcategory && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subcategory</span>
                        <span>{product.subcategory}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Unit</span>
                      <span>{product.unit}</span>
                    </div>
                    {product.weight && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weight</span>
                        <span>{product.weight} {product.weightUnit}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Freshness</span>
                      <span className="capitalize">{product.freshnessType}</span>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Tags</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            {productReviews.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No reviews yet for this product.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {productReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image
                              src={review.buyerAvatar || '/placeholder.jpg'}
                              alt={review.buyerName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">{review.buyerName}</span>
                              {review.isVerifiedPurchase && (
                                <Badge variant="secondary" className="text-xs">
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      'h-4 w-4',
                                      i < review.rating
                                        ? 'fill-accent text-accent'
                                        : 'fill-muted text-muted'
                                    )}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {review.title && <h4 className="mt-3 font-medium">{review.title}</h4>}
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                      {review.sellerResponse && (
                        <div className="mt-4 rounded-lg bg-muted p-4">
                          <p className="text-sm font-medium">Seller Response:</p>
                          <p className="mt-1 text-sm text-muted-foreground">{review.sellerResponse.comment}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="shipping" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Delivery Options</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Store className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Store Pickup</p>
                      <p className="text-sm text-muted-foreground">
                        Free pickup from seller&apos;s location in {product.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Truck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Local Delivery - $3.50</p>
                      <p className="text-sm text-muted-foreground">
                        Same-day delivery within {product.location.split(',')[0]}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Return Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Due to the perishable nature of our products, returns are only accepted if the product
                    arrives damaged or spoiled. Please contact us within 24 hours of delivery with photos
                    of the product for a full refund or replacement.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      )}

      {/* Report Product */}
      <div className="mt-8 border-t pt-8">
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          <Flag className="mr-2 h-4 w-4" />
          Report this product
        </Button>
      </div>
    </div>
  );
}
