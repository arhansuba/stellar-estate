import React from 'react';
import { Button } from './ui/button'; // Assuming you have a reusable button component
import Image from 'next/image'; // If you're using Next.js for image optimization

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/hero-background.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Invest in Tokenized Real Estate with Stellar
        </h1>
        <p className="text-lg md:text-xl text-white mb-8">
          Own a share of properties globally with secure and transparent investments.
        </p>
        <Button className="text-white bg-blue-600 hover:bg-blue-500 px-6 py-3 text-lg">
          Explore Properties
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
