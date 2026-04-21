'use client';

import { Navbar } from '@/components/navbar';
import { DashboardSidebar } from '@/components/dashboard-sidebar';

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <DashboardSidebar role="seller" />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
