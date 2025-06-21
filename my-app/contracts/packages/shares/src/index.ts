import { Buffer } from "buffer";
import { Address } from '@stellar/stellar-sdk';
import {
  AssembledTransaction,
  Client as ContractClient,
  ClientOptions as ContractClientOptions,
  Result,
  Spec as ContractSpec,
} from '@stellar/stellar-sdk/contract';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk'
export * as contract from '@stellar/stellar-sdk/contract'
export * as rpc from '@stellar/stellar-sdk/rpc'

if (typeof window !== 'undefined') {
  //@ts-ignore Buffer exists
  window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CA2NYIP3WXHW3UGDQMLXEMMJAO7GXDLFGOWICLLU6DOGU64NFBF7FEHX",
  }
} as const


export interface ShareBasket {
  basket_id: u64;
  property_ids: Array<u64>;
  total_shares: u64;
}


export interface PropertyShares {
  available_shares: u64;
  shareholders: Map<string, u64>;
  total_shares: u64;
}

export const Errors = {
  1: {message:"InsufficientShares"},

  2: {message:"InvalidRecipient"},

  3: {message:"NotEnoughSharesToTransfer"},

  4: {message:"InvalidOwnerAddress"},

  5: {message:"BasketNotFound"},

  6: {message:"PropertyNotFound"}
}

export interface Client {
  /**
   * Construct and simulate a create_basket transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_basket: ({property_ids, total_shares}: {property_ids: Array<u64>, total_shares: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<u64>>>

  /**
   * Construct and simulate a issue_shares transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  issue_shares: ({basket_id, to, amount}: {basket_id: u64, to: string, amount: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_basket_details transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_basket_details: ({basket_id}: {basket_id: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<ShareBasket>>>

  /**
   * Construct and simulate a transfer_shares transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  transfer_shares: ({from, to, amount}: {from: string, to: string, amount: u64}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a get_shares transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_shares: ({address}: {address: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u64>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAAC1NoYXJlQmFza2V0AAAAAAMAAAAAAAAACWJhc2tldF9pZAAAAAAAAAYAAAAAAAAADHByb3BlcnR5X2lkcwAAA+oAAAAGAAAAAAAAAAx0b3RhbF9zaGFyZXMAAAAG",
        "AAAAAQAAAAAAAAAAAAAADlByb3BlcnR5U2hhcmVzAAAAAAADAAAAAAAAABBhdmFpbGFibGVfc2hhcmVzAAAABgAAAAAAAAAMc2hhcmVob2xkZXJzAAAD7AAAABMAAAAGAAAAAAAAAAx0b3RhbF9zaGFyZXMAAAAG",
        "AAAABAAAAAAAAAAAAAAAC1NoYXJlc0Vycm9yAAAAAAYAAAAAAAAAEkluc3VmZmljaWVudFNoYXJlcwAAAAAAAQAAAAAAAAAQSW52YWxpZFJlY2lwaWVudAAAAAIAAAAAAAAAGU5vdEVub3VnaFNoYXJlc1RvVHJhbnNmZXIAAAAAAAADAAAAAAAAABNJbnZhbGlkT3duZXJBZGRyZXNzAAAAAAQAAAAAAAAADkJhc2tldE5vdEZvdW5kAAAAAAAFAAAAAAAAABBQcm9wZXJ0eU5vdEZvdW5kAAAABg==",
        "AAAAAAAAAAAAAAANY3JlYXRlX2Jhc2tldAAAAAAAAAIAAAAAAAAADHByb3BlcnR5X2lkcwAAA+oAAAAGAAAAAAAAAAx0b3RhbF9zaGFyZXMAAAAGAAAAAQAAA+kAAAAGAAAH0AAAAAtTaGFyZXNFcnJvcgA=",
        "AAAAAAAAAAAAAAAMaXNzdWVfc2hhcmVzAAAAAwAAAAAAAAAJYmFza2V0X2lkAAAAAAAABgAAAAAAAAACdG8AAAAAABMAAAAAAAAABmFtb3VudAAAAAAABgAAAAEAAAPpAAAD7QAAAAAAAAfQAAAAC1NoYXJlc0Vycm9yAA==",
        "AAAAAAAAAAAAAAASZ2V0X2Jhc2tldF9kZXRhaWxzAAAAAAABAAAAAAAAAAliYXNrZXRfaWQAAAAAAAAGAAAAAQAAA+kAAAfQAAAAC1NoYXJlQmFza2V0AAAAB9AAAAALU2hhcmVzRXJyb3IA",
        "AAAAAAAAAAAAAAAPdHJhbnNmZXJfc2hhcmVzAAAAAAMAAAAAAAAABGZyb20AAAATAAAAAAAAAAJ0bwAAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAAGAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAALU2hhcmVzRXJyb3IA",
        "AAAAAAAAAAAAAAAKZ2V0X3NoYXJlcwAAAAAAAQAAAAAAAAAHYWRkcmVzcwAAAAATAAAAAQAAAAY=" ]),
      options
    )
  }
  public readonly fromJSON = {
    create_basket: this.txFromJSON<Result<u64>>,
        issue_shares: this.txFromJSON<Result<void>>,
        get_basket_details: this.txFromJSON<Result<ShareBasket>>,
        transfer_shares: this.txFromJSON<Result<void>>,
        get_shares: this.txFromJSON<u64>
  }
}