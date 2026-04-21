'use client';

import { useState } from 'react';
import { MapPin, Plus, Edit, Trash2, Home, Building, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { mockBuyer } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function BuyerAddressesPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const addresses = mockBuyer.savedAddresses;

  const handleDelete = () => {
    toast.success('Address deleted successfully');
    setDeleteId(null);
  };

  const handleSetDefault = (id: string) => {
    toast.success('Default address updated');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Saved Addresses</h1>
          <p className="mt-1 text-muted-foreground">
            Manage your delivery addresses
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Address
        </Button>
      </div>

      {addresses.length === 0 ? (
        <EmptyState
          icon="map"
          title="No saved addresses"
          description="Add your delivery addresses for faster checkout"
          action={
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Address
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {addresses.map((address) => (
            <Card key={address.id} className={address.isDefault ? 'border-primary' : ''}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${address.isDefault ? 'bg-primary/10 text-primary' : 'bg-muted'}`}>
                      {address.label.toLowerCase() === 'home' ? (
                        <Home className="h-5 w-5" />
                      ) : (
                        <Building className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{address.label}</p>
                      {address.isDefault && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      {!address.isDefault && (
                        <DropdownMenuItem onClick={() => handleSetDefault(address.id)}>
                          <MapPin className="mr-2 h-4 w-4" />
                          Set as Default
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteId(address.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">{address.fullName}</p>
                  <p>{address.street}</p>
                  <p>{address.city}, {address.province}</p>
                  <p>{address.country}</p>
                  <p className="pt-2">{address.phone}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Address</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this address? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
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
