'use client';
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Home, Wallet, DollarSign, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for user's investments
const investments = [
  { id: 1, name: "Luxury Beachfront Villa", location: "Malibu, California", image: "/placeholder.svg?height=200&width=400", shares: 10, sharePrice: 100, totalValue: 1000, changePercent: 5.2, lastDividend: 20, nextDividendDate: "2023-12-15" },
  { id: 2, name: "Downtown Penthouse", location: "New York City, New York", image: "/placeholder.svg?height=200&width=400", shares: 5, sharePrice: 150, totalValue: 750, changePercent: -2.1, lastDividend: 15, nextDividendDate: "2023-12-20" },
  { id: 3, name: "Mountain Retreat Cabin", location: "Aspen, Colorado", image: "/placeholder.svg?height=200&width=400", shares: 8, sharePrice: 80, totalValue: 640, changePercent: 3.7, lastDividend: 12, nextDividendDate: "2023-12-18" },
]

// Mock data for portfolio performance chart
const portfolioData = [
  { month: 'Jan', value: 2000 },
  { month: 'Feb', value: 2200 },
  { month: 'Mar', value: 2100 },
  { month: 'Apr', value: 2400 },
  { month: 'May', value: 2300 },
  { month: 'Jun', value: 2600 },
]

interface Investment {
  id: number;
  name: string;
  location: string;
  image: string;
  shares: number;
  sharePrice: number;
  totalValue: number;
  changePercent: number;
  lastDividend: number;
  nextDividendDate: string;
}

function InvestmentCard({ investment }: { investment: Investment }) {
  return (
    <Card className="w-full">
      <CardHeader className="p-0">
        <img src={investment.image} alt={investment.name} className="w-full h-48 object-cover rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{investment.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">{investment.location}</p>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <p className="text-sm font-semibold">Shares Owned</p>
            <p className="text-lg">{investment.shares}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Share Price</p>
            <p className="text-lg">${investment.sharePrice}</p>
          </div>
        </div>
        <div className="mb-2">
          <p className="text-sm font-semibold">Total Value</p>
          <p className="text-lg">${investment.totalValue}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${investment.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {investment.changePercent >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            <span className="text-sm font-semibold">{Math.abs(investment.changePercent)}%</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold">Last Dividend</p>
            <p className="text-sm">${investment.lastDividend}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-muted">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="text-sm">Next Dividend: {investment.nextDividendDate}</span>
        </div>
        <Button size="sm">Manage</Button>
      </CardFooter>
    </Card>
  )
}

export default function MyInvestmentsPage() {
  const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.totalValue, 0)
  const totalShares = investments.reduce((sum, inv) => sum + inv.shares, 0)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* My Investments Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Investments</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Investment Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalInvestmentValue}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Home className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{investments.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalShares}</div>
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

        {/* Investment Details */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Investments</TabsTrigger>
            <TabsTrigger value="residential">Residential</TabsTrigger>
            <TabsTrigger value="commercial">Commercial</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investments.map(investment => (
                <InvestmentCard key={investment.id} investment={investment} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="residential">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investments.filter(inv => inv.name.includes("Villa") || inv.name.includes("Penthouse")).map(investment => (
                <InvestmentCard key={investment.id} investment={investment} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="commercial">
            <p className="text-center text-muted-foreground mt-8">You currently have no commercial property investments.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}