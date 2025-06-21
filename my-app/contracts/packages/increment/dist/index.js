import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CDM2IJCM3KAZBEM2SC3VKJ7PZTFKXQXFEEKAODQZVONDRHC3U6HEAWKZ",
    }
};
export const Errors = {};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAADRJbmNyZW1lbnQgYW4gaW50ZXJuYWwgY291bnRlcjsgcmV0dXJuIHRoZSBuZXcgdmFsdWUuAAAACWluY3JlbWVudAAAAAAAAAAAAAABAAAABA=="]), options);
        this.options = options;
    }
    fromJSON = {
        increment: (this.txFromJSON)
    };
}
