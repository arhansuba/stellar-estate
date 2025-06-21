import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, Result } from '@stellar/stellar-sdk/contract';
import type { u64 } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CA2NYIP3WXHW3UGDQMLXEMMJAO7GXDLFGOWICLLU6DOGU64NFBF7FEHX";
    };
};
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
    6: {
        message: string;
    };
};
export interface Client {
    /**
     * Construct and simulate a create_basket transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    create_basket: ({ property_ids, total_shares }: {
        property_ids: Array<u64>;
        total_shares: u64;
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
     * Construct and simulate a issue_shares transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    issue_shares: ({ basket_id, to, amount }: {
        basket_id: u64;
        to: string;
        amount: u64;
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
     * Construct and simulate a get_basket_details transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_basket_details: ({ basket_id }: {
        basket_id: u64;
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
    }) => Promise<AssembledTransaction<Result<ShareBasket>>>;
    /**
     * Construct and simulate a transfer_shares transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    transfer_shares: ({ from, to, amount }: {
        from: string;
        to: string;
        amount: u64;
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
     * Construct and simulate a get_shares transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_shares: ({ address }: {
        address: string;
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
    }) => Promise<AssembledTransaction<u64>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        create_basket: (json: string) => AssembledTransaction<Result<bigint, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        issue_shares: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_basket_details: (json: string) => AssembledTransaction<Result<ShareBasket, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        transfer_shares: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_shares: (json: string) => AssembledTransaction<bigint>;
    };
}
