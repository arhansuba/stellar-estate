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
        contractId: "CCDJXQS3DFU2VBFAXMXILXFEQZL5NMHPW3N34F2KAGZQBKBKYLPKTLTF",
    }
};
export const Errors = {
    1: { message: "TransactionNotFound" },
    2: { message: "NotAuthorized" },
    3: { message: "InvalidState" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAgAAAAAAAAAAAAAAC0VzY3Jvd1N0YXRlAAAAAAQAAAAAAAAAAAAAAAdQZW5kaW5nAAAAAAAAAAAAAAAACUNvbXBsZXRlZAAAAAAAAAAAAAAAAAAACERpc3B1dGVkAAAAAAAAAAAAAAAIUmVmdW5kZWQ=",
            "AAAAAQAAAAAAAAAAAAAADk9wdGlvbmFsU3RyaW5nAAAAAAABAAAAAAAAAAEwAAAAAAAD6AAAABA=",
            "AAAAAQAAAAAAAAAAAAAAEUVzY3Jvd1RyYW5zYWN0aW9uAAAAAAAACAAAAAAAAAAGYW1vdW50AAAAAAALAAAAAAAAAAVidXllcgAAAAAAABMAAAAAAAAACmNyZWF0ZWRfYXQAAAAAAAYAAAAAAAAADmRpc3B1dGVfcmVhc29uAAAAAAfQAAAADk9wdGlvbmFsU3RyaW5nAAAAAAAAAAAAC3Byb3BlcnR5X2lkAAAAABAAAAAAAAAABnNlbGxlcgAAAAAAEwAAAAAAAAAFc3RhdGUAAAAAAAfQAAAAC0VzY3Jvd1N0YXRlAAAAAAAAAAAKdXBkYXRlZF9hdAAAAAAABg==",
            "AAAABAAAAAAAAAAAAAAAC0VzY3Jvd0Vycm9yAAAAAAMAAAAAAAAAE1RyYW5zYWN0aW9uTm90Rm91bmQAAAAAAQAAAAAAAAANTm90QXV0aG9yaXplZAAAAAAAAAIAAAAAAAAADEludmFsaWRTdGF0ZQAAAAM=",
            "AAAAAAAAAAAAAAASY3JlYXRlX3RyYW5zYWN0aW9uAAAAAAAEAAAAAAAAAAVidXllcgAAAAAAABMAAAAAAAAABnNlbGxlcgAAAAAAEwAAAAAAAAALcHJvcGVydHlfaWQAAAAAEAAAAAAAAAAGYW1vdW50AAAAAAALAAAAAQAAA+kAAAAGAAAH0AAAAAtFc2Nyb3dFcnJvcgA=",
            "AAAAAAAAAAAAAAAUY29tcGxldGVfdHJhbnNhY3Rpb24AAAACAAAAAAAAAAZzZWxsZXIAAAAAABMAAAAAAAAADnRyYW5zYWN0aW9uX2lkAAAAAAAGAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAALRXNjcm93RXJyb3IA",
            "AAAAAAAAAAAAAAAScmVmdW5kX3RyYW5zYWN0aW9uAAAAAAACAAAAAAAAAAVidXllcgAAAAAAABMAAAAAAAAADnRyYW5zYWN0aW9uX2lkAAAAAAAGAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAALRXNjcm93RXJyb3IA",
            "AAAAAAAAAAAAAAATZGlzcHV0ZV90cmFuc2FjdGlvbgAAAAADAAAAAAAAAAVidXllcgAAAAAAABMAAAAAAAAADnRyYW5zYWN0aW9uX2lkAAAAAAAGAAAAAAAAAAZyZWFzb24AAAAAABAAAAABAAAD6QAAA+0AAAAAAAAH0AAAAAtFc2Nyb3dFcnJvcgA=",
            "AAAAAAAAAAAAAAAPcmVzb2x2ZV9kaXNwdXRlAAAAAAMAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAAOdHJhbnNhY3Rpb25faWQAAAAAAAYAAAAAAAAAB2FwcHJvdmUAAAAAAQAAAAEAAAPpAAAD7QAAAAAAAAfQAAAAC0VzY3Jvd0Vycm9yAA==",
            "AAAAAAAAAAAAAAAPZ2V0X3RyYW5zYWN0aW9uAAAAAAEAAAAAAAAADnRyYW5zYWN0aW9uX2lkAAAAAAAGAAAAAQAAA+kAAAfQAAAAEUVzY3Jvd1RyYW5zYWN0aW9uAAAAAAAH0AAAAAtFc2Nyb3dFcnJvcgA="]), options);
        this.options = options;
    }
    fromJSON = {
        create_transaction: (this.txFromJSON),
        complete_transaction: (this.txFromJSON),
        refund_transaction: (this.txFromJSON),
        dispute_transaction: (this.txFromJSON),
        resolve_dispute: (this.txFromJSON),
        get_transaction: (this.txFromJSON)
    };
}
