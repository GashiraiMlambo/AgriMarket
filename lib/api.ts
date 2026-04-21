import type {
  Product,
  Order,
  Review,
  SellerProfile,
  Address,
  Notification,
  Conversation,
  Message,
  ProductFilters,
  SortOption,
  PaginatedResponse,
  ApiResponse,
  SellerAnalytics,
} from '@/types';
import {
  mockProducts,
  mockOrders,
  mockReviews,
  mockSellers,
  mockAddresses,
  mockNotifications,
  mockConversations,
  mockMessages,
  mockSellerAnalytics,
} from './mock-data';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Products API
export const productsApi = {
  getAll: async (
    filters?: ProductFilters,
    sort?: SortOption,
    page = 1,
    limit = 12
  ): Promise<PaginatedResponse<Product>> => {
    await delay(500);
    
    let filtered = [...mockProducts];
    
    // Apply filters
    if (filters) {
      if (filters.category) {
        filtered = filtered.filter(p => p.category === filters.category);
      }
      if (filters.subcategory) {
        filtered = filtered.filter(p => p.subcategory === filters.subcategory);
      }
      if (filters.minPrice !== undefined) {
        filtered = filtered.filter(p => (p.discountedPrice || p.price) >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(p => (p.discountedPrice || p.price) <= filters.maxPrice!);
      }
      if (filters.location) {
        filtered = filtered.filter(p => p.location.toLowerCase().includes(filters.location!.toLowerCase()));
      }
      if (filters.sellerId) {
        filtered = filtered.filter(p => p.sellerId === filters.sellerId);
      }
      if (filters.availabilityStatus) {
        filtered = filtered.filter(p => p.availabilityStatus === filters.availabilityStatus);
      }
      if (filters.freshnessType) {
        filtered = filtered.filter(p => p.freshnessType === filters.freshnessType);
      }
      if (filters.rating) {
        filtered = filtered.filter(p => p.averageRating >= filters.rating!);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
      }
    }
    
    // Apply sorting
    if (sort) {
      switch (sort) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'price_low_high':
          filtered.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
          break;
        case 'price_high_low':
          filtered.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
          break;
        case 'popularity':
          filtered.sort((a, b) => b.totalReviews - a.totalReviews);
          break;
        case 'rating':
          filtered.sort((a, b) => b.averageRating - a.averageRating);
          break;
      }
    }
    
    // Paginate
    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);
    
    return {
      data,
      total,
      page,
      limit,
      totalPages,
      hasMore: page < totalPages,
    };
  },
  
  getById: async (id: string): Promise<ApiResponse<Product>> => {
    await delay(300);
    const product = mockProducts.find(p => p.id === id);
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    return { success: true, data: product };
  },
  
  getBySlug: async (slug: string): Promise<ApiResponse<Product>> => {
    await delay(300);
    const product = mockProducts.find(p => p.slug === slug);
    if (!product) {
      return { success: false, error: 'Product not found' };
    }
    return { success: true, data: product };
  },
  
  getFeatured: async (limit = 8): Promise<Product[]> => {
    await delay(300);
    return mockProducts.filter(p => p.isFeatured).slice(0, limit);
  },
  
  getOnSale: async (limit = 8): Promise<Product[]> => {
    await delay(300);
    return mockProducts.filter(p => p.isOnSale).slice(0, limit);
  },
  
  getRelated: async (productId: string, limit = 4): Promise<Product[]> => {
    await delay(300);
    const product = mockProducts.find(p => p.id === productId);
    if (!product) return [];
    return mockProducts
      .filter(p => p.id !== productId && p.category === product.category)
      .slice(0, limit);
  },
  
  getBySeller: async (sellerId: string): Promise<Product[]> => {
    await delay(300);
    return mockProducts.filter(p => p.sellerId === sellerId);
  },
  
  search: async (query: string): Promise<Product[]> => {
    await delay(300);
    const searchLower = query.toLowerCase();
    return mockProducts.filter(p =>
      p.name.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower) ||
      p.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  },
};

// Orders API
export const ordersApi = {
  getAll: async (userId: string, role: 'buyer' | 'seller'): Promise<Order[]> => {
    await delay(500);
    if (role === 'buyer') {
      return mockOrders.filter(o => o.buyerId === userId);
    }
    return mockOrders.filter(o => o.sellerId === userId);
  },
  
  getById: async (id: string): Promise<ApiResponse<Order>> => {
    await delay(300);
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      return { success: false, error: 'Order not found' };
    }
    return { success: true, data: order };
  },
  
  create: async (orderData: Partial<Order>): Promise<ApiResponse<Order>> => {
    await delay(1000);
    const newOrder: Order = {
      ...orderData,
      id: `order-${Date.now()}`,
      orderNumber: `AGM-2024-${String(Date.now()).slice(-6)}`,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as Order;
    return { success: true, data: newOrder, message: 'Order created successfully' };
  },
  
  updateStatus: async (id: string, status: Order['status']): Promise<ApiResponse<Order>> => {
    await delay(500);
    const order = mockOrders.find(o => o.id === id);
    if (!order) {
      return { success: false, error: 'Order not found' };
    }
    const updated = { ...order, status, updatedAt: new Date().toISOString() };
    return { success: true, data: updated };
  },
};

