"use client";   
import React, { useState, useEffect } from 'react';
import { initKit, loadedPublicKey } from '../utils/stellar-wallets-kit';
import { Contract } from 'stellar-sdk';
import increment from '../lib/contracts/increment';

const Increment: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [kit, setKit] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    initKit().then(setKit).catch(err => {
      console.error("Error initializing kit:", err);
      setError("Failed to initialize wallet kit");
    });
  }, []);

  useEffect(() => {
    const publicKey = loadedPublicKey();
    console.log("Loaded Public Key:", publicKey);
  }, []);

  const handleIncrement = async () => {
    const publicKey = loadedPublicKey();
    console.log("Attempting to increment. Public Key:", publicKey);

    if (!publicKey || !kit) {
      setError("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
        const tx = await increment.increment({
            
          })
      
      console.log("Signing transaction");
      const { signedXDR } = await kit.signTransaction(tx.toXDR());
      
      console.log("Signed transaction XDR:", signedXDR);
      
      // Here you would typically submit the signed transaction to the network
      // For this example, we'll just simulate a successful increment
      setCurrentValue(prev => {
        const newValue = prev === null ? 1 : prev + 1;
        console.log("Updated value:", newValue);
        return newValue;
      });
    } catch (error) {
      console.error('Error incrementing:', error);
      if (error instanceof Error) {
        setError(`Failed to increment: ${error.message}`);
      } else {
        setError('Failed to increment: Unknown error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <strong>Incrementor</strong><br />
      Current value: <strong>{currentValue ?? '???'}</strong><br />
      <br />
      <button
        onClick={handleIncrement}
        disabled={isLoading || !loadedPublicKey()}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
      >
        {isLoading ? 'Incrementing...' : (loadedPublicKey() ? 'Increment' : 'Connect Wallet First')}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default Increment;