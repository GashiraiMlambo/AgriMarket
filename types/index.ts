// User Types
export type UserRole = 'buyer' | 'seller';

export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BuyerProfile extends User {
  role: 'buyer';
  savedAddresses: Address[];
  wishlist: string[];
  recentlyViewed: string[];
}

export interface SellerProfile extends User {
  role: 'seller';
  businessName: string;
  businessDescription?: string;
  businessLogo?: string;
  location: string;
  rating: number;
  totalReviews: number;
  totalSales: number;
  badges: SellerBadge[];
  kycStatus: 'pending' | 'verified' | 'rejected';
  bankDetails?: BankDetails;
  isActive: boolean;
}

export type SellerBadge = 'verified' | 'top_seller' | 'trusted_farm' | 'fast_delivery' | 'premium';

export interface BankDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  branchCode?: string;
}

// Address Types
export interface Address {
  id: string;
  userId: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode?: string;
  isDefault: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Product Types
export type ProductCategory = 
  | 'pork_meat'
  | 'fresh_crops'
  | 'vegetables'
  | 'grains'
  | 'fruits'
  | 'other_produce';

export type FreshnessType = 'fresh' | 'frozen' | 'dried' | 'processed';

export type AvailabilityStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'pre_order';

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerRating: number;
  sellerBadges: SellerBadge[];
  name: string;
  slug: string;
  category: ProductCategory;
  subcategory?: string;
  description: string;
  shortDescription: string;
  price: number;
  discountedPrice?: number;
  currency: string;
  stockQuantity: number;
  unit: string;
  weight?: number;
  weightUnit?: string;
  freshnessType: FreshnessType;
  location: string;
  deliveryOptions: DeliveryOption[];
  images: ProductImage[];
  tags: string[];
  sku: string;
  availabilityStatus: AvailabilityStatus;
  minOrderQuantity: number;
  averageRating: number;
  totalReviews: number;
  isFeatured: boolean;
  isOnSale: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export type DeliveryOption = 'pickup' | 'local_delivery' | 'nationwide';

// Cart Types
export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedDeliveryOption: DeliveryOption;
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  discount?: number;
}

// Order Types
export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'ecocash' | 'onemoney' | 'visa' | 'paypal';

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  sellerId: string;
  items: OrderItem[];
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryAddress: Address;
  deliveryOption: DeliveryOption;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  currency: string;
  notes?: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  unit: string;
}

// Review Types
export interface Review {
  id: string;
  productId: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar?: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  isVerifiedPurchase: boolean;
  helpfulCount: number;
  createdAt: string;
  sellerResponse?: {
    comment: string;
    createdAt: string;
  };
}

// Notification Types
export type NotificationType = 
  | 'order_update'
  | 'payment'
  | 'promotion'
  | 'review'
  | 'message'
  | 'system'
  | 'stock_alert';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: string;
}

// Message Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  attachments?: string[];
  isRead: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    role: UserRole;
  }[];
  lastMessage?: Message;
  unreadCount: number;
  productId?: string;
  productName?: string;
  createdAt: string;
  updatedAt: string;
}

// Analytics Types (for Seller Dashboard)
export interface SellerAnalytics {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  activeListings: number;
  pendingOrders: number;
  completedOrders: number;
  averageRating: number;
  revenueByMonth: { month: string; revenue: number }[];
  ordersByStatus: { status: OrderStatus; count: number }[];
  topProducts: { productId: string; productName: string; sales: number }[];
  recentOrders: Order[];
}

// Filter Types
export interface ProductFilters {
  category?: ProductCategory;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  sellerId?: string;
  availabilityStatus?: AvailabilityStatus;
  freshnessType?: FreshnessType;
  minWeight?: number;
  maxWeight?: number;
  rating?: number;
  search?: string;
}

export type SortOption = 
  | 'newest'
  | 'price_low_high'
  | 'price_high_low'
  | 'popularity'
  | 'rating';

// Pagination Types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
  acceptTerms: boolean;
}

export interface SellerSignupFormData extends SignupFormData {
  businessName: string;
  businessDescription?: string;
  location: string;
}

export interface ProductFormData {
  name: string;
  category: ProductCategory;
  subcategory?: string;
  description: string;
  shortDescription: string;
  price: number;
  discountedPrice?: number;
  stockQuantity: number;
  unit: string;
  weight?: number;
  weightUnit?: string;
  freshnessType: FreshnessType;
  location: string;
  deliveryOptions: DeliveryOption[];
  tags: string[];
  minOrderQuantity: number;
  images: File[] | string[];
}

export interface AddressFormData {
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  country: string;
  postalCode?: string;
  isDefault: boolean;
}

export interface CheckoutFormData {
  addressId: string;
  deliveryOption: DeliveryOption;
  paymentMethod: PaymentMethod;
  notes?: string;
  couponCode?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
