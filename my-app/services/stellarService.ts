import { Networks, Asset, Keypair, Operation, TransactionBuilder, BASE_FEE } from 'stellar-sdk'; // Adjusted import statement
//import  Server  from 'stellar-sdk';

// Initialize Stellar SDK
//export const server =  Server('https://horizon-testnet.stellar.org');
import { StrKey,  Horizon } from '@stellar/stellar-sdk'

const horizonUrl = 'https://horizon-testnet.stellar.org'
const server = new Horizon.Server(horizonUrl)
const networkPassphrase = Networks.TESTNET;

export async function createAccount(): Promise<{ publicKey: string; secretKey: string }> {
  const pair = Keypair.random();
  const publicKey = pair.publicKey();
  const secretKey = pair.secret();

  try {
    // Fund the account using Friendbot (only works on testnet)
    await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`);
    return { publicKey, secretKey };
  } catch (error) {
    console.error('Error creating and funding account:', error);
    throw error;
  }
}

export async function getAccountBalance(publicKey: string): Promise<{ [assetCode: string]: string }> {
  try {
    const account = await server.loadAccount(publicKey);
    const balances: { [assetCode: string]: string } = {};

    account.balances.forEach((balance: any) => {
      const assetCode = balance.asset_type === 'native' ? 'XLM' : balance.asset_code;
      balances[assetCode] = balance.balance;
    });

    return balances;
  } catch (error) {
    console.error('Error fetching account balance:', error);
    throw error;
  }
}

export async function sendPayment(
  sourceKeypair: Keypair,
  destinationPublicKey: string,
  amount: string,
  asset: Asset = Asset.native()
): Promise<string> {
  try {
    const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());
    const transaction = new TransactionBuilder(sourceAccount, {
      fee: BASE_FEE,
      networkPassphrase,
    })
      .addOperation(
        Operation.payment({
          destination: destinationPublicKey,
          asset,
          amount,
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(sourceKeypair);
    const result = await server.submitTransaction(transaction);
    return result.hash;
  } catch (error) {
    console.error('Error sending payment:', error);
    throw error;
  }
}

export async function createTrustline(
  accountKeypair: Keypair,
  assetCode: string,
  issuerPublicKey: string
): Promise<string> {
  try {
    const asset = new Asset(assetCode, issuerPublicKey);
    const account = await server.loadAccount(accountKeypair.publicKey());
    const transaction = new TransactionBuilder(account, {
      fee: (await server.fetchBaseFee()).toString(),
      networkPassphrase,
    })
      .addOperation(
        Operation.changeTrust({
          asset,
          limit: '1000000', // Set an appropriate limit
        })
      )
      .setTimeout(30)
      .build();

    transaction.sign(accountKeypair);
    const result = await server.submitTransaction(transaction);
    return result.hash;
  } catch (error) {
    console.error('Error creating trustline:', error);
    throw error;
  }
}

export async function fetchInvestments(publicKey: string): Promise<any[]> {
    try {
      // Load the account to get assets and balances
      const account = await server.loadAccount(publicKey);
  
      // Fetch investment-related assets (modify the filter according to your needs)
      const investments: any[] = [];
  
      for (const balance of account.balances) {
        if (balance.asset_type !== 'native') {
          // Assuming non-native assets represent investments
          investments.push({
            assetCode: 'asset_code' in balance ? balance.asset_code : 'LiquidityPool',
            issuer: 'asset_issuer' in balance ? balance.asset_issuer : 'LiquidityPool',
            balance: balance.balance,
          });
        }
      }
  
      return investments;
    } catch (error) {
      console.error('Error fetching investments:', error);
      throw error;
    }
}
