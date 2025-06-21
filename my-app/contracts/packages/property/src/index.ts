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
    contractId: "CAEL22JRFVKB3KKQS3DCO2QMLRLXPZNIWZO2ML2V6YJSQWIV77BDF4G3",
  }
} as const


export interface Property {
  asset: string;
  id: string;
  is_listed: boolean;
  owner: string;
  price: i128;
}

export const Errors = {
  1: {message:"InvalidPrice"},

  2: {message:"InvalidPaymentAsset"},

  3: {message:"Unauthorized"},

  4: {message:"PropertyNotFound"}
}

export interface Client {
  /**
   * Construct and simulate a create_property transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_property: ({id, owner, price, asset}: {id: string, owner: string, price: i128, asset: string}, options?: {
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
   * Construct and simulate a get_property transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_property: ({id}: {id: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Property>>>

  /**
   * Construct and simulate a list_property_for_sale transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  list_property_for_sale: ({id}: {id: string}, options?: {
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
   * Construct and simulate a remove_property_from_sale transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  remove_property_from_sale: ({id}: {id: string}, options?: {
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
   * Construct and simulate a purchase_property transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  purchase_property: ({property_id, buyer}: {property_id: string, buyer: string}, options?: {
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
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAACFByb3BlcnR5AAAABQAAAAAAAAAFYXNzZXQAAAAAAAATAAAAAAAAAAJpZAAAAAAAEAAAAAAAAAAJaXNfbGlzdGVkAAAAAAAAAQAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAVwcmljZQAAAAAAAAs=",
        "AAAABAAAAAAAAAAAAAAADVByb3BlcnR5RXJyb3IAAAAAAAAEAAAAAAAAAAxJbnZhbGlkUHJpY2UAAAABAAAAAAAAABNJbnZhbGlkUGF5bWVudEFzc2V0AAAAAAIAAAAAAAAADFVuYXV0aG9yaXplZAAAAAMAAAAAAAAAEFByb3BlcnR5Tm90Rm91bmQAAAAE",
        "AAAAAAAAAAAAAAAPY3JlYXRlX3Byb3BlcnR5AAAAAAQAAAAAAAAAAmlkAAAAAAAQAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAABXByaWNlAAAAAAAACwAAAAAAAAAFYXNzZXQAAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANUHJvcGVydHlFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAAMZ2V0X3Byb3BlcnR5AAAAAQAAAAAAAAACaWQAAAAAABAAAAABAAAD6QAAB9AAAAAIUHJvcGVydHkAAAfQAAAADVByb3BlcnR5RXJyb3IAAAA=",
        "AAAAAAAAAAAAAAAWbGlzdF9wcm9wZXJ0eV9mb3Jfc2FsZQAAAAAAAQAAAAAAAAACaWQAAAAAABAAAAABAAAD6QAAA+0AAAAAAAAH0AAAAA1Qcm9wZXJ0eUVycm9yAAAA",
        "AAAAAAAAAAAAAAAZcmVtb3ZlX3Byb3BlcnR5X2Zyb21fc2FsZQAAAAAAAAEAAAAAAAAAAmlkAAAAAAAQAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANUHJvcGVydHlFcnJvcgAAAA==",
        "AAAAAAAAAAAAAAARcHVyY2hhc2VfcHJvcGVydHkAAAAAAAACAAAAAAAAAAtwcm9wZXJ0eV9pZAAAAAAQAAAAAAAAAAVidXllcgAAAAAAABMAAAABAAAD6QAAA+0AAAAAAAAH0AAAAA1Qcm9wZXJ0eUVycm9yAAAA" ]),
      options
    )
  }
  public readonly fromJSON = {
    create_property: this.txFromJSON<Result<void>>,
        get_property: this.txFromJSON<Result<Property>>,
        list_property_for_sale: this.txFromJSON<Result<void>>,
        remove_property_from_sale: this.txFromJSON<Result<void>>,
        purchase_property: this.txFromJSON<Result<void>>
  }
}