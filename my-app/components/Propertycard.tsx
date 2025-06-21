"use client"; // Add this line to indicate that this is a client component

import { useState } from 'react';
import { Home, DollarSign, Users } from "lucide-react";
import { Progress } from '@radix-ui/react-progress';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './ui/card';
import React from 'react';

interface Property {
  id: string;
  name: string;
  description: string;
  price: string;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const [investedShares, setInvestedShares] = useState(3);
  const totalShares = 10;
  const sharePrice = 10000;
  const totalPrice = sharePrice * totalShares;

  const handleInvest = () => {
    if (investedShares < totalShares) {
      setInvestedShares(investedShares + 1);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="h-6 w-6" />
          {property.name}
        </CardTitle>
        <CardDescription>{property.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <img
          src="/placeholder.svg?height=200&width=400"
          alt={property.name}
          className="w-full h-48 object-cover rounded-md"
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-lg">{totalPrice.toLocaleString()} USDC</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            <span>{totalShares} Shareholders</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Investment Progress</span>
            <span>{investedShares} / {totalShares} Shares</span>
          </div>
          <Progress value={(investedShares / totalShares) * 100} className="h-2" />
        </div>
        <div className="bg-muted p-3 rounded-md">
          <h3 className="font-semibold mb-2">Investment Details</h3>
          <ul className="space-y-1 text-sm">
            <li>Share Price: {sharePrice.toLocaleString()} USDC</li>
            <li>Minimum Investment: 1 Share</li>
            <li>Expected Annual Return: 8-12%</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleInvest} 
          disabled={investedShares === totalShares} 
          className="w-full"
        >
          {investedShares === totalShares ? "Fully Invested" : "Invest 10,000 USDC"}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PropertyCard;