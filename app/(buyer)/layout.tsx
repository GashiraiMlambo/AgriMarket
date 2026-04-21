'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { useAuthStore } from '@/lib/store';

export default function BuyerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  // For demo purposes, we'll allow access without authentication
  // In production, uncomment the redirect logic
  /*
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'buyer') {
      router.push('/auth/login');
    }
  }, [isAuthenticated, user, router]);
  */

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <DashboardSidebar role="buyer" />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
