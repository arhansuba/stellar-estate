// context/PropertyContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProperties } from '@/services/propertyService';

interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  tokenSupply: number;
  availableTokens: number;
  imageUrl: string;
}

interface PropertyContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refreshProperties: () => Promise<void>;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

export const PropertyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedProperties = await fetchProperties();
      setProperties(fetchedProperties);
    } catch (err) {
      setError('Failed to fetch properties. Please try again later.');
      console.error('Error fetching properties:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProperties();
  }, []);

  return (
    <PropertyContext.Provider value={{ properties, loading, error, refreshProperties }}>
      {children}
    </PropertyContext.Provider>
  );
};