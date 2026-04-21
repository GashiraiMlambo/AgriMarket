# Agro Market - Deployment Guide

## Overview

Agro Market is a fully-featured agricultural marketplace web application built with Next.js 16, TypeScript, Tailwind CSS, and modern React patterns. It's designed for production deployment with a professional, responsive design suitable for Zimbabwean agricultural commerce.

## Project Structure

```
/vercel/share/v0-project/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   └── auth/
│   │       ├── welcome/          # Role selection
│   │       ├── signup/           # Buyer & seller signup
│   │       ├── login/            # Login page
│   │       ├── forgot-password/
│   │       ├── reset-password/
│   │       └── verify/           # OTP verification
│   ├── (public)/                 # Public pages
│   │   ├── page.tsx              # Landing page
│   │   ├── products/             # Product browsing
│   │   ├── sellers/              # Seller directory
│   │   ├── about/
│   │   ├── contact/
│   │   ├── terms/
│   │   └── privacy/
│   ├── (buyer)/                  # Buyer-only routes
│   │   ├── buyer/dashboard/
│   │   ├── buyer/cart/
│   │   ├── buyer/checkout/
│   │   ├── buyer/orders/
│   │   ├── buyer/wishlist/
│   │   ├── buyer/profile/
│   │   ├── buyer/addresses/
│   │   ├── buyer/settings/
│   │   ├── buyer/notifications/
│   │   └── buyer/messages/
│   ├── (seller)/                 # Seller-only routes
│   │   ├── seller/dashboard/
│   │   ├── seller/products/
│   │   ├── seller/products/new/
│   │   ├── seller/products/[id]/edit/
│   │   ├── seller/orders/
│   │   ├── seller/earnings/
│   │   ├── seller/analytics/
│   │   ├── seller/verification/
│   │   ├── seller/profile/
│   │   ├── seller/settings/
│   │   ├── seller/reviews/
│   │   ├── seller/messages/
│   │   └── seller/notifications/
│   ├── layout.tsx                # Root layout with branding
│   ├── error.tsx                 # Error boundary
│   ├── not-found.tsx             # 404 handler
│   └── globals.css               # Global styles with design tokens
│
├── components/                    # Reusable UI components
│   ├── navbar.tsx                # Header navigation
│   ├── footer.tsx                # Footer
│   ├── sidebar.tsx               # Dashboard sidebars
│   ├── product-card.tsx          # Product display
│   ├── empty-state.tsx           # No data states
│   ├── stat-card.tsx             # Dashboard metrics
│   ├── payment-method-selector.tsx
│   ├── seller-badge.tsx
│   ├── rating.tsx
│   ├── image-gallery.tsx
│   ├── status-badge.tsx
│   ├── loading-skeleton.tsx
│   ├── responsive-table.tsx
│   └── ui/                       # shadcn/ui components
│
├── lib/
│   ├── store.ts                  # Zustand state management
│   ├── api.ts                    # API utilities (mock)
│   ├── validations.ts            # Zod schemas for forms
│   └── mock-data.ts              # Realistic mock data
│
├── types/
│   └── index.ts                  # TypeScript interfaces
│
├── public/                        # Static assets
│
├── styles/
│   └── globals.css               # Tailwind config with design tokens
│
└── package.json                  # Dependencies
```

## Design System

