'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  ChevronRight,
  Upload,
  X,
  Plus,
  ImageIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { productCategories } from '@/lib/mock-data';
import { toast } from 'sonner';

const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  category: z.string().min(1, 'Please select a category'),
  subcategory: z.string().optional(),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  shortDescription: z.string().min(10, 'Short description must be at least 10 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  discountedPrice: z.coerce.number().optional(),
  stockQuantity: z.coerce.number().int().positive('Stock must be a positive integer'),
  unit: z.string().min(1, 'Please specify unit'),
  weight: z.coerce.number().optional(),
  weightUnit: z.string().optional(),
  freshnessType: z.enum(['fresh', 'frozen', 'dried', 'processed']),
  location: z.string().min(3, 'Please specify location'),
  minOrderQuantity: z.coerce.number().int().positive().default(1),
  tags: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const freshnessOptions = [
  { value: 'fresh', label: 'Fresh' },
  { value: 'frozen', label: 'Frozen' },
  { value: 'dried', label: 'Dried' },
  { value: 'processed', label: 'Processed' },
];

const unitOptions = ['kg', 'g', 'lb', 'pack', 'bunch', 'piece', 'bag', 'box', 'dozen'];

export default function NewProductPage() {
  const router = useRouter();
  const [deliveryOptions, setDeliveryOptions] = useState<string[]>(['local_delivery']);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      minOrderQuantity: 1,
      freshnessType: 'fresh',
      unit: 'kg',
    },
  });

  const selectedCategory = watch('category');

  const onSubmit = async (data: ProductFormData) => {
    if (uploadedImages.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }
    if (deliveryOptions.length === 0) {
      toast.error('Please select at least one delivery option');
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Product created successfully');
    router.push('/seller/products');
  };

  const handleImageUpload = () => {
    // Simulate image upload
    const demoImages = [
      'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=400&fit=crop',
    ];
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
    setUploadedImages([...uploadedImages, randomImage]);
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const toggleDeliveryOption = (option: string) => {
    if (deliveryOptions.includes(option)) {
      setDeliveryOptions(deliveryOptions.filter((o) => o !== option));
    } else {
      setDeliveryOptions([...deliveryOptions, option]);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/seller/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Add New Product</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">Add New Product</h1>
        <p className="mt-1 text-muted-foreground">
          Fill in the details to list a new product
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Product name, description, and category</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Product Name *</FieldLabel>
                    <Input id="name" {...register('name')} placeholder="e.g., Premium Pork Loin" />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </Field>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="category">Category *</FieldLabel>
                      <Select onValueChange={(v) => setValue('category', v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {productCategories.map((cat) => (
                            <SelectItem key={cat.id} value={cat.id}>
                              {cat.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.category && (
                        <p className="text-sm text-destructive">{errors.category.message}</p>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="subcategory">Subcategory</FieldLabel>
                      <Input id="subcategory" {...register('subcategory')} placeholder="e.g., Loin, Ribs" />
                    </Field>
                  </div>

                  <Field>
                    <FieldLabel htmlFor="shortDescription">Short Description *</FieldLabel>
                    <Input
                      id="shortDescription"
                      {...register('shortDescription')}
                      placeholder="Brief product summary"
                    />
                    {errors.shortDescription && (
                      <p className="text-sm text-destructive">{errors.shortDescription.message}</p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="description">Full Description *</FieldLabel>
                    <Textarea
                      id="description"
                      {...register('description')}
                      placeholder="Detailed product description..."
                      rows={5}
                    />
                    {errors.description && (
                      <p className="text-sm text-destructive">{errors.description.message}</p>
                    )}
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Pricing & Inventory */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
                <CardDescription>Set your prices and stock levels</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field>
                      <FieldLabel htmlFor="price">Price (USD) *</FieldLabel>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        {...register('price')}
                        placeholder="0.00"
                      />
                      {errors.price && (
                        <p className="text-sm text-destructive">{errors.price.message}</p>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="discountedPrice">Sale Price</FieldLabel>
                      <Input
                        id="discountedPrice"
                        type="number"
                        step="0.01"
                        {...register('discountedPrice')}
                        placeholder="0.00"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="unit">Unit *</FieldLabel>
                      <Select defaultValue="kg" onValueChange={(v) => setValue('unit', v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {unitOptions.map((unit) => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <Field>
                      <FieldLabel htmlFor="stockQuantity">Stock Quantity *</FieldLabel>
                      <Input
                        id="stockQuantity"
                        type="number"
                        {...register('stockQuantity')}
                        placeholder="0"
                      />
                      {errors.stockQuantity && (
                        <p className="text-sm text-destructive">{errors.stockQuantity.message}</p>
                      )}
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="minOrderQuantity">Min Order Qty</FieldLabel>
                      <Input
                        id="minOrderQuantity"
                        type="number"
                        {...register('minOrderQuantity')}
                        placeholder="1"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="freshnessType">Freshness Type *</FieldLabel>
                      <Select defaultValue="fresh" onValueChange={(v: any) => setValue('freshnessType', v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {freshnessOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field>
                      <FieldLabel htmlFor="weight">Weight</FieldLabel>
                      <Input
                        id="weight"
                        type="number"
                        step="0.1"
                        {...register('weight')}
                        placeholder="0"
                      />
                    </Field>

                    <Field>
                      <FieldLabel htmlFor="weightUnit">Weight Unit</FieldLabel>
                      <Select onValueChange={(v) => setValue('weightUnit', v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Kilograms (kg)</SelectItem>
                          <SelectItem value="g">Grams (g)</SelectItem>
                          <SelectItem value="lb">Pounds (lb)</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                </FieldGroup>
              </CardContent>
            </Card>

            {/* Delivery & Location */}
            <Card>
              <CardHeader>
                <CardTitle>Delivery & Location</CardTitle>
                <CardDescription>Where your product is located and delivery options</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="location">Location *</FieldLabel>
                    <Input
                      id="location"
                      {...register('location')}
                      placeholder="e.g., Harare, Zimbabwe"
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive">{errors.location.message}</p>
                    )}
                  </Field>

                  <Field>
                    <FieldLabel>Delivery Options *</FieldLabel>
                    <div className="mt-2 space-y-3">
                      {[
                        { id: 'pickup', label: 'Store Pickup', desc: 'Customer picks up from your location' },
                        { id: 'local_delivery', label: 'Local Delivery', desc: 'Delivery within your city' },
                        { id: 'nationwide', label: 'Nationwide Shipping', desc: 'Ship anywhere in the country' },
                      ].map((option) => (
                        <label
                          key={option.id}
                          className="flex cursor-pointer items-start gap-3 rounded-lg border p-3 hover:bg-muted/50"
                        >
                          <Checkbox
                            checked={deliveryOptions.includes(option.id)}
                            onCheckedChange={() => toggleDeliveryOption(option.id)}
                          />
                          <div>
                            <p className="font-medium">{option.label}</p>
                            <p className="text-sm text-muted-foreground">{option.desc}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="tags">Tags</FieldLabel>
                    <Input
                      id="tags"
                      {...register('tags')}
                      placeholder="e.g., organic, premium, fresh (comma-separated)"
                    />
                    <p className="text-xs text-muted-foreground">Separate tags with commas</p>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Product Images */}
            <Card>
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>Upload high-quality product photos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Uploaded Images */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2">
                      {uploadedImages.map((img, index) => (
                        <div key={index} className="relative aspect-square">
                          <img
                            src={img}
                            alt={`Product ${index + 1}`}
                            className="h-full w-full rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {index === 0 && (
                            <Badge className="absolute bottom-1 left-1 text-xs">Primary</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 transition-colors hover:bg-muted/50"
                  >
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">Click to upload</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Creating...' : 'Create Product'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => router.back()}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
