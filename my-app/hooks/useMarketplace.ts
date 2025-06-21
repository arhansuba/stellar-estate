import { useState } from 'react';
//import { getMarketplaceContract } from '../lib/contracts/marketplaceClient';
import { useWallet } from './useWallet';
import { getMarketplaceContract } from '@/lib/contracts/marketplace/marketplaceClient';

export const useMarketplace = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { publicKey, signTransaction } = useWallet();

  const listProperty = async (propertyId: string, price: string) => {
    if (!publicKey) throw new Error('Wallet not connected');

    setIsLoading(true);
    try {
      const contract = getMarketplaceContract();
      const transaction = await contract.listProperty({ propertyId, price });
      const signedTransaction = await signTransaction(transaction);
      const result = await contract.submitTransaction(signedTransaction);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const buyProperty = async (propertyId: string) => {
    if (!publicKey) throw new Error('Wallet not connected');

    setIsLoading(true);
    try {
      const contract = getMarketplaceContract();
      const transaction = await contract.buyProperty({ propertyId });
      const signedTransaction = await signTransaction(transaction);
      const result = await contract.submitTransaction(signedTransaction);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return { listProperty, buyProperty, isLoading };
};