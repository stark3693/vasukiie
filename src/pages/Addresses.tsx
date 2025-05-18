
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAddresses, Address } from "@/hooks/useAddresses";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, Plus, Home, Building, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

// List of all US states
const US_STATES = [
 "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
"Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
"Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
"Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
"Uttarakhand", "West Bengal"

];

interface AddressFormValues {
  name: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
}

const Addresses = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { addresses, isLoading, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useAddresses();
  const [open, setOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const form = useForm<AddressFormValues>({
    defaultValues: {
      name: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      country: "India",
      is_default: false
    }
  });

  // If not authenticated and finished loading, redirect to auth page
  if (!user && !authLoading) {
    return <Navigate to="/auth" />;
  }

  const openAddDialog = () => {
    form.reset({
      name: "",
      street: "",
      city: "",
      state: "",
      zip_code: "",
      country: "India",
      is_default: addresses.length === 0 ? true : false // Make default if it's the first address
    });
    setEditingAddress(null);
    setOpen(true);
  };

  const openEditDialog = (address: Address) => {
    form.reset({
      name: address.name,
      street: address.street,
      city: address.city,
      state: address.state,
      zip_code: address.zip_code,
      country: address.country,
      is_default: address.is_default
    });
    setEditingAddress(address);
    setOpen(true);
  };

  const handleSubmit = (values: AddressFormValues) => {
    if (editingAddress) {
      updateAddress(editingAddress.id, values);
    } else {
      addAddress(values);
    }
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this address?")) {
      deleteAddress(id);
    }
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container-custom pt-32 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="heading-lg">My Addresses</h1>
          <Button 
            onClick={openAddDialog} 
            className="bg-boutique-taupe hover:bg-boutique-taupe/90"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Address
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p>Loading addresses...</p>
          </div>
        ) : addresses.length === 0 ? (
          <div className="text-center py-16">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="heading-sm mb-4">No Addresses Yet</h2>
            <p className="mb-8 text-gray-600 max-w-md mx-auto">
              You haven't added any addresses yet. Add an address to make checkout easier.
            </p>
            <Button onClick={openAddDialog} className="bg-boutique-taupe hover:bg-boutique-taupe/90">
              Add Address
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => (
              <Card key={address.id} className="p-6 relative">
                {address.is_default && (
                  <Badge className="absolute top-2 right-2 bg-boutique-taupe">
                    Default
                  </Badge>
                )}
                <div className="flex items-start mb-3">
                  {address.name.toLowerCase().includes('home') ? (
                    <Home className="h-5 w-5 mr-2 text-gray-500" />
                  ) : (
                    <Building className="h-5 w-5 mr-2 text-gray-500" />
                  )}
                  <h3 className="text-lg font-medium">{address.name}</h3>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-800">{address.street}</p>
                  <p className="text-gray-800">
                    {address.city}, {address.state} {address.zip_code}
                  </p>
                  <p className="text-gray-600">{address.country}</p>
                </div>
                
                <div className="flex space-x-2 mt-4">
                  {!address.is_default && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => openEditDialog(address)}
                  >
                    <Edit2 className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDelete(address.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingAddress ? "Edit Address" : "Add New Address"}</DialogTitle>
              <DialogDescription>
                {editingAddress ? "Update your address details." : "Enter the address information."}
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Name (e.g. Home, Work)</FormLabel>
                      <FormControl>
                        <Input placeholder="Home" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input placeholder="123 Main St" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Bhopal" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {US_STATES.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="zip_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <FormControl>
                        <Input placeholder="462004" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input value="India" disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="is_default"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Set as default address</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button 
                    type="submit" 
                    className="bg-boutique-taupe hover:bg-boutique-taupe/90"
                  >
                    {editingAddress ? "Update Address" : "Add Address"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </div>
  );
};

export default Addresses;
