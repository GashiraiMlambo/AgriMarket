'use client';

import { Star, ThumbsUp, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Review {
  id: string;
  buyerName: string;
  buyerAvatar: string;
  rating: number;
  title: string;
  content: string;
  productName: string;
  date: string;
  helpful: number;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: '1',
    buyerName: 'Tendai Musiyarwanzi',
    buyerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TendaiM',
    rating: 5,
    title: 'Best quality pork in town!',
    content: 'The pork chops were fresh, tender, and well-packaged. Delivery was quick and the price is very competitive. Will definitely order again.',
    productName: 'Fresh Pork Chops',
    date: '2 days ago',
    helpful: 15,
    verified: true,
  },
  {
    id: '2',
    buyerName: 'Grace Nyambi',
    buyerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GraceN',
    rating: 5,
    title: 'Excellent service',
    content: 'Fast communication, fresh products, and reliable delivery. This is a professional seller!',
    productName: 'Ground Pork',
    date: '5 days ago',
    helpful: 8,
    verified: true,
  },
  {
    id: '3',
    buyerName: 'Robert Mabvuku',
    buyerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=RobertM',
    rating: 4,
    title: 'Good quality, slight delay',
    content: 'Product quality is great but delivery took longer than expected. Otherwise satisfied with the purchase.',
    productName: 'Pork Ribs',
    date: '1 week ago',
    helpful: 4,
    verified: true,
  },
  {
    id: '4',
    buyerName: 'Violet Ndlovu',
    buyerAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VioletN',
    rating: 3,
    title: 'Average experience',
    content: 'The pork was okay, but I expected better for the price. Packaging could have been better.',
    productName: 'Fresh Pork Chops',
    date: '1 week ago',
    helpful: 2,
    verified: true,
  },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
        />
      ))}
    </div>
  );
}

export default function SellerReviewsPage() {
  const averageRating = (
    mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length
  ).toFixed(1);
  const totalReviews = mockReviews.length;
  const ratingDistribution = {
    5: mockReviews.filter((r) => r.rating === 5).length,
    4: mockReviews.filter((r) => r.rating === 4).length,
    3: mockReviews.filter((r) => r.rating === 3).length,
    2: mockReviews.filter((r) => r.rating === 2).length,
    1: mockReviews.filter((r) => r.rating === 1).length,
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Reviews & Ratings</h1>
        <p className="text-sm text-muted-foreground">Customer feedback for your products</p>
      </div>

      {/* Rating Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageRating}</div>
            <div className="mt-2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.round(parseFloat(averageRating)) ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{totalReviews} reviews</p>
          </CardContent>
        </Card>

        {Object.entries(ratingDistribution)
          .reverse()
          .map(([stars, count]) => (
            <Card key={stars}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">{stars} ⭐</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{count}</div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${(count / totalReviews) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="positive">Positive</TabsTrigger>
              <TabsTrigger value="neutral">Neutral</TabsTrigger>
              <TabsTrigger value="negative">Negative</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4 pt-4">
              {mockReviews.map((review) => (
                <div
                  key={review.id}
                  className="space-y-3 border-b pb-4 last:border-b-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <img
                        src={review.buyerAvatar}
                        alt={review.buyerName}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">{review.buyerName}</p>
                        <div className="flex items-center gap-2">
                          <RatingStars rating={review.rating} />
                          {review.verified && (
                            <span className="text-xs text-green-600">Verified Purchase</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{review.date}</span>
                  </div>

                  <div>
                    <h4 className="font-semibold">{review.title}</h4>
                    <p className="text-sm text-muted-foreground">{review.content}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      Product: <span className="font-medium">{review.productName}</span>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="mr-2 h-3 w-3" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="outline" size="sm">
                      <AlertCircle className="mr-2 h-3 w-3" />
                      Report
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="positive" className="space-y-4 pt-4">
              {mockReviews
                .filter((r) => r.rating >= 4)
                .map((review) => (
                  <div
                    key={review.id}
                    className="space-y-3 border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={review.buyerAvatar}
                          alt={review.buyerName}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{review.buyerName}</p>
                          <RatingStars rating={review.rating} />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.title}</h4>
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="neutral" className="space-y-4 pt-4">
              {mockReviews
                .filter((r) => r.rating === 3)
                .map((review) => (
                  <div
                    key={review.id}
                    className="space-y-3 border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={review.buyerAvatar}
                          alt={review.buyerName}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{review.buyerName}</p>
                          <RatingStars rating={review.rating} />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.title}</h4>
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                    </div>
                  </div>
                ))}
            </TabsContent>

            <TabsContent value="negative" className="space-y-4 pt-4">
              {mockReviews
                .filter((r) => r.rating < 3)
                .map((review) => (
                  <div
                    key={review.id}
                    className="space-y-3 border-b pb-4 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={review.buyerAvatar}
                          alt={review.buyerName}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{review.buyerName}</p>
                          <RatingStars rating={review.rating} />
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{review.title}</h4>
                      <p className="text-sm text-muted-foreground">{review.content}</p>
                    </div>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