// Reviews API
export const reviewsApi = {
  getByProduct: async (productId: string): Promise<Review[]> => {
    await delay(300);
    return mockReviews.filter(r => r.productId === productId);
  },
  
  create: async (reviewData: Partial<Review>): Promise<ApiResponse<Review>> => {
    await delay(500);
    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}`,
      isVerifiedPurchase: true,
      helpfulCount: 0,
      createdAt: new Date().toISOString(),
    } as Review;
    return { success: true, data: newReview };
  },
  
  markHelpful: async (id: string): Promise<ApiResponse<Review>> => {
    await delay(300);
    const review = mockReviews.find(r => r.id === id);
    if (!review) {
      return { success: false, error: 'Review not found' };
    }
    const updated = { ...review, helpfulCount: review.helpfulCount + 1 };
    return { success: true, data: updated };
  },
};

// Sellers API
export const sellersApi = {
  getById: async (id: string): Promise<ApiResponse<SellerProfile>> => {
    await delay(300);
    const seller = mockSellers.find(s => s.id === id);
    if (!seller) {
      return { success: false, error: 'Seller not found' };
    }
    return { success: true, data: seller };
  },
  
  getAll: async (): Promise<SellerProfile[]> => {
    await delay(300);
    return mockSellers;
  },
  
  getAnalytics: async (_sellerId: string): Promise<SellerAnalytics> => {
    await delay(500);
    return mockSellerAnalytics;
  },
};

// Addresses API
export const addressesApi = {
  getByUser: async (userId: string): Promise<Address[]> => {
    await delay(300);
    return mockAddresses.filter(a => a.userId === userId);
  },
  
  create: async (addressData: Partial<Address>): Promise<ApiResponse<Address>> => {
    await delay(500);
    const newAddress: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
    } as Address;
    return { success: true, data: newAddress };
  },
  
  update: async (id: string, addressData: Partial<Address>): Promise<ApiResponse<Address>> => {
    await delay(500);
    const address = mockAddresses.find(a => a.id === id);
    if (!address) {
      return { success: false, error: 'Address not found' };
    }
    const updated = { ...address, ...addressData };
    return { success: true, data: updated };
  },
  
  delete: async (id: string): Promise<ApiResponse<void>> => {
    await delay(300);
    return { success: true, message: 'Address deleted successfully' };
  },
};

// Notifications API
export const notificationsApi = {
  getByUser: async (userId: string): Promise<Notification[]> => {
    await delay(300);
    return mockNotifications.filter(n => n.userId === userId);
  },
  
  markAsRead: async (id: string): Promise<ApiResponse<void>> => {
    await delay(200);
    return { success: true };
  },
  
  markAllAsRead: async (_userId: string): Promise<ApiResponse<void>> => {
    await delay(300);
    return { success: true };
  },
};

// Messages API
export const messagesApi = {
  getConversations: async (_userId: string): Promise<Conversation[]> => {
    await delay(300);
    return mockConversations;
  },
  
  getMessages: async (conversationId: string): Promise<Message[]> => {
    await delay(300);
    return mockMessages.filter(m => m.conversationId === conversationId);
  },
  
  sendMessage: async (conversationId: string, content: string, senderId: string): Promise<ApiResponse<Message>> => {
    await delay(500);
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId,
      senderName: 'You',
      content,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    return { success: true, data: newMessage };
  },
};

// Auth API (for future backend integration)
export const authApi = {
  login: async (email: string, _password: string): Promise<ApiResponse<{ token: string; user: unknown }>> => {
    await delay(1000);
    // This would hit the real backend
    return { success: true, data: { token: 'mock-jwt-token', user: {} } };
  },
  
  register: async (_userData: unknown): Promise<ApiResponse<{ token: string; user: unknown }>> => {
    await delay(1000);
    return { success: true, data: { token: 'mock-jwt-token', user: {} } };
  },
  
  logout: async (): Promise<ApiResponse<void>> => {
    await delay(300);
    return { success: true };
  },
  
  forgotPassword: async (_email: string): Promise<ApiResponse<void>> => {
    await delay(500);
    return { success: true, message: 'Password reset email sent' };
  },
  
  resetPassword: async (_token: string, _password: string): Promise<ApiResponse<void>> => {
    await delay(500);
    return { success: true, message: 'Password reset successfully' };
  },
  
  verifyOTP: async (_code: string): Promise<ApiResponse<void>> => {
    await delay(500);
    return { success: true, message: 'OTP verified successfully' };
  },
};
