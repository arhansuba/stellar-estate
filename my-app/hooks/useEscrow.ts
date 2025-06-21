import { useState } from 'react';
//import { getEscrowContract } from '../lib/contracts/escrowClient';
import { useWallet } from './useWallet';
import { getEscrowContract } from '@/lib/contracts/escrow/escrowClient';

export const useEscrow = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { publicKey, signTransaction } = useWallet();

  const createEscrow = async (seller: string, buyer: string, amount: string) => {
    if (!publicKey) throw new Error('Wallet not connected');

    setIsLoading(true);
    try {
      const contract = getEscrowContract();
      const transaction = await contract.createEscrow({ seller, buyer, amount });
      const signedTransaction = await signTransaction(transaction);
      const result = await contract.submitTransaction(signedTransaction);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const releaseEscrow = async (escrowId: string) => {
    if (!publicKey) throw new Error('Wallet not connected');

    setIsLoading(true);
    try {
      const contract = getEscrowContract();
      const transaction = await contract.releaseEscrow({ escrowId });
      const signedTransaction = await signTransaction(transaction);
      const result = await contract.submitTransaction(signedTransaction);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return { createEscrow, releaseEscrow, isLoading };
};
