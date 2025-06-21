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
    contractId: "CBW3HAGIKRUFGINW5JCAGFL53VKMDACLEZNGX7CRM4U7TPHFV5TV4FKY",
  }
} as const


export interface Property {
  asset: string;
  available_shares: u32;
  is_listed: boolean;
  owner: string;
  price: i128;
  total_shares: u32;
}

export const Errors = {
  1: {message:"PropertyNotFound"},

  2: {message:"NotAuthorized"},

  3: {message:"InsufficientShares"},

  4: {message:"PropertyNotListed"},

  5: {message:"SharesStillAvailable"}
}

export interface Client {
  /**
   * Construct and simulate a list_property transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  list_property: ({owner, price, total_shares, asset}: {owner: string, price: i128, total_shares: u32, asset: string}, options?: {
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
   * Construct and simulate a purchase_shares transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  purchase_shares: ({property_id, buyer, shares_to_buy}: {property_id: u64, buyer: string, shares_to_buy: u32}, options?: {
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
   * Construct and simulate a finalize_sale transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  finalize_sale: ({property_id}: {property_id: u64}, options?: {
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

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAACFByb3BlcnR5AAAABgAAAAAAAAAFYXNzZXQAAAAAAAATAAAAAAAAABBhdmFpbGFibGVfc2hhcmVzAAAABAAAAAAAAAAJaXNfbGlzdGVkAAAAAAAAAQAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAVwcmljZQAAAAAAAAsAAAAAAAAADHRvdGFsX3NoYXJlcwAAAAQ=",
        "AAAABAAAAAAAAAAAAAAAEE1hcmtldHBsYWNlRXJyb3IAAAAFAAAAAAAAABBQcm9wZXJ0eU5vdEZvdW5kAAAAAQAAAAAAAAANTm90QXV0aG9yaXplZAAAAAAAAAIAAAAAAAAAEkluc3VmZmljaWVudFNoYXJlcwAAAAAAAwAAAAAAAAARUHJvcGVydHlOb3RMaXN0ZWQAAAAAAAAEAAAAAAAAABRTaGFyZXNTdGlsbEF2YWlsYWJsZQAAAAU=",
        "AAAAAAAAAAAAAAANbGlzdF9wcm9wZXJ0eQAAAAAAAAQAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAAFcHJpY2UAAAAAAAALAAAAAAAAAAx0b3RhbF9zaGFyZXMAAAAEAAAAAAAAAAVhc3NldAAAAAAAABMAAAABAAAD6QAAAAYAAAfQAAAAEE1hcmtldHBsYWNlRXJyb3I=",
        "AAAAAAAAAAAAAAAPcHVyY2hhc2Vfc2hhcmVzAAAAAAMAAAAAAAAAC3Byb3BlcnR5X2lkAAAAAAYAAAAAAAAABWJ1eWVyAAAAAAAAEwAAAAAAAAANc2hhcmVzX3RvX2J1eQAAAAAAAAQAAAABAAAD6QAAA+0AAAAAAAAH0AAAABBNYXJrZXRwbGFjZUVycm9y",
        "AAAAAAAAAAAAAAANZmluYWxpemVfc2FsZQAAAAAAAAEAAAAAAAAAC3Byb3BlcnR5X2lkAAAAAAYAAAABAAAD6QAAA+0AAAAAAAAH0AAAABBNYXJrZXRwbGFjZUVycm9y" ]),
      options
    )
  }
  public readonly fromJSON = {
    list_property: this.txFromJSON<Result<u64>>,
        purchase_shares: this.txFromJSON<Result<void>>,
        finalize_sale: this.txFromJSON<Result<void>>
  }
}