'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, ShieldCheck, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';

export default function VerifyOTPPage() {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setIsVerifying(true);
    try {
      await authApi.verifyOTP(otp);
      toast.success('Verification successful!');
      router.push('/buyer/dashboard');
    } catch {
      toast.error('Invalid code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      // Simulate resend
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('New code sent!');
      setCountdown(60);
      
      // Countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch {
      toast.error('Failed to resend code');
    } finally {
      setIsResending(false);
    }
  };

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
            <ShieldCheck className="h-7 w-7" />
          </div>
          <CardTitle className="text-2xl">Verify Your Account</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your phone/email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-6">
            {/* OTP Input */}
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>

            {/* Verify Button */}
            <Button
              className="w-full"
              onClick={handleVerify}
              disabled={otp.length !== 6 || isVerifying}
            >
              {isVerifying ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Code'
              )}
            </Button>

            {/* Resend Code */}
            <div className="text-center">
              <p className="mb-2 text-sm text-muted-foreground">
                Didn&apos;t receive the code?
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResend}
                disabled={countdown > 0 || isResending}
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : countdown > 0 ? (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Resend in {countdown}s
                  </>
                ) : (
                  <>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Resend Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
