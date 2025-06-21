import { useState } from 'react';
import {Transaction, Keypair, Networks, TransactionBuilder, Memo } from 'stellar-sdk';
import Server from 'stellar-sdk'; 

const server = new Server('https://horizon-testnet.stellar.org');

export function useTransaction() {
  const [transactionStatus, setTransactionStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [transactionError, setTransactionError] = useState<string | null>(null);

  const submitTransaction = async (
    transaction: Transaction,
    signerKeypair: Keypair
  ) => {
    setTransactionStatus('pending');
    setTransactionError(null);

    try {
      transaction.sign(signerKeypair);
      const transactionResult = await server.submitTransaction(transaction);
      setTransactionStatus('success');
      return transactionResult;
    } catch (error) {
      setTransactionStatus('error');
      setTransactionError('Transaction failed. Please try again.');
      console.error('Transaction submission error:', error);
      throw error;
    }
  };

  const buildTransaction = async (
    sourcePublicKey: string,
    operations: any[],
    memo?: string
  ) => {
    try {
      const account = await server.loadAccount(sourcePublicKey);
      const fee = await server.fetchBaseFee();
      const transactionBuilder = new TransactionBuilder(account, {
        fee,
        networkPassphrase: Networks.TESTNET,
      });

      operations.forEach(operation => {
        transactionBuilder.addOperation(operation);
      });

      if (memo) {
        transactionBuilder.addMemo(Memo.text(memo));
      }

      const transaction = transactionBuilder.setTimeout(30).build();

      return transaction;
    } catch (error) {
      console.error('Error building transaction:', error);
      throw error;
    }
  };

  return {
    submitTransaction,
    buildTransaction,
    transactionStatus,
    transactionError,
  };
}