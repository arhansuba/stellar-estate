import React from 'react';
import { useShares } from '../hooks/useShares';

interface BuySharesButtonProps {
  propertyId: string;
  amount: string;
}

export const BuySharesButton: React.FC<BuySharesButtonProps> = ({ propertyId, amount }) => {
  const { buyShares, isLoading } = useShares();

  const handleBuyShares = async () => {
    try {
      await buyShares(propertyId, amount.toString());
      alert('Shares purchased successfully!');
    } catch (error) {
      alert(`Failed to purchase shares: ${(error as Error).message}`);
    }
  };

  return (
    <button onClick={handleBuyShares} disabled={isLoading}>
      {isLoading ? 'Purchasing...' : 'Buy Shares'}
    </button>
  );
};