'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Wallet, BarChart, DollarSign, TrendingUp, Building, Users, AlertCircle } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for the portfolio performance chart
const portfolioData = [
  { month: 'Jan', value: 1000 },
  { month: 'Feb', value: 1200 },
  { month: 'Mar', value: 1100 },
  { month: 'Apr', value: 1400 },
  { month: 'May', value: 1300 },
  { month: 'Jun', value: 1600 },
]

// Mock data for user's investments
const investments = [
  { id: 1, name: "Luxury Beachfront Villa", location: "Malibu, California", shares: 10, value: 1000 },
  { id: 2, name: "Downtown Penthouse", location: "New York City, New York", shares: 5, value: 750 },
  { id: 3, name: "Mountain Retreat Cabin", location: "Aspen, Colorado", shares: 8, value: 640 },
]

// Mock data for available properties
const availableProperties = [
  { id: 4, name: "Tropical Island Bungalow", location: "Maui, Hawaii", sharePrice: 120, availableShares: 30 },
  { id: 5, name: "Ski Resort Chalet", location: "Whistler, Canada", sharePrice: 100, availableShares: 20 },
  { id: 6, name: "Historic Townhouse", location: "London, UK", sharePrice: 200, availableShares: 10 },
]

export function DashboardPageComponent() {
  const [isWalletConnected, setIsWalletConnected] = useState(true)

  const handleConnectWallet = () => {
    // Implement wallet connection logic here
    setIsWalletConnected(true)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Stellar Real Estate</Link>
          <div className="flex items-center space-x-6">
            <Link href="/dashboard" className="hover:text-gold-400 transition-colors">Dashboard</Link>
            <Link href="/properties" className="hover:text-gold-400 transition-colors">Properties</Link>
            <Link href="/investments" className="hover:text-gold-400 transition-colors">My Investments</Link>
            <Link href="/wallet" className="hover:text-gold-400 transition-colors">Wallet</Link>
            <Button 
              onClick={handleConnectWallet} 
              variant={isWalletConnected ? "outline" : "default"}
              className={isWalletConnected ? "bg-green-500 text-white" : "bg-gold-400 text-blue-900 hover:bg-gold-500"}
            >
              {isWalletConnected ? "Wallet Connected" : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$2,390</div>
              <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Across 3 locations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">In 3 properties</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Performance Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                value: {
                  label: "Portfolio Value",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="var(--color-value)" name="Portfolio Value" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Investments and Available Properties Tabs */}
        <Tabs defaultValue="investments" className="space-y-4">
          <TabsList>
            <TabsTrigger value="investments">My Investments</TabsTrigger>
            <TabsTrigger value="available">Available Properties</TabsTrigger>
          </TabsList>
          <TabsContent value="investments">
            <Card>
              <CardHeader>
                <CardTitle>My Investments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {investments.map((investment) => (
                    <div key={investment.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h3 className="font-semibold">{investment.name}</h3>
                        <p className="text-sm text-muted-foreground">{investment.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{investment.shares} Shares</p>
                        <p className="text-sm text-muted-foreground">${investment.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="available">
            <Card>
              <CardHeader>
                <CardTitle>Available Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableProperties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h3 className="font-semibold">{property.name}</h3>
                        <p className="text-sm text-muted-foreground">{property.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${property.sharePrice} / Share</p>
                        <p className="text-sm text-muted-foreground">{property.availableShares}% Available</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2023 Stellar Real Estate. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}