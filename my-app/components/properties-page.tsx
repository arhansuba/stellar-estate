'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Home, Wallet, Search, MapPin, DollarSign, Users, TrendingUp } from "lucide-react"

// Mock data for available properties
const properties = [
  { id: 1, name: "Luxury Beachfront Villa", location: "Malibu, California", image: "/placeholder.svg?height=200&width=400", sharePrice: 100, totalValue: 10000000, availableShares: 25, type: "Residential", roi: 8.5 },
  { id: 2, name: "Downtown Penthouse", location: "New York City, New York", image: "/placeholder.svg?height=200&width=400", sharePrice: 150, totalValue: 15000000, availableShares: 15, type: "Residential", roi: 7.2 },
  { id: 3, name: "Mountain Retreat Cabin", location: "Aspen, Colorado", image: "/placeholder.svg?height=200&width=400", sharePrice: 80, totalValue: 8000000, availableShares: 40, type: "Vacation", roi: 9.1 },
  { id: 4, name: "Tropical Island Bungalow", location: "Maui, Hawaii", image: "/placeholder.svg?height=200&width=400", sharePrice: 120, totalValue: 12000000, availableShares: 30, type: "Vacation", roi: 8.8 },
  { id: 5, name: "Modern Office Complex", location: "San Francisco, California", image: "/placeholder.svg?height=200&width=400", sharePrice: 200, totalValue: 20000000, availableShares: 20, type: "Commercial", roi: 6.5 },
  { id: 6, name: "Historic Townhouse", location: "Boston, Massachusetts", image: "/placeholder.svg?height=200&width=400", sharePrice: 90, totalValue: 9000000, availableShares: 35, type: "Residential", roi: 7.8 },
]

type Property = {
  id: number;
  name: string;
  location: string;
  image: string;
  sharePrice: number;
  totalValue: number;
  availableShares: number;
  type: string;
  roi: number;
};

function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="w-full transition-transform duration-300 hover:scale-105">
      <CardHeader className="p-0">
        <img src={property.image} alt={property.name} className="w-full h-48 object-cover rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{property.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2 flex items-center">
          <MapPin className="w-4 h-4 mr-1" /> {property.location}
        </p>
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div className="flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            <span className="text-sm font-semibold">${property.sharePrice}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm">{property.availableShares}% Available</span>
          </div>
        </div>
        <div className="flex items-center mb-2">
          <Home className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.type}</span>
        </div>
        <div className="flex items-center">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.roi}% Est. ROI</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" size="sm">View Details</Button>
        <Button size="sm">Invest Now</Button>
      </CardFooter>
    </Card>
  )
}

export function PropertiesPageComponent() {
  const [isWalletConnected, setIsWalletConnected] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [propertyType, setPropertyType] = useState("All")
  const [priceRange, setPriceRange] = useState([0, 200])

  const handleConnectWallet = () => {
    // Implement wallet connection logic here
    setIsWalletConnected(true)
  }

  const filteredProperties = properties.filter(property => 
    property.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (propertyType === "All" || property.type === propertyType) &&
    property.sharePrice >= priceRange[0] && property.sharePrice <= priceRange[1]
  )

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

      {/* Properties Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Properties</h1>

        {/* Filters */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
          </div>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger>
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Types</SelectItem>
              <SelectItem value="Residential">Residential</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Vacation">Vacation</SelectItem>
            </SelectContent>
          </Select>
          <div className="col-span-2">
            <label className="text-sm font-medium mb-1 block">Price Range (per share)</label>
            <Slider
              min={0}
              max={200}
              step={10}
              value={priceRange}
              onValueChange={setPriceRange}
              className="mt-2"
            />
            <div className="flex justify-between mt-1 text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <p className="text-center text-muted-foreground mt-8">No properties found matching your criteria.</p>
        )}
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