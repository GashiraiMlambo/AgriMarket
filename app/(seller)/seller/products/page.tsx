'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Package,
  AlertTriangle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { EmptyState } from '@/components/empty-state';
import { mockProducts, mockSellers } from '@/lib/mock-data';
import { toast } from 'sonner';
import type { AvailabilityStatus } from '@/types';

const statusColors: Record<AvailabilityStatus, string> = {
  in_stock: 'bg-green-100 text-green-800',
  low_stock: 'bg-yellow-100 text-yellow-800',
  out_of_stock: 'bg-red-100 text-red-800',
  pre_order: 'bg-blue-100 text-blue-800',
};

export default function SellerProductsPage() {
  const seller = mockSellers[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  const sellerProducts = mockProducts.filter((p) => p.sellerId === seller.id);

  const filteredProducts = sellerProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || product.availabilityStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeleteProduct = () => {
    toast.success('Product deleted successfully');
    setDeleteProductId(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">My Products</h1>
          <p className="mt-1 text-muted-foreground">
            {sellerProducts.length} products in your store
          </p>
        </div>
        <Link href="/seller/products/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="in_stock">In Stock</SelectItem>
            <SelectItem value="low_stock">Low Stock</SelectItem>
            <SelectItem value="out_of_stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Table/Cards */}
      {filteredProducts.length === 0 ? (
        <EmptyState
          icon="package"
          title="No products found"
          description={
            searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'Start adding products to your store'
          }
          action={
            <Link href="/seller/products/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </Link>
          }
        />
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="grid gap-4 sm:hidden">
            {filteredProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={product.images[0]?.url || '/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sku}</p>
                        <Badge className={`mt-1 ${statusColors[product.availabilityStatus]}`}>
                          {product.availabilityStatus.replace('_', ' ')}
                        </Badge>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/products/${product.slug}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/seller/products/${product.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => setDeleteProductId(product.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t text-xs">
                      <div>
                        <p className="text-muted-foreground">Category</p>
                        <p className="font-semibold capitalize">
                          {product.category.replace('_', ' ')}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Price</p>
                        <p className="font-semibold">
                          ZWL {product.discountedPrice || product.price}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Stock</p>
                        <p className="font-semibold flex items-center gap-1">
                          {product.stockQuantity}
                          {product.stockQuantity < 10 && (
                            <AlertTriangle className="h-3 w-3 text-destructive" />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table View */}
          <Card className="hidden sm:block">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Product</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                              <Image
                                src={product.images[0]?.url || '/placeholder.jpg'}
                                alt={product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.sku}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="capitalize">
                          {product.category.replace('_', ' ')}
                        </TableCell>
                        <TableCell>
                          {product.discountedPrice ? (
                            <div>
                              <span className="font-medium">ZWL{product.discountedPrice.toFixed(2)}</span>
                              <span className="ml-1 text-sm text-muted-foreground line-through">
                                ZWL{product.price.toFixed(2)}
                              </span>
                            </div>
                          ) : (
                            <span className="font-medium">ZWL{product.price.toFixed(2)}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{product.stockQuantity}</span>
                            {product.stockQuantity < 10 && (
                              <AlertTriangle className="h-4 w-4 text-destructive" />
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={statusColors[product.availabilityStatus]}>
                            {product.availabilityStatus.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem asChild>
                                <Link href={`/products/${product.slug}`}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/seller/products/${product.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => setDeleteProductId(product.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
