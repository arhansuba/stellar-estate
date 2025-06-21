// my-app/components/InvestButton.tsx
import { useInvestment } from '@/hooks/useInvestments';
import React from 'react';


interface InvestButtonProps {
  propertyId: string;
  amount: number;
}

export const InvestButton: React.FC<InvestButtonProps> = ({ propertyId, amount }) => {
  const { invest, isLoading } = useInvestment();

  const handleInvest = async () => {
    try {
      await invest(propertyId, amount.toString());
      alert('Investment successful!');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Investment failed: ${error.message}`);
      } else {
        alert('Investment failed: An unknown error occurred.');
      }
    }
  };

  return (
    <button onClick={handleInvest} disabled={isLoading}>
      {isLoading ? 'Investing...' : 'Invest'}
    </button>
  );
};