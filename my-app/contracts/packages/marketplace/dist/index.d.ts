import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, Result } from '@stellar/stellar-sdk/contract';
import type { u32, u64, i128 } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CBW3HAGIKRUFGINW5JCAGFL53VKMDACLEZNGX7CRM4U7TPHFV5TV4FKY";
    };
};
export interface Property {
    asset: string;
    available_shares: u32;
    is_listed: boolean;
    owner: string;
    price: i128;
    total_shares: u32;
}
export declare const Errors: {
    1: {
        message: string;
    };
    2: {
        message: string;
    };
    3: {
        message: string;
    };
    4: {
        message: string;
    };
    5: {
        message: string;
    };
};
export interface Client {
    /**
     * Construct and simulate a list_property transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    list_property: ({ owner, price, total_shares, asset }: {
        owner: string;
        price: i128;
        total_shares: u32;
        asset: string;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<u64>>>;
    /**
     * Construct and simulate a purchase_shares transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    purchase_shares: ({ property_id, buyer, shares_to_buy }: {
        property_id: u64;
        buyer: string;
        shares_to_buy: u32;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
    /**
     * Construct and simulate a finalize_sale transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    finalize_sale: ({ property_id }: {
        property_id: u64;
    }, options?: {
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
    }) => Promise<AssembledTransaction<Result<void>>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        list_property: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        purchase_shares: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        finalize_sale: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
    };
}
