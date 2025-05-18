
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  is_default: boolean;
}

export const useAddresses = () => {
  const { user } = useAuth();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAddresses = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("addresses")
        .select("*")
        .order("is_default", { ascending: false });

      if (error) throw error;
      setAddresses(data || []);
    } catch (error: any) {
      toast.error("Failed to load addresses", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addAddress = async (address: Omit<Address, "id">) => {
    if (!user) return;

    try {
      // If this is the first address or setting as default
      if (address.is_default) {
        // Set all other addresses to not default
        await supabase
          .from("addresses")
          .update({ is_default: false })
          .eq("user_id", user.id);
      }

      const { error } = await supabase
        .from("addresses")
        .insert({ ...address, user_id: user.id });

      if (error) throw error;
      
      toast.success("Address added successfully");
      fetchAddresses();
    } catch (error: any) {
      toast.error("Failed to add address", {
        description: error.message
      });
    }
  };

  const updateAddress = async (id: string, address: Partial<Omit<Address, "id">>) => {
    if (!user) return;

    try {
      // If setting as default, update other addresses first
      if (address.is_default) {
        await supabase
          .from("addresses")
          .update({ is_default: false })
          .eq("user_id", user.id);
      }

      const { error } = await supabase
        .from("addresses")
        .update(address)
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Address updated successfully");
      fetchAddresses();
    } catch (error: any) {
      toast.error("Failed to update address", {
        description: error.message
      });
    }
  };

  const deleteAddress = async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("addresses")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Address deleted successfully");
      fetchAddresses();
    } catch (error: any) {
      toast.error("Failed to delete address", {
        description: error.message
      });
    }
  };

  const setDefaultAddress = async (id: string) => {
    if (!user) return;

    try {
      // Set all addresses to not default
      await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", user.id);
      
      // Set selected address as default
      const { error } = await supabase
        .from("addresses")
        .update({ is_default: true })
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Default address updated");
      fetchAddresses();
    } catch (error: any) {
      toast.error("Failed to update default address", {
        description: error.message
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchAddresses();
    } else {
      setAddresses([]);
      setIsLoading(false);
    }
  }, [user]);

  return {
    addresses,
    isLoading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    fetchAddresses,
  };
};
