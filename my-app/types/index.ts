import { ReactNode } from "react";

export interface SharesContract {
  buyShares(args: { propertyId: string; amount: string }): Promise<any>;
  submitTransaction(transaction: any): Promise<any>;
  getSharesBalance(args: { propertyId: string; address: string }): Promise<number>;
  // Add other methods if necessary
}


export interface Investment {
    id: string;
    propertyName: string;
    propertyAddress: string;
    investedAmount: number;
    currentValue: number;
    tokensOwned: number;
    returns: number;
  }


export interface WalletContextType {

  isConnected: boolean;

  address: string; 

}

export interface Property {
  [x: string]: ReactNode;
  id: string;
  name: string;
  location: string;
  price: number;
  imageUrl: string;
  tokenSupply: number;
  availableTokens: number;
  description: string;
}

export interface UserInvestment {
  id: string;
  propertyName: string;
  location: string;
  sharesOwned: number;
  currentValue: number;
  ownershipPercentage: number;
}

export interface Investment {
  id: string;
  propertyName: string;
  propertyAddress: string;
  investedAmount: number;
  currentValue: number;
  tokensOwned: number;
  returns: number;
}


