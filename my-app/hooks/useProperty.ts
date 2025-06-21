import { useState, useEffect } from 'react';
import { getPropertyContract } from '../lib/contracts/property/propertyClient'; // Ensure this path is correct

// Define the Property type with necessary fields
export interface Property {
  name: string;
  price: number;
  owner: string;
  buyer: string;
}

// Define the contract interface
export interface PropertyContract {
  getProperty(args: { id: string }): Promise<Property>;
  // Add other methods if necessary
}

export const useProperty = (propertyId: string) => {
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const contract = getPropertyContract() as unknown as PropertyContract; // Cast to the interface
        const result = await contract.getProperty({ id: propertyId });
        setProperty(result);
      } catch (error) {
        console.error('Failed to fetch property:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [propertyId]);

  return { property, isLoading };
};
