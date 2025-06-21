'use client';

import React, { useState } from 'react';
import propertyContract from '../lib/contracts/property'; // Contract import
import { initKit, loadedPublicKey } from '../utils/stellar-wallets-kit'; // Wallet ve kit yönetimi

interface CreatePropertyProps {
  kit: any; // Prop olarak kit'i alıyoruz
}

const CreateProperty: React.FC<CreatePropertyProps> = ({ kit }) => {
  const [id, setId] = useState('');
  const [owner, setOwner] = useState('');
  const [price, setPrice] = useState<number | null>(null);
  const [asset, setAsset] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateProperty = async () => {
    const publicKey = loadedPublicKey();

    if (!publicKey || !kit) {
      setError("Please connect your wallet first");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const tx = await propertyContract.create_property({ id, owner, price: BigInt(price ?? 0), asset });
      const { signedXDR } = await kit.signTransaction(tx.toXDR());
      
      console.log("Transaction signed:", signedXDR);
      // Burada işlem gönderme kodu olacak
    } catch (error) {
      console.error('Error creating property:', error);
      setError('Failed to create property');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Property ID</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Owner Address</label>
        <input
          type="text"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          value={price ?? ''}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Asset Address</label>
        <input
          type="text"
          value={asset}
          onChange={(e) => setAsset(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleCreateProperty}
        disabled={isLoading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {isLoading ? 'Creating...' : 'Create Property'}
      </button>
    </div>
  );
};

export default CreateProperty;
