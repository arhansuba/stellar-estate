"use client";

import React from 'react';
import { useWallet } from '../context/WalletContext';
import { usePropertyData } from '../hooks/usePropertyData';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Loader2 } from 'lucide-react';

interface Property {
  id: number;
  propertyName: string;
  location: string;
  sharesOwned: number;
  currentValue: number;
  ownershipPercentage: number;
}

const Dashboard: React.FC = () => {
  const { isConnected } = useWallet();
  const { properties, loading, error } = usePropertyData();

  if (!isConnected) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p>Please connect your wallet to view your dashboard.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p>Loading your investment data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  const totalInvestmentValue = (properties as unknown as Property[]).reduce(
    (total, property) => total + property.currentValue,
    0
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <Card>
        <CardHeader>
          <CardTitle>Investment Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">${totalInvestmentValue.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total Investment Value</p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mt-6 mb-4">Your Investments</h2>

      {properties.length === 0 ? (
        <p>You haven't made any investments yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(properties as unknown as Property[]).map((property) => (
            <Card key={property.id}>
              <CardHeader>
                <CardTitle>{property.propertyName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-2">{property.location}</p>
                <p className="font-semibold mb-1">Shares Owned: {property.sharesOwned}</p>
                <p className="font-semibold mb-2">Value: ${property.currentValue.toLocaleString()}</p>
                <div className="mb-2">
                  <p className="text-sm mb-1">Ownership</p>
                  <Progress value={property.ownershipPercentage} className="h-2" />
                  <p className="text-xs text-right">{property.ownershipPercentage.toFixed(2)}%</p>
                </div>
                <Button className="w-full mt-2">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;