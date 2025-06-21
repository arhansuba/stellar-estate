"use client"; 
import React, { useState, useEffect } from 'react';
import { initKit, loadedPublicKey } from '../../utils/stellar-wallets-kit'; // Cüzdan yönetimi için
import CreateProperty from '../../components/CreateProperty'; // CreateProperty componenti import
import ConnectWallet from '@/components/WalletConnect';
import propertyContract from '../../lib/contracts/property';

export default function PropertiesPage() {
  const [kit, setKit] = useState<any>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const getProperty = async (): Promise<any> => {
    const publicKey = loadedPublicKey();
    if (!publicKey || !kit) {
      setError("Please connect your wallet first");
      return;
    }
    try {
      const contract = propertyContract;
      const result = await contract.list_property_for_sale({ id: "blabla" });
      console.log("Property:", result);
    } catch (error) {
      console.error('Error fetching property:', error);
      setError('Failed to fetch property');
    }
  }
  // Wallet kitini başlatmak için useEffect kullanıyoruz
  useEffect(() => {
    initKit().then(setKit).catch(err => {
      console.error("Error initializing kit:", err);
      setError("Failed to initialize wallet kit");
    });
  }, []);

  // Cüzdan bağlantısını kontrol et
  useEffect(() => {
    const publicKey = loadedPublicKey();
    setIsWalletConnected(!!publicKey); // Cüzdan bağlı mı diye kontrol et
  }, [kit]);

  // Eğer cüzdan bağlı değilse kullanıcıya cüzdan bağlaması için mesaj göster
  if (!isWalletConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ConnectWallet /> 
      </div>
    );
  }

  // Cüzdan bağlıysa property oluşturma formunu göster
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create a New  Property</h1>
      <CreateProperty kit={kit} /> {/* Property oluşturma formu */}
      <button onClick={getProperty}>Get Property</button>
    </div>
  );
}
