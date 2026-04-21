'use client';

import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmittedEmail(data.email);
      setIsSubmitted(true);
      toast.success('Reset link sent!');
    } catch {
      toast.error('Something went wrong. Please try again.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-md py-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-success text-success-foreground">
              <CheckCircle className="h-7 w-7" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>
              We&apos;ve sent a password reset link to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 rounded-lg bg-muted p-4 text-center">
              <p className="font-medium">{submittedEmail}</p>
            </div>
            <p className="mb-6 text-center text-sm text-muted-foreground">
              Click the link in the email to reset your password. If you don&apos;t see the email, 
              check your spam folder.
            </p>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setIsSubmitted(false)}
              >
                Use a different email
              </Button>
              <Link href="/auth/login" className="block">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md py-8">
      <Link
        href="/auth/login"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to sign in
      </Link>

      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Mail className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email and we&apos;ll send you a link to reset your password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Remember your password? </span>
            <Link href="/auth/login" className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
