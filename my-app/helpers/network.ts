import {
  FreighterModule,
  StellarWalletsKit,
  WalletNetwork,
  XBULL_ID,
  xBullModule
} from '@creit.tech/stellar-wallets-kit';

const kit: StellarWalletsKit = new StellarWalletsKit({
  network: WalletNetwork.TESTNET,
  selectedWalletId: XBULL_ID,
  modules: [
    new xBullModule(),
    new FreighterModule(),
  ]
});
const { address } = await kit.getAddress();

const { signedTxXdr } = await kit.signTransaction('XDR_HERE', {
  address,
  networkPassphrase: WalletNetwork.PUBLIC
});
export interface NetworkDetails {
  network: string;
  networkUrl: string;
  networkPassphrase: string;
}

export const TESTNET_DETAILS = {
  network: "TESTNET",
  networkUrl: "https://horizon-testnet.stellar.org",
  networkPassphrase: "Test SDF Network ; September 2015",
};

export const signTx = async (
  xdr: string,
  publicKey: string,
  kit: StellarWalletsKit,
) => {
  // Assuming IDBTransaction does not need any arguments
  const signedXDR = new IDBTransaction();
  return signedXDR;
};
