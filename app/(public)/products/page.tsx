'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ProductCard } from '@/components/product-card';
import { EmptyState } from '@/components/empty-state';
import { mockProducts, productCategories, mockSellers } from '@/lib/mock-data';
import type { ProductCategory, FreshnessType, SortOption, Product } from '@/types';

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_low_high', label: 'Price: Low to High' },
  { value: 'price_high_low', label: 'Price: High to Low' },
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Best Rated' },
];

const freshnessOptions = [
  { value: 'fresh', label: 'Fresh' },
  { value: 'frozen', label: 'Frozen' },
  { value: 'dried', label: 'Dried' },
  { value: 'processed', label: 'Processed' },
];

const availabilityOptions = [
  { value: 'in_stock', label: 'In Stock' },
  { value: 'low_stock', label: 'Low Stock' },
  { value: 'pre_order', label: 'Pre-Order' },
];

const locations = ['Harare, Zimbabwe', 'Bulawayo, Zimbabwe', 'Mutare, Zimbabwe'];

function ProductList() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Filters
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>(
    searchParams.get('category') ? [searchParams.get('category') as ProductCategory] : []
  );
  const [selectedFreshness, setSelectedFreshness] = useState<FreshnessType[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [showSaleOnly, setShowSaleOnly] = useState(searchParams.get('sale') === 'true');

  // Filter products
  const filteredProducts = useMemo(() => {
    let products = [...mockProducts];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    // Categories
    if (selectedCategories.length > 0) {
      products = products.filter((p) => selectedCategories.includes(p.category));
    }

    // Freshness
    if (selectedFreshness.length > 0) {
      products = products.filter((p) => selectedFreshness.includes(p.freshnessType));
    }

    // Locations
    if (selectedLocations.length > 0) {
      products = products.filter((p) => selectedLocations.includes(p.location));
    }

    // Sellers
    if (selectedSellers.length > 0) {
      products = products.filter((p) => selectedSellers.includes(p.sellerId));
    }

    // Price range
    products = products.filter((p) => {
      const price = p.discountedPrice || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Sale only
    if (showSaleOnly) {
      products = products.filter((p) => p.isOnSale);
    }

    // Sort
    switch (sortBy) {
      case 'price_low_high':
        products.sort((a, b) => (a.discountedPrice || a.price) - (b.discountedPrice || b.price));
        break;
      case 'price_high_low':
        products.sort((a, b) => (b.discountedPrice || b.price) - (a.discountedPrice || a.price));
        break;
      case 'popularity':
        products.sort((a, b) => b.totalReviews - a.totalReviews);
        break;
      case 'rating':
        products.sort((a, b) => b.averageRating - a.averageRating);
        break;
      case 'newest':
      default:
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return products;
  }, [
    searchQuery,
    selectedCategories,
    selectedFreshness,
    selectedLocations,
    selectedSellers,
    priceRange,
    showSaleOnly,
    sortBy,
  ]);

  const activeFiltersCount =
    selectedCategories.length +
    selectedFreshness.length +
    selectedLocations.length +
    selectedSellers.length +
    (showSaleOnly ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedFreshness([]);
    setSelectedLocations([]);
    setSelectedSellers([]);
    setPriceRange([0, 50]);
    setShowSaleOnly(false);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Categories */}
      <Accordion type="single" collapsible defaultValue="categories">
        <AccordionItem value="categories">
          <AccordionTrigger className="text-sm font-semibold">Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {productCategories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={category.id}
                    checked={selectedCategories.includes(category.id as ProductCategory)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([...selectedCategories, category.id as ProductCategory]);
                      } else {
                        setSelectedCategories(selectedCategories.filter((c) => c !== category.id));
                      }
                    }}
                  />
                  <Label htmlFor={category.id} className="text-sm cursor-pointer">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Price Range */}
      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-semibold">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <Slider
                min={0}
                max={50}
                step={1}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Freshness */}
      <Accordion type="single" collapsible>
        <AccordionItem value="freshness">
          <AccordionTrigger className="text-sm font-semibold">Freshness Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {freshnessOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedFreshness.includes(option.value as FreshnessType)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedFreshness([...selectedFreshness, option.value as FreshnessType]);
                      } else {
                        setSelectedFreshness(selectedFreshness.filter((f) => f !== option.value));
                      }
                    }}
                  />
                  <Label htmlFor={option.value} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Location */}
      <Accordion type="single" collapsible>
        <AccordionItem value="location">
          <AccordionTrigger className="text-sm font-semibold">Location</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedLocations([...selectedLocations, location]);
                      } else {
                        setSelectedLocations(selectedLocations.filter((l) => l !== location));
                      }
                    }}
                  />
                  <Label htmlFor={location} className="text-sm cursor-pointer">
                    {location}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Sellers */}
      <Accordion type="single" collapsible>
        <AccordionItem value="sellers">
          <AccordionTrigger className="text-sm font-semibold">Sellers</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 pt-2">
              {mockSellers.map((seller) => (
                <div key={seller.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={seller.id}
                    checked={selectedSellers.includes(seller.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSellers([...selectedSellers, seller.id]);
                      } else {
                        setSelectedSellers(selectedSellers.filter((s) => s !== seller.id));
                      }
                    }}
                  />
                  <Label htmlFor={seller.id} className="text-sm cursor-pointer">
                    {seller.businessName}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Sale Only */}
      <div className="flex items-center space-x-2 pt-2">
        <Checkbox
          id="sale-only"
          checked={showSaleOnly}
          onCheckedChange={(checked) => setShowSaleOnly(!!checked)}
        />
        <Label htmlFor="sale-only" className="text-sm cursor-pointer font-medium">
          On Sale Only
        </Label>
      </div>

      {/* Clear Filters */}
      {activeFiltersCount > 0 && (
        <Button variant="outline" className="w-full" onClick={clearAllFilters}>
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our selection of fresh pork and farm produce
        </p>
      </div>

      {/* Search and Controls */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="relative flex-1 sm:max-w-md"
        >
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </form>

        <div className="flex items-center gap-2">
          {/* Mobile Filter Button */}
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden" size="sm">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge className="ml-2" variant="secondary">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterContent />
              </div>
            </SheetContent>
          </Sheet>

          {/* Sort */}
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger className="w-40 sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="hidden items-center rounded-md border sm:flex">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {selectedCategories.map((cat) => {
            const category = productCategories.find((c) => c.id === cat);
            return (
              <Badge key={cat} variant="secondary" className="gap-1">
                {category?.name}
                <button
                  onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== cat))}
                  className="ml-1 hover:text-foreground"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
          {selectedFreshness.map((f) => (
            <Badge key={f} variant="secondary" className="gap-1">
              {freshnessOptions.find((o) => o.value === f)?.label}
              <button
                onClick={() => setSelectedFreshness(selectedFreshness.filter((fr) => fr !== f))}
                className="ml-1 hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          {showSaleOnly && (
            <Badge variant="secondary" className="gap-1">
              On Sale
              <button onClick={() => setShowSaleOnly(false)} className="ml-1 hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )}
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          <div className="sticky top-24">
            <h2 className="mb-4 text-lg font-semibold">Filters</h2>
            <FilterContent />
          </div>
        </aside>

        {/* Products */}
        <div className="flex-1">
          {/* Results Count */}
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>

          {filteredProducts.length === 0 ? (
            <EmptyState
              icon="package"
              title="No products found"
              description="Try adjusting your filters or search query"
              action={
                <Button variant="outline" onClick={clearAllFilters}>
                  Clear Filters
                </Button>
              }
            />
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid gap-4 sm:grid-cols-2 xl:grid-cols-3'
                  : 'space-y-4'
              }
            >
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant={viewMode === 'list' ? 'horizontal' : 'default'}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    }>
      <ProductList />
    </Suspense>
  );
}
