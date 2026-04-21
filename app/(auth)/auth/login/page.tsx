'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Wheat } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Field, FieldLabel, FieldError } from '@/components/ui/field';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { useAuthStore } from '@/lib/store';
import { toast } from 'sonner';
import type { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('buyer');
  const { login } = useAuthStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const rememberMe = watch('rememberMe');

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password, role);
      toast.success('Welcome back!');
      
      if (redirect) {
        router.push(redirect);
      } else {
        router.push(role === 'buyer' ? '/buyer/dashboard' : '/seller/dashboard');
      }
    } catch {
      toast.error('Invalid email or password');
    }
  };

  return (
    <div className="w-full max-w-md py-8">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Wheat className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your Agro Market account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={role} onValueChange={(v) => setRole(v as UserRole)} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buyer">Buyer</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
            </TabsList>
            <TabsContent value="buyer" className="mt-0">
              <p className="text-center text-sm text-muted-foreground">
                Sign in to browse and purchase products
              </p>
            </TabsContent>
            <TabsContent value="seller" className="mt-0">
              <p className="text-center text-sm text-muted-foreground">
                Sign in to manage your store and products
              </p>
            </TabsContent>
          </Tabs>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
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

            <div className="flex items-center gap-2">
              <Checkbox
                id="rememberMe"
                checked={rememberMe}
                onCheckedChange={(checked) => setValue('rememberMe', checked === true)}
              />
              <label
                htmlFor="rememberMe"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 rounded-lg bg-muted/50 p-4">
            <p className="mb-2 text-center text-xs font-medium text-muted-foreground">Demo Credentials</p>
            <div className="grid gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Email:</span>
                <code className="rounded bg-muted px-2 py-0.5">demo@agromarket.zw</code>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Password:</span>
                <code className="rounded bg-muted px-2 py-0.5">Demo1234!</code>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account? </span>
            <Link href="/auth/welcome" className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
