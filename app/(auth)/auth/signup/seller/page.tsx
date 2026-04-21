'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, ArrowLeft, Store } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { sellerSignupSchema, type SellerSignupFormData } from '@/lib/validations';
import { useAuthStore } from '@/lib/store';
import { toast } from 'sonner';

export default function SellerSignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SellerSignupFormData>({
    resolver: zodResolver(sellerSignupSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const acceptTerms = watch('acceptTerms');

  const onSubmit = async (data: SellerSignupFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      await login(data.email, data.password, 'seller');
      toast.success('Seller account created successfully!');
      router.push('/seller/dashboard');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-lg py-8">
      <Link
        href="/auth/welcome"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to role selection
      </Link>

      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-accent-foreground">
            <Store className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl">Create Seller Account</CardTitle>
          <CardDescription>
            Start selling your products to thousands of buyers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="firstName">First Name</FieldLabel>
                  <Input
                    id="firstName"
                    placeholder="John"
                    {...register('firstName')}
                  />
                  {errors.firstName && (
                    <FieldError>{errors.firstName.message}</FieldError>
                  )}
                </Field>
                <Field>
                  <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <FieldError>{errors.lastName.message}</FieldError>
                  )}
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                />
                {errors.email && (
                  <FieldError>{errors.email.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="phone">Phone Number</FieldLabel>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+263 77 123 4567"
                  {...register('phone')}
                />
                {errors.phone && (
                  <FieldError>{errors.phone.message}</FieldError>
                )}
              </Field>
            </div>

            {/* Business Information */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-sm font-medium text-muted-foreground">Business Information</h3>
              
              <Field>
                <FieldLabel htmlFor="businessName">Business / Farm Name</FieldLabel>
                <Input
                  id="businessName"
                  placeholder="Your Farm or Business Name"
                  {...register('businessName')}
                />
                {errors.businessName && (
                  <FieldError>{errors.businessName.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="businessDescription">Business Description (Optional)</FieldLabel>
                <Textarea
                  id="businessDescription"
                  placeholder="Tell buyers about your farm or business..."
                  rows={3}
                  {...register('businessDescription')}
                />
                {errors.businessDescription && (
                  <FieldError>{errors.businessDescription.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="location">Business Location</FieldLabel>
                <Input
                  id="location"
                  placeholder="e.g., Harare, Zimbabwe"
                  {...register('location')}
                />
                {errors.location && (
                  <FieldError>{errors.location.message}</FieldError>
                )}
              </Field>
            </div>

            {/* Password */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="text-sm font-medium text-muted-foreground">Security</h3>
              
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    {...register('password')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    {...register('confirmPassword')}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <FieldError>{errors.confirmPassword.message}</FieldError>
                )}
              </Field>
            </div>

            <Field>
              <div className="flex items-start gap-2">
                <Checkbox
                  id="acceptTerms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setValue('acceptTerms', checked === true)}
                />
                <label
                  htmlFor="acceptTerms"
                  className="text-sm leading-tight text-muted-foreground"
                >
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>
                  ,{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                  , and{' '}
                  <Link href="/seller-agreement" className="text-primary hover:underline">
                    Seller Agreement
                  </Link>
                </label>
              </div>
              {errors.acceptTerms && (
                <FieldError>{errors.acceptTerms.message}</FieldError>
              )}
            </Field>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                'Create Seller Account'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
