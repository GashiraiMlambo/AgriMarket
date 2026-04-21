'use client';

import {
  Bell,
  Package,
  CreditCard,
  Tag,
  Star,
  MessageCircle,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/empty-state';
import { useNotificationStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import type { NotificationType } from '@/types';

const iconMap: Record<NotificationType, typeof Package> = {
  order_update: Package,
  payment: CreditCard,
  promotion: Tag,
  review: Star,
  message: MessageCircle,
  system: AlertCircle,
  stock_alert: Bell,
};

export default function SellerNotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotificationStore();

  const handleNotificationClick = (id: string, isRead: boolean) => {
    if (!isRead) {
      markAsRead(id);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Notifications</h1>
          <p className="mt-1 text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <EmptyState
          icon="bell"
          title="No notifications"
          description="You're all caught up! We'll notify you when something happens."
        />
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const Icon = iconMap[notification.type] || Bell;
            return (
              <Card
                key={notification.id}
                className={cn(
                  'cursor-pointer transition-colors hover:bg-muted/50',
                  !notification.isRead && 'border-primary/50 bg-primary/5'
                )}
                onClick={() => handleNotificationClick(notification.id, notification.isRead)}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full',
                      !notification.isRead
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <Badge className="shrink-0">New</Badge>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
