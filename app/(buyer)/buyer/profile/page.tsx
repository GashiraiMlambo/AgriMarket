'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Camera, Save, Mail, Phone, User, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { mockBuyer } from '@/lib/mock-data';
import { toast } from 'sonner';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function BuyerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: mockBuyer.firstName,
      lastName: mockBuyer.lastName,
      email: mockBuyer.email,
      phone: mockBuyer.phone || '',
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
        <h1 className="text-2xl font-bold sm:text-3xl">My Profile</h1>
        <p className="mt-1 text-muted-foreground">Manage your account information</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={mockBuyer.avatar || '/placeholder.jpg'}
                    alt={mockBuyer.firstName}
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
              <h2 className="mt-4 text-xl font-semibold">
                {mockBuyer.firstName} {mockBuyer.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">{mockBuyer.email}</p>
              <Badge className="mt-2" variant={mockBuyer.isVerified ? 'default' : 'secondary'}>
                {mockBuyer.isVerified ? 'Verified' : 'Unverified'}
              </Badge>
              <Separator className="my-4" />
              <div className="w-full space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    Member since {new Date(mockBuyer.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Form */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
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
                    {errors.firstName && (
                      <p className="text-sm text-destructive">{errors.firstName.message}</p>
                    )}
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
                    {errors.lastName && (
                      <p className="text-sm text-destructive">{errors.lastName.message}</p>
                    )}
                  </Field>
                </div>
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
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
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
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
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
