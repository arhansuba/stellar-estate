// components/Navbar.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import ConnectWallet from '../components/WalletConnect';
const Navbar: React.FC = () => {


  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          EstateChain
        </Link>

        <div className="flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/properties" className="text-gray-300 hover:text-white">
            Properties
          </Link>
          <Link href="/investments" className="text-gray-300 hover:text-white">
            Investments
          </Link>
          <Link href="/dashboard" className="text-gray-300 hover:text-white">
            Dashboard
          </Link>
          <ConnectWallet />
        </div>

        
      </div>
    </nav>
  );
};

export default Navbar;