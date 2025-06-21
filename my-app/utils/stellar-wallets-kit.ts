import {
    StellarWalletsKit,
    WalletNetwork,
  } from "@creit.tech/stellar-wallets-kit";
  
  export let kit: StellarWalletsKit;
  
  const connectionState: { publicKey: string | undefined } = {
    publicKey: undefined,
  };
  
  export async function initKit() {
    if (typeof window !== 'undefined' && !kit) {
      const { allowAllModules, FREIGHTER_ID } = await import("@creit.tech/stellar-wallets-kit");
      kit = new StellarWalletsKit({
        modules: allowAllModules(),
        network: WalletNetwork.TESTNET,
        selectedWalletId: FREIGHTER_ID,
      });
    }
    return kit;
  }
  
  export function loadedPublicKey(): string | undefined {
    return connectionState.publicKey;
  }
  
  export function setPublicKey(data: string): void {
    connectionState.publicKey = data;
    console.log("Public Key Set:", data);
  }