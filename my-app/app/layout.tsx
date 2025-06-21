// app/layout.tsx

import React from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Stellar Real Estate',
  description: 'Tokenized real estate investments on the Stellar blockchain',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
      </body>
    </html>
  );
}