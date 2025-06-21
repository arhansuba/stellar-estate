import { useState } from 'react';
//import { getMarketplaceContract } from '../lib/contracts/marketplaceClient';
import { useWallet } from './useWallet';
import { getMarketplaceContract } from '@/lib/contracts/marketplace/marketplaceClient';

export const useInvestment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { publicKey, signTransaction } = useWallet();

  const invest = async (propertyId: string, amount: string) => {
    if (!publicKey) throw new Error('Wallet not connected');

    setIsLoading(true);
    try {
      const contract = getMarketplaceContract();
      const transaction = await contract.invest({ propertyId, amount });
      const signedTransaction = await signTransaction(transaction);
      const result = await contract.submitTransaction(signedTransaction);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return { invest, isLoading };
};
