'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { FieldGroup, Field, FieldLabel, FieldError } from '@/components/ui/field';
import { signupSchema, type SignupFormData } from '@/lib/validations';
import { useAuthStore } from '@/lib/store';
import { toast } from 'sonner';

export default function BuyerSignupPage() {
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
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      acceptTerms: false,
    },
  });

  const acceptTerms = watch('acceptTerms');

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      await login(data.email, data.password, 'buyer');
      toast.success('Account created successfully!');
      router.push('/buyer/dashboard');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md py-8">
      <Link
        href="/auth/welcome"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to role selection
      </Link>

      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShoppingBag className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl">Create Buyer Account</CardTitle>
          <CardDescription>
            Sign up to start shopping for fresh pork and farm produce
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
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
                'Create Account'
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
