'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Camera,
  Save,
  Mail,
  Phone,
  User,
  MapPin,
  Store,
  Star,
  Calendar,
  BadgeCheck,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { SellerBadge } from '@/components/seller-badge';
import { mockSellers } from '@/lib/mock-data';
import { toast } from 'sonner';

const profileSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  businessName: z.string().min(3),
  businessDescription: z.string().min(20),
  location: z.string().min(3),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function SellerProfilePage() {
  const seller = mockSellers[0];
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: seller.firstName,
      lastName: seller.lastName,
      email: seller.email,
      phone: seller.phone || '',
      businessName: seller.businessName,
      businessDescription: seller.businessDescription || '',
      location: seller.location,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Profile updated successfully');
    setIsEditing(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Seller Profile</h1>
        <p className="mt-1 text-muted-foreground">Manage your business profile and information</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={seller.avatar || '/placeholder.jpg'}
                    alt={seller.businessName}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="mt-4 text-xl font-semibold">{seller.businessName}</h2>
              <p className="text-sm text-muted-foreground">
                {seller.firstName} {seller.lastName}
              </p>
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {seller.badges.map((badge) => (
                  <SellerBadge key={badge} badge={badge} />
                ))}
              </div>

              <Separator className="my-4" />

              {/* Stats */}
              <div className="grid w-full grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{seller.rating}</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{seller.totalReviews}</p>
                  <p className="text-xs text-muted-foreground">Reviews</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{seller.totalSales}</p>
                  <p className="text-xs text-muted-foreground">Sales</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="w-full space-y-3 text-left text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{seller.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined {new Date(seller.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  <span className="capitalize">KYC: {seller.kycStatus}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Update your business details</CardDescription>
            </div>
            {!isEditing && (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="firstName"
                        {...register('firstName')}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="lastName"
                        {...register('lastName')}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="businessName">Business Name</FieldLabel>
                  <div className="relative">
                    <Store className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="businessName"
                      {...register('businessName')}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </Field>

                <Field>
                  <FieldLabel htmlFor="businessDescription">Business Description</FieldLabel>
                  <Textarea
                    id="businessDescription"
                    {...register('businessDescription')}
                    disabled={!isEditing}
                    rows={4}
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="email">Email Address</FieldLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        {...register('phone')}
                        disabled={!isEditing}
                        className="pl-10"
                      />
                    </div>
                  </Field>
                </div>

                <Field>
                  <FieldLabel htmlFor="location">Location</FieldLabel>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="location"
                      {...register('location')}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </Field>
              </FieldGroup>

              {isEditing && (
                <div className="mt-6 flex gap-3">
                  <Button type="submit" disabled={isSubmitting} className="gap-2">
                    <Save className="h-4 w-4" />
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
