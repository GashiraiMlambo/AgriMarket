# Agro Market - Development Guide

## Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```

The app runs on `http://localhost:3000`

### 3. Build for Production
```bash
pnpm build
pnpm start
```

## Development Workflow

### Adding a New Page

1. Create the file in the appropriate route group:
   ```
   app/(public)/new-page/page.tsx
   app/(buyer)/buyer/new-page/page.tsx
   app/(seller)/seller/new-page/page.tsx
   ```

2. Import components and create your page:
   ```tsx
   import { Navbar } from '@/components/navbar'
   import { Footer } from '@/components/footer'
   
   export default function NewPage() {
     return (
       <div className="min-h-screen flex flex-col">
         <Navbar />
         <main className="flex-1">
           {/* Your content */}
         </main>
         <Footer />
       </div>
     )
   }
   ```

### Adding a New Component

1. Create in `/components`:
   ```tsx
   // components/my-component.tsx
   export function MyComponent() {
     return <div>My Component</div>
   }
   ```

2. Import in your pages:
   ```tsx
   import { MyComponent } from '@/components/my-component'
   ```

### Working with Forms

1. Import React Hook Form and validation:
   ```tsx
   import { useForm } from 'react-hook-form'
   import { zodResolver } from '@hookform/resolvers/zod'
   import { loginSchema } from '@/lib/validations'
   
   export function LoginForm() {
     const form = useForm({
       resolver: zodResolver(loginSchema),
     })
     
     return (
       <form onSubmit={form.handleSubmit(onSubmit)}>
         {/* Form fields */}
       </form>
     )
   }
   ```

2. Add validation schemas in `/lib/validations.ts`:
   ```tsx
   export const mySchema = z.object({
     email: z.string().email('Invalid email'),
     password: z.string().min(8, 'Too short'),
   })
   ```

### Using State Management

For global state, use Zustand:

```tsx
// In lib/store.ts
export const useAppStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

// In components
import { useAppStore } from '@/lib/store'

export function MyComponent() {
  const user = useAppStore((state) => state.user)
  const setUser = useAppStore((state) => state.setUser)
  
  return <div>{user?.name}</div>
}
```

### Handling API Calls

Currently using mock services. Update `/lib/api.ts` when connecting to real backend:

```tsx
// Current: Mock
export const authApi = {
  login: async (email: string, password: string) => {
    // Returns mock user
  },
}

// Update to real API
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    return response.json()
  },
}
```

### Styling Guidelines

Use Tailwind CSS classes:

```tsx
// Good: Use Tailwind spacing scale
<div className="p-4 mx-2 py-6 gap-4">

// Avoid: Arbitrary values
<div className="p-[16px] mx-[8px]">

// Responsive: Mobile-first
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

// Use design tokens from CSS variables
<div className="bg-background text-foreground">
```

### Design Tokens

Primary colors are defined in `app/globals.css`:

```css
@theme {
  --color-primary: #6b2737;
  --color-secondary: #8B5A7D;
  /* ... more colors ... */
}
```

Use them with Tailwind:
```tsx
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-secondary text-secondary-foreground">Secondary</div>
```

## Folder Structure Conventions

- **`components/`** - Reusable UI components
- **`components/ui/`** - shadcn/ui components
- **`app/`** - Pages and layouts using App Router
- **`app/(public)/`** - Public pages (no auth required)
- **`app/(auth)/`** - Authentication pages
- **`app/(buyer)/`** - Buyer-only protected routes
- **`app/(seller)/`** - Seller-only protected routes
- **`lib/`** - Utilities, helpers, stores, API services
- **`types/`** - TypeScript type definitions
- **`public/`** - Static assets

## Common Tasks

### Adding a New Product Filter

1. Update the products page state:
   ```tsx
   const [filters, setFilters] = useState({
     category: 'all',
     priceRange: [0, 1000],
     location: '',
     newFilter: 'default', // Add your filter
   })
   ```

2. Add filter input:
   ```tsx
   <Input
     placeholder="New Filter"
     onChange={(e) => setFilters({...filters, newFilter: e.target.value})}
   />
   ```

3. Filter the products:
   ```tsx
   const filtered = mockProducts.filter(p => {
     if (filters.newFilter !== 'default' && p.someField !== filters.newFilter) return false
     return true
   })
   ```

### Adding a Toast Notification

```tsx
import { toast } from 'sonner'

// Success
toast.success('Order placed successfully!')

// Error
toast.error('Failed to place order')

// Custom
toast('Custom message')
```

### Creating a Modal Dialog

Use the Dialog component from shadcn/ui:

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export function MyDialog() {
  const [open, setOpen] = useState(false)
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>Are you sure?</DialogDescription>
        </DialogHeader>
        {/* Content */}
      </DialogContent>
    </Dialog>
  )
}
```

### Adding Loading States

```tsx
import { Spinner } from '@/components/ui/spinner'

export function MyComponent() {
  const [isLoading, setIsLoading] = useState(false)
  
  return (
    <>
      {isLoading && <Spinner />}
      <button onClick={() => setIsLoading(true)}>
        {isLoading ? 'Loading...' : 'Click me'}
      </button>
    </>
  )
}
```

## Testing Locally

### Test Authentication Flow
- Go to `/auth/welcome`
- Click "Sign up as Buyer" or "Sign up as Seller"
- Fill form and submit (mock submission)
- Navigate to respective dashboard

### Test Product Browsing
- Go to `/products`
- Use filters and search
- Click product cards
- Add to cart/wishlist

### Test Checkout
- Add items to cart
- Go to `/buyer/cart`
- Proceed to checkout
- Select payment method
- Mock payment confirmation

### Test Seller Features
- Sign up as seller
- Go to `/seller/dashboard`
- Add new products
- Manage inventory
- View orders

## Debugging Tips

### Check Console Logs
- Open browser DevTools (F12)
- Check Console tab for errors
- Add `console.log()` statements in code

### Use React DevTools
- Install React DevTools browser extension
- Inspect component props and state
- Debug state changes

### Check Network Requests
- Open DevTools Network tab
- See all API calls
- Check request/response payloads

## Code Quality

### Linting (when added)
```bash
npm run lint
```

### Formatting (when added)
```bash
npm run format
```

## Performance Optimization

- Use Next.js Image component for images
- Lazy load heavy components with `dynamic()`
- Use `React.memo()` for expensive components
- Check bundle size with `npm run build`

## Common Issues

### Issue: Page not rendering
**Solution**: Check if route group folder is correct and page.tsx exists

### Issue: Tailwind classes not applying
**Solution**: Ensure the className is in an HTML element, not a custom component (unless component spreads className)

### Issue: Form validation not working
**Solution**: Verify Zod schema is imported and zodResolver is used

### Issue: State not updating
**Solution**: Check if you're mutating state directly (use spread operator instead)

## Next Steps for Backend Integration

1. Set up API endpoints based on `/lib/api.ts` structure
2. Replace mock services with real API calls
3. Implement authentication middleware
4. Set up database with the structure defined in types
5. Add real payment gateway integration
6. Implement WebSocket for real-time features
7. Add proper error handling and logging
8. Set up monitoring and analytics

## Resources

- [Next.js Documentation](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Zustand](https://github.com/pmndrs/zustand)

## Getting Help

Refer to:
- PROJECT_COMPLETION.md - Project overview
- MOBILE_OPTIMIZATION.md - Mobile responsiveness details
- DEPLOYMENT_GUIDE.md - How to deploy the application
