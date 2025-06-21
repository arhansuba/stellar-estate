import { AssembledTransaction, Client as ContractClient, ClientOptions as ContractClientOptions, Result } from '@stellar/stellar-sdk/contract';
import type { i128 } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CAEL22JRFVKB3KKQS3DCO2QMLRLXPZNIWZO2ML2V6YJSQWIV77BDF4G3";
    };
};
export interface Property {
    asset: string;
    id: string;
    is_listed: boolean;
    owner: string;
    price: i128;
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
};
export interface Client {
    /**
     * Construct and simulate a create_property transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    create_property: ({ id, owner, price, asset }: {
        id: string;
        owner: string;
        price: i128;
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
    }) => Promise<AssembledTransaction<Result<void>>>;
    /**
     * Construct and simulate a get_property transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_property: ({ id }: {
        id: string;
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
    }) => Promise<AssembledTransaction<Result<Property>>>;
    /**
     * Construct and simulate a list_property_for_sale transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    list_property_for_sale: ({ id }: {
        id: string;
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
     * Construct and simulate a remove_property_from_sale transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    remove_property_from_sale: ({ id }: {
        id: string;
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
     * Construct and simulate a purchase_property transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    purchase_property: ({ property_id, buyer }: {
        property_id: string;
        buyer: string;
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
        create_property: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        get_property: (json: string) => AssembledTransaction<Result<Property, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        list_property_for_sale: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        remove_property_from_sale: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
        purchase_property: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/contract").ErrorMessage>>;
    };
}