### Color Palette
- **Primary**: Maroon/Deep Wine (#6b2737 light, #4a1a24 dark)
- **Secondary**: Accent color for secondary actions
- **Neutrals**: White, grays, charcoal, subtle beige
- **Status Colors**: Success (green), warning (orange), destructive (red)

### Typography
- **Sans Serif Font**: Geist (modern, clean)
- **Mono Font**: Geist Mono (for code, tables)
- **Sizes**: 14px minimum, responsive scaling via Tailwind

### Spacing
- Uses Tailwind spacing scale (4px base unit)
- Consistent padding/margins with gap classes
- Mobile-first responsive design

## Key Features

### Authentication
- Role-based signup (Buyer/Seller)
- Email/phone verification
- OTP verification flow
- Password recovery
- Session management ready for backend

### Buyer Features
- Browse products with filters and sorting
- Advanced search and category filtering
- Product detail pages with images and reviews
- Shopping cart with quantity management
- Wishlist functionality
- Checkout with multiple payment methods (EcoCash, OneMoney, Visa, PayPal)
- Order management and tracking
- Profile and address management
- Message/chat with sellers
- Product reviews and ratings
- Notifications center

### Seller Features
- Product management (add, edit, delete)
- Inventory tracking
- Order fulfillment
- Earnings dashboard with analytics
- Business verification
- Store profile management
- Buyer messaging
- Review management
- Performance metrics
- Settings and configurations

### UI/UX
- Fully responsive (mobile, tablet, desktop)
- Accessible color contrast and semantic HTML
- Loading states and skeletons
- Empty states for empty screens
- Toast notifications (Sonner integrated)
- Confirmation dialogs
- Error boundaries
- Mobile-optimized navigation

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **State Management**: Zustand
- **Icons**: Lucide React
- **Date Handling**: Ready for date-fns integration
- **Notifications**: Sonner
- **Data Fetching**: SWR-ready (mock services)

## Deployment Steps

### Vercel Deployment (Recommended)

1. **Connect GitHub Repository**
   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**
   - Visit https://vercel.com
   - Click "New Project" and select your repository
   - Vercel auto-detects Next.js
   - Set environment variables (if needed for backend)
   - Click "Deploy"

3. **Set Environment Variables** (if needed later)
   ```bash
   NEXT_PUBLIC_API_URL=https://api.example.com
   # Add any other required env vars in Vercel dashboard
   ```

### Self-Hosting (Node.js Server)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Start the server**
   ```bash
   npm start
   ```

3. **Configure process manager** (PM2 for production)
   ```bash
   npm install -g pm2
   pm2 start npm --name "agro-market" -- start
   pm2 save
   ```

### Docker Deployment

1. **Build Docker image**
   ```bash
   docker build -t agro-market:latest .
   ```

2. **Run container**
   ```bash
   docker run -p 3000:3000 agro-market:latest
   ```

## Backend Integration

Currently, the app uses mock services. To integrate a real backend:

1. **Replace mock API calls** in `lib/api.ts` with real endpoints
2. **Update environment variables** with your API endpoints
3. **Implement authentication** flow with your backend
4. **Connect to database** through backend APIs
5. **Implement payment gateway** integration (EcoCash, OneMoney, Visa, PayPal)

### API Endpoints to Create

**Authentication**
- POST `/api/auth/signup`
- POST `/api/auth/login`
- POST `/api/auth/logout`
- POST `/api/auth/verify-email`
- POST `/api/auth/reset-password`

**Products**
- GET `/api/products`
- GET `/api/products/:id`
- POST `/api/products` (seller)
- PATCH `/api/products/:id` (seller)
- DELETE `/api/products/:id` (seller)

**Orders**
- GET `/api/orders`
- POST `/api/orders`
- GET `/api/orders/:id`
- PATCH `/api/orders/:id/status`

**Sellers**
- GET `/api/sellers/:id`
- PATCH `/api/sellers/profile`
- GET `/api/sellers/analytics`

## Performance

- Next.js 16 with Turbopack for fast builds
- Automatic code splitting and lazy loading
- Image optimization ready
- CSS-in-JS with Tailwind
- Mobile-optimized responsive design

## Security Considerations

- Input validation with Zod on forms
- CSRF protection ready for backend integration
- XSS prevention through React's escaping
- Secure HTTP-only cookies ready for session management
- Rate limiting suggested for API
- SQL injection prevention (use parameterized queries)

## Future Enhancements

1. **Real Payment Integration**
   - EcoCash API integration
   - OneMoney payment gateway
   - Stripe for card payments
   - PayPal integration

2. **Real-time Features**
   - WebSocket for live chat
   - Push notifications
   - Real-time order updates

3. **Analytics & Reporting**
   - Sales analytics
   - User behavior tracking
   - Business performance metrics

4. **Admin Portal**
   - Seller management
   - Dispute resolution
   - Platform analytics
   - User management

5. **Marketplace Features**
   - Subscription plans
   - Affiliate program
   - Commission management
   - Vendor analytics

## Support

For issues or questions:
- Email: support@agromarket.co.zw
- Contact page: https://agromarket.co.zw/contact
- Address: 123 Agriculture Road, Harare, Zimbabwe
- Phone: +263 24 2700000

## License

This project is proprietary and confidential to Agro Market Ltd.
