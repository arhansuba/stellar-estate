'use client';

import React, { useState, useEffect } from 'react';
import { initKit, setPublicKey } from '../utils/stellar-wallets-kit';

const ConnectWallet: React.FC = () => {
  const [connectedKey, setConnectedKey] = useState<string | null>(null);
  const [kit, setKit] = useState<any>(null);

  useEffect(() => {
    initKit().then(setKit);
  }, []);

  const handleConnect = async () => {
    if (!kit) return;
    try {
      await kit.openModal({
        onWalletSelected: async (option: any) => {
          try {
            kit.setWallet(option.id);
            const { address } = await kit.getAddress();
            setPublicKey(address);
            setConnectedKey(address);
          } catch (e) {
            console.error(e);
          }
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="text-center">
      {connectedKey ? (
        <div className="truncate max-w-xs mx-auto">
          Signed in as {connectedKey}
        </div>
      ) : (
        <button
          onClick={handleConnect}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;