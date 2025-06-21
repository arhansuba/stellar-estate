import React from 'react';
import { useProperty } from '../hooks/useProperty';
import { useMarketplace } from '../hooks/useMarketplace';
import { useShares } from '../hooks/useShares';
import { useEscrow } from '../hooks/useEscrow';
import { useIncrement } from '@/hooks/useIncrement';

interface PropertyDetailsProps {
  propertyId: string;
}

export const PropertyDetails: React.FC<PropertyDetailsProps> = ({ propertyId }) => {
  const { property, isLoading: propertyLoading } = useProperty(propertyId);
  const { buyProperty, isLoading: buyLoading } = useMarketplace();
  const { buyShares, isLoading: sharesLoading } = useShares();
  const { createEscrow, isLoading: escrowLoading } = useEscrow();
  const { increment, value, isLoading: incrementLoading } = useIncrement();

  if (propertyLoading) return <div>Loading property details...</div>;
  if (!property) return <div>Property not found.</div>; // Property is null or not loaded

  return (
    <div>
      <h2>{property.name}</h2>
      <p>Price: {property.price}</p>
      <button onClick={() => buyProperty(propertyId)} disabled={buyLoading}>
        {buyLoading ? 'Buying...' : 'Buy Property'}
      </button>
      <button onClick={() => buyShares(propertyId, '10')} disabled={sharesLoading}>
        {sharesLoading ? 'Buying Shares...' : 'Buy 10 Shares'}
      </button>
      <button onClick={() => createEscrow(property.owner, property.buyer, property.price.toString())} disabled={escrowLoading}>
        {escrowLoading ? 'Creating Escrow...' : 'Create Escrow'}
      </button>
      <div>
        Increment value: {value}
        <button onClick={increment} disabled={incrementLoading}>
          {incrementLoading ? 'Incrementing...' : 'Increment'}
        </button>
      </div>
    </div>
  );
};
