import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <Link href="/properties" className="hover:text-white">
            Properties
          </Link>
          <Link href="/investments" className="hover:text-white">
            Investments
          </Link>
          <Link href="/dashboard" className="hover:text-white">
            Dashboard
          </Link>
        </div>
        <p className="text-sm">© {new Date().getFullYear()} Stellar Estate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
