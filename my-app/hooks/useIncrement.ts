import { useState } from 'react';
//import { getIncrementContract } from '../lib/contracts/incrementClient';
import { useWallet } from './useWallet';
import { getIncrementContract } from '@/lib/contracts/increment/incrementClient';

export const useIncrement = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState(0);
  const { publicKey, signTransaction } = useWallet();

  const increment = async () => {
    if (!publicKey) throw new Error('Wallet not connected');

    setIsLoading(true);
    try {
      const contract = getIncrementContract();
      const transaction = await contract.increment({});
      const signedTransaction = await signTransaction(transaction);
      const result = await contract.submitTransaction(signedTransaction);
      setValue(result);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  const getValue = async () => {
    const contract = getIncrementContract();
    const result = await contract.getValue({});
    setValue(result);
    return result;
  };

  return { increment, getValue, value, isLoading };
};