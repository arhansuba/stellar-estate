import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Home, Wallet, BarChart, DollarSign, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from 'next/link'

const properties = [
  { id: 1, name: "Luxury Beachfront Villa", location: "Malibu, California", image: "/placeholder.svg?height=200&width=400", sharePrice: 100, totalValue: 10000000, availableShares: 25 },
  { id: 2, name: "Downtown Penthouse", location: "New York City, New York", image: "/placeholder.svg?height=200&width=400", sharePrice: 150, totalValue: 15000000, availableShares: 15 },
  { id: 3, name: "Mountain Retreat Cabin", location: "Aspen, Colorado", image: "/placeholder.svg?height=200&width=400", sharePrice: 80, totalValue: 8000000, availableShares: 40 },
  { id: 4, name: "Tropical Island Bungalow", location: "Maui, Hawaii", image: "/placeholder.svg?height=200&width=400", sharePrice: 120, totalValue: 12000000, availableShares: 30 },
]

interface Property {
  id: number;
  name: string;
  location: string;
  image: string;
  sharePrice: number;
  totalValue: number;
  availableShares: number;
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="w-full transition-transform duration-300 hover:scale-105">
      <CardHeader className="p-0">
        <img src={property.image} alt={property.name} className="w-full h-48 object-cover rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2">{property.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-2">{property.location}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Share Price:</span>
          <span className="text-sm">${property.sharePrice}</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold">Total Value:</span>
          <span className="text-sm">${property.totalValue.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">Available Shares:</span>
          <span className="text-sm">{property.availableShares}%</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4">
        <Button variant="outline" size="sm">View Details</Button>
        <Button size="sm">Invest Now</Button>
      </CardFooter>
    </Card>
  )
}

export default function MainPage() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)

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

      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-blue-900 opacity-60"></div>
        <img src="/placeholder.svg?height=500&width=1200" alt="Luxury Real Estate" className="absolute inset-0 w-full h-full object-cover" />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold mb-4">Invest in Real Estate Shares Effortlessly</h1>
          <p className="text-xl mb-8">Buy fractional shares, earn rental income, and watch your investment grow</p>
          <Button size="lg" className="bg-gold-400 text-blue-900 hover:bg-gold-500">
            Explore Properties <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Property Listing Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties Carousel */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Top Investment Opportunities</h2>
          <Carousel className="w-full max-w-5xl mx-auto">
            <CarouselContent>
              {properties.map(property => (
                <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3">
                  <PropertyCard property={property} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Stellar Real Estate</h3>
              <p className="text-sm">Revolutionizing real estate investment through blockchain technology.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
                <li><Link href="/faq" className="hover:text-gold-400 transition-colors">FAQ</Link></li>
                <li><Link href="/terms" className="hover:text-gold-400 transition-colors">Terms & Conditions</Link></li>
                <li><Link href="/privacy" className="hover:text-gold-400 transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gold-400 transition-colors"><Facebook /></a>
                <a href="#" className="hover:text-gold-400 transition-colors"><Twitter /></a>
                <a href="#" className="hover:text-gold-400 transition-colors"><Instagram /></a>
                <a href="#" className="hover:text-gold-400 transition-colors"><Linkedin /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 text-center">
            <p className="text-sm">&copy; 2023 Stellar Real Estate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}