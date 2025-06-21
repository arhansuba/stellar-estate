import React from 'react';
import { useEscrow } from '../hooks/useEscrow';

interface CreateEscrowButtonProps {
  seller: string;
  buyer: string;
  amount: number;
}

export const CreateEscrowButton: React.FC<CreateEscrowButtonProps> = ({ seller, buyer, amount }) => {
  const { createEscrow, isLoading } = useEscrow();

  const handleCreateEscrow = async () => {
    try {
      await createEscrow(seller, buyer, amount.toString());
      alert('Escrow created successfully!');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Failed to create escrow: ${error.message}`);
      } else {
        alert('Failed to create escrow: Unknown error');
      }
    }
  };

  return (
    <button onClick={handleCreateEscrow} disabled={isLoading}>
      {isLoading ? 'Creating Escrow...' : 'Create Escrow'}
    </button>
  );
};