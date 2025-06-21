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
    contractId: "CCDJXQS3DFU2VBFAXMXILXFEQZL5NMHPW3N34F2KAGZQBKBKYLPKTLTF",
  }
} as const

export type EscrowState = {tag: "Pending", values: void} | {tag: "Completed", values: void} | {tag: "Disputed", values: void} | {tag: "Refunded", values: void};

export type OptionalString = readonly [Option<string>];

export interface EscrowTransaction {
  amount: i128;
  buyer: string;
  created_at: u64;
  dispute_reason: OptionalString;
  property_id: string;
  seller: string;
  state: EscrowState;
  updated_at: u64;
}

export const Errors = {
  1: {message:"TransactionNotFound"},

  2: {message:"NotAuthorized"},

  3: {message:"InvalidState"}
}

export interface Client {
  /**
   * Construct and simulate a create_transaction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_transaction: ({buyer, seller, property_id, amount}: {buyer: string, seller: string, property_id: string, amount: i128}, options?: {
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
   * Construct and simulate a complete_transaction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  complete_transaction: ({seller, transaction_id}: {seller: string, transaction_id: u64}, options?: {
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
   * Construct and simulate a refund_transaction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  refund_transaction: ({buyer, transaction_id}: {buyer: string, transaction_id: u64}, options?: {
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
   * Construct and simulate a dispute_transaction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  dispute_transaction: ({buyer, transaction_id, reason}: {buyer: string, transaction_id: u64, reason: string}, options?: {
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
   * Construct and simulate a resolve_dispute transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  resolve_dispute: ({owner, transaction_id, approve}: {owner: string, transaction_id: u64, approve: boolean}, options?: {
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
   * Construct and simulate a get_transaction transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_transaction: ({transaction_id}: {transaction_id: u64}, options?: {
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
  }) => Promise<AssembledTransaction<Result<EscrowTransaction>>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAgAAAAAAAAAAAAAAC0VzY3Jvd1N0YXRlAAAAAAQAAAAAAAAAAAAAAAdQZW5kaW5nAAAAAAAAAAAAAAAACUNvbXBsZXRlZAAAAAAAAAAAAAAAAAAACERpc3B1dGVkAAAAAAAAAAAAAAAIUmVmdW5kZWQ=",
        "AAAAAQAAAAAAAAAAAAAADk9wdGlvbmFsU3RyaW5nAAAAAAABAAAAAAAAAAEwAAAAAAAD6AAAABA=",
        "AAAAAQAAAAAAAAAAAAAAEUVzY3Jvd1RyYW5zYWN0aW9uAAAAAAAACAAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAAVidXllcgAAAAAAABMAAAAAAAAACmNyZWF0ZWRfYXQAAAAAAAYAAAAAAAAADmRpc3B1dGVfcmVhc29uAAAAAAfQAAAADk9wdGlvbmFsU3RyaW5nAAAAAAAAAAAAC3Byb3BlcnR5X2lkAAAAABAAAAAAAAAABnNlbGxlcgAAAAAAEwAAAAAAAAAFc3RhdGUAAAAAAAfQAAAAC0VzY3Jvd1N0YXRlAAAAAAAAAAAKdXBkYXRlZF9hdAAAAAAABg==",
        "AAAABAAAAAAAAAAAAAAAC0VzY3Jvd0Vycm9yAAAAAAMAAAAAAAAAE1RyYW5zYWN0aW9uTm90Rm91bmQAAAAAAQAAAAAAAAANTm90QXV0aG9yaXplZAAAAAAAAAIAAAAAAAAADEludmFsaWRTdGF0ZQAAAAM=",
        "AAAAAAAAAAAAAAASY3JlYXRlX3RyYW5zYWN0aW9uAAAAAAAEAAAAAAAAAAVidXllcgAAAAAAABMAAAAAAAAABnNlbGxlcgAAAAAAEwAAAAAAAAALcHJvcGVydHlfaWQAAAAAEAAAAAAAAAAGYW1vdW50AAAAAAALAAAAAQAAA+kAAAAGAAAH0AAAAAtFc2Nyb3dFcnJvcgA=",
        "AAAAAAAAAAAAAAAUY29tcGxldGVfdHJhbnNhY3Rpb24AAAACAAAAAAAAAAZzZWxsZXIAAAAAABMAAAAAAAAADnRyYW5zYWN0aW9uX2lkAAAAAAAGAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAALRXNjcm93RXJyb3IA",
        "AAAAAAAAAAAAAAAScmVmdW5kX3RyYW5zYWN0aW9uAAAAAAACAAAAAAAAAAVidXllcgAAAAAAABMAAAAAAAAADnRyYW5zYWN0aW9uX2lkAAAAAAAGAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAALRXNjcm93RXJyb3IA",
        "AAAAAAAAAAAAAAATZGlzcHV0ZV90cmFuc2FjdGlvbgAAAAADAAAAAAAAAAVidXllcgAAAAAAABMAAAAAAAAADnRyYW5zYWN0aW9uX2lkAAAAAAAGAAAAAAAAAAZyZWFzb24AAAAAABAAAAABAAAD6QAAA+0AAAAAAAAH0AAAAAtFc2Nyb3dFcnJvcgA=",
        "AAAAAAAAAAAAAAAPcmVzb2x2ZV9kaXNwdXRlAAAAAAMAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAAOdHJhbnNhY3Rpb25faWQAAAAAAAYAAAAAAAAAB2FwcHJvdmUAAAAAAQAAAAEAAAPpAAAD7QAAAAAAAAfQAAAAC0VzY3Jvd0Vycm9yAA==",
        "AAAAAAAAAAAAAAAPZ2V0X3RyYW5zYWN0aW9uAAAAAAEAAAAAAAAADnRyYW5zYWN0aW9uX2lkAAAAAAAGAAAAAQAAA+kAAAfQAAAAEUVzY3Jvd1RyYW5zYWN0aW9uAAAAAAAH0AAAAAtFc2Nyb3dFcnJvcgA=" ]),
      options
    )
  }
  public readonly fromJSON = {
    create_transaction: this.txFromJSON<Result<u64>>,
        complete_transaction: this.txFromJSON<Result<void>>,
        refund_transaction: this.txFromJSON<Result<void>>,
        dispute_transaction: this.txFromJSON<Result<void>>,
        resolve_dispute: this.txFromJSON<Result<void>>,
        get_transaction: this.txFromJSON<Result<EscrowTransaction>>
  }
}