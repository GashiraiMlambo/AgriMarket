import { z } from 'zod';

// Auth Validations
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
});

export const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const sellerSignupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessDescription: z.string().optional(),
  location: z.string().min(2, 'Please enter your business location'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const otpSchema = z.object({
  code: z.string().length(6, 'Please enter a valid 6-digit code'),
});

// Profile Validations
export const profileUpdateSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
});

export const sellerProfileSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessDescription: z.string().optional(),
  location: z.string().min(2, 'Please enter your business location'),
});

// Address Validations
export const addressSchema = z.object({
  label: z.string().min(1, 'Please provide a label'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  street: z.string().min(5, 'Please enter your street address'),
  city: z.string().min(2, 'Please enter your city'),
  province: z.string().min(2, 'Please select your province'),
  country: z.string().default('Zimbabwe'),
  postalCode: z.string().optional(),
  isDefault: z.boolean().default(false),
});

// Product Validations
export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  category: z.enum(['pork_meat', 'fresh_crops', 'vegetables', 'grains', 'fruits', 'other_produce'], {
    required_error: 'Please select a category',
  }),
  subcategory: z.string().optional(),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters').max(150, 'Short description must be less than 150 characters'),
  price: z.number().positive('Price must be greater than 0'),
  discountedPrice: z.number().positive().optional(),
  stockQuantity: z.number().int().min(0, 'Stock quantity cannot be negative'),
  unit: z.string().min(1, 'Please specify the unit'),
  weight: z.number().positive().optional(),
  weightUnit: z.string().optional(),
  freshnessType: z.enum(['fresh', 'frozen', 'dried', 'processed'], {
    required_error: 'Please select freshness type',
  }),
  location: z.string().min(2, 'Please enter the product location'),
  deliveryOptions: z.array(z.enum(['pickup', 'local_delivery', 'nationwide'])).min(1, 'Select at least one delivery option'),
  tags: z.array(z.string()).optional(),
  minOrderQuantity: z.number().int().min(1, 'Minimum order quantity must be at least 1'),
});

// Checkout Validations
export const checkoutSchema = z.object({
  addressId: z.string().min(1, 'Please select a delivery address'),
  deliveryOption: z.enum(['pickup', 'local_delivery', 'nationwide'], {
    required_error: 'Please select a delivery option',
  }),
  paymentMethod: z.enum(['ecocash', 'onemoney', 'visa', 'paypal'], {
    required_error: 'Please select a payment method',
  }),
  notes: z.string().optional(),
  couponCode: z.string().optional(),
});

// Review Validations
export const reviewSchema = z.object({
  rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
  title: z.string().optional(),
  comment: z.string().min(10, 'Review must be at least 10 characters'),
});

// Contact Form Validations
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

// Message Validations
export const messageSchema = z.object({
  content: z.string().min(1, 'Message cannot be empty'),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type SellerSignupFormData = z.infer<typeof sellerSignupSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type OTPFormData = z.infer<typeof otpSchema>;
export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;
export type SellerProfileFormData = z.infer<typeof sellerProfileSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;
export type ContactFormData = z.infer<typeof contactSchema>;
export type MessageFormData = z.infer<typeof messageSchema>;
