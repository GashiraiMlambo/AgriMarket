import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  User, 
  BuyerProfile, 
  SellerProfile, 
  CartItem, 
  Product, 
  Notification,
  UserRole 
} from '@/types';
import { mockBuyer, mockSellers, mockCart, mockNotifications } from './mock-data';

// Auth Store
interface AuthState {
  user: User | BuyerProfile | SellerProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  setUser: (user: User | BuyerProfile | SellerProfile | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, _password: string, role: UserRole) => {
        set({ isLoading: true });
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (role === 'buyer') {
          set({ user: { ...mockBuyer, email }, isAuthenticated: true, isLoading: false });
        } else {
          set({ user: { ...mockSellers[0], email }, isAuthenticated: true, isLoading: false });
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },
    }),
    {
      name: 'agro-market-auth',
    }
  )
);

// Cart Store
interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: mockCart.items,
      isOpen: false,
      addItem: (product, quantity) => {
        const items = get().items;
        const existingItem = items.find(item => item.productId === product.id);
        
        if (existingItem) {
          set({
            items: items.map(item =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                id: `cart-item-${Date.now()}`,
                productId: product.id,
                product,
                quantity,
                selectedDeliveryOption: product.deliveryOptions[0],
              },
            ],
          });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter(item => item.productId !== productId) });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map(item =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        });
      },
      clearCart: () => set({ items: [] }),
      toggleCart: () => set({ isOpen: !get().isOpen }),
      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.discountedPrice || item.product.price;
          return total + price * item.quantity;
        }, 0);
      },
      getDeliveryFee: () => {
        const items = get().items;
        if (items.length === 0) return 0;
        // Simple delivery fee calculation
        return items.some(item => item.selectedDeliveryOption === 'local_delivery') ? 3.50 : 0;
      },
      getTotal: () => {
        return get().getSubtotal() + get().getDeliveryFee();
      },
      itemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'agro-market-cart',
    }
  )
);

// Wishlist Store
interface WishlistState {
  items: string[];
  addItem: (productId: string) => void;
  removeItem: (productId: string) => void;
  toggleItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: mockBuyer.wishlist,
      addItem: (productId) => {
        if (!get().items.includes(productId)) {
          set({ items: [...get().items, productId] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter(id => id !== productId) });
      },
      toggleItem: (productId) => {
        if (get().items.includes(productId)) {
          get().removeItem(productId);
        } else {
          get().addItem(productId);
        }
      },
      isInWishlist: (productId) => get().items.includes(productId),
    }),
    {
      name: 'agro-market-wishlist',
    }
  )
);

// Notification Store
interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: mockNotifications,
  unreadCount: mockNotifications.filter(n => !n.isRead).length,
  markAsRead: (id) => {
    set({
      notifications: get().notifications.map(n =>
        n.id === id ? { ...n, isRead: true } : n
      ),
      unreadCount: get().unreadCount - 1,
    });
  },
  markAllAsRead: () => {
    set({
      notifications: get().notifications.map(n => ({ ...n, isRead: true })),
      unreadCount: 0,
    });
  },
  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    set({
      notifications: [newNotification, ...get().notifications],
      unreadCount: get().unreadCount + 1,
    });
  },
}));

// Recently Viewed Store
interface RecentlyViewedState {
  items: string[];
  addItem: (productId: string) => void;
  clearAll: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      items: mockBuyer.recentlyViewed,
      addItem: (productId) => {
        const items = get().items.filter(id => id !== productId);
        set({ items: [productId, ...items].slice(0, 10) }); // Keep last 10
      },
      clearAll: () => set({ items: [] }),
    }),
    {
      name: 'agro-market-recently-viewed',
    }
  )
);

// UI Store
interface UIState {
  sidebarOpen: boolean;
  mobileMenuOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  sidebarOpen: true,
  mobileMenuOpen: false,
  toggleSidebar: () => set({ sidebarOpen: !get().sidebarOpen }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleMobileMenu: () => set({ mobileMenuOpen: !get().mobileMenuOpen }),
  setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
}));
