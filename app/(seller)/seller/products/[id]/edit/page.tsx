'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { productSchema } from '@/lib/validations';
import { mockProducts } from '@/lib/mock-data';
import { Product } from '@/types';

const CATEGORIES = [
  { id: 'pork', label: 'Pork Meat' },
  { id: 'vegetables', label: 'Vegetables' },
  { id: 'grains', label: 'Grains' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'other', label: 'Other Farm Produce' },
];

const SUBCATEGORIES: Record<string, string[]> = {
  pork: ['Fresh Cuts', 'Processed', 'Specialty Cuts'],
  vegetables: ['Leafy Greens', 'Root Vegetables', 'Cruciferous'],
  grains: ['Maize', 'Wheat', 'Rice'],
  fruits: ['Citrus', 'Stone Fruits', 'Berries'],
  other: ['Dairy', 'Eggs', 'Honey'],
};

const UNITS = ['kg', 'lb', 'piece', 'dozen', 'bunch', 'bucket'];
const FRESHNESS = ['Fresh', 'Frozen', 'Dried', 'Processed'];

interface EditProductPageProps {
  params: {
    id: string;
  };
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const router = useRouter();
  const [images, setImages] = useState<string[]>([
    '/placeholder-product.jpg',
  ]);
  const [selectedCategory, setSelectedCategory] = useState('pork');
  const [isLoading, setIsLoading] = useState(false);

  const product = mockProducts.find((p) => p.id === params.id);

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: product || {
      name: '',
      category: 'pork',
      subcategory: 'Fresh Cuts',
      description: '',
      shortDescription: '',
      price: 0,
      discountedPrice: 0,
      stockQuantity: 0,
      weight: 0,
      unit: 'kg',
      freshnessType: 'Fresh',
      minimumOrderQuantity: 1,
    },
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    router.push('/seller/products');
  };

  if (!product) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
          <Link href="/seller/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/seller/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Product</h1>
          <p className="text-sm text-muted-foreground">Update your product information</p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Product Images */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Product Images</h2>
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-4 w-4 text-white" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Upload Area */}
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-8">
                <div className="text-center">
                  <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drag and drop images or click to browse
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Basic Information</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Fresh Pork Chops" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="One-line description"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Displayed in product listings
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your product in detail..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Category & Classification */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Category & Classification</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCategory(value);
                      }}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {CATEGORIES.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SUBCATEGORIES[selectedCategory].map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="freshnessType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Freshness Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {FRESHNESS.map((fresh) => (
                          <SelectItem key={fresh} value={fresh}>
                            {fresh}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Pricing</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Regular Price (ZWL)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="discountedPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discounted Price (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0.00"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>Leave empty if no discount</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Inventory */}
          <div className="rounded-lg border bg-card p-6">
            <h2 className="mb-4 text-lg font-semibold">Inventory</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="stockQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minimumOrderQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Order Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight/Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit of Measurement</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {UNITS.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <Link href="/seller/products" className="order-2 sm:order-1">
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isLoading}
              className="order-1 sm:order-2"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
