'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, DollarSign, ArrowUpRight, ArrowDownRight, Copy, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Mock data for wallet balance and transactions
const walletBalance = 5000
const walletAddress = "0x1234...5678"
const transactions = [
  { id: 1, type: "Deposit", amount: 1000, date: "2023-11-01", status: "Completed" },
  { id: 2, type: "Investment", amount: -500, date: "2023-11-05", status: "Completed" },
  { id: 3, type: "Dividend", amount: 50, date: "2023-11-10", status: "Completed" },
  { id: 4, type: "Withdrawal", amount: -200, date: "2023-11-15", status: "Pending" },
]

type Transaction = {
  id: number;
  type: string;
  amount: number;
  date: string;
  status: string;
};

function TransactionRow({ transaction }: { transaction: Transaction }) {
  const isPositive = transaction.amount > 0
  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex items-center">
        {isPositive ? (
          <ArrowUpRight className="w-4 h-4 mr-2 text-green-500" />
        ) : (
          <ArrowDownRight className="w-4 h-4 mr-2 text-red-500" />
        )}
        <div>
          <p className="font-medium">{transaction.type}</p>
          <p className="text-sm text-muted-foreground">{transaction.date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
          {isPositive ? '+' : '-'}${Math.abs(transaction.amount)}
        </p>
        <p className="text-sm text-muted-foreground">{transaction.status}</p>
      </div>
    </div>
  )
}

export function WalletPageComponent() {
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

      {/* Wallet Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wallet</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-2xl">Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold">${walletBalance.toLocaleString()}</div>
                <Wallet className="w-12 h-12 text-blue-500" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Wallet Address:</span>
                <span className="font-mono text-sm">{walletAddress}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm">
                View on Explorer <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Deposit Funds</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Deposit Funds</DialogTitle>
                    <DialogDescription>
                      Enter the amount you want to deposit into your wallet.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="amount" className="text-right">
                        Amount
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="Enter amount"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Confirm Deposit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">Withdraw Funds</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                    <DialogDescription>
                      Enter the amount you want to withdraw from your wallet.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="withdraw-amount" className="text-right">
                        Amount
                      </Label>
                      <Input
                        id="withdraw-amount"
                        type="number"
                        placeholder="Enter amount"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Confirm Withdrawal</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                {transactions.map(transaction => (
                  <TransactionRow key={transaction.id} transaction={transaction} />
                ))}
              </TabsContent>
              <TabsContent value="deposits">
                {transactions.filter(t => t.amount > 0).map(transaction => (
                  <TransactionRow key={transaction.id} transaction={transaction} />
                ))}
              </TabsContent>
              <TabsContent value="withdrawals">
                {transactions.filter(t => t.amount < 0).map(transaction => (
                  <TransactionRow key={transaction.id} transaction={transaction} />
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Transactions</Button>
          </CardFooter>
        </Card>
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