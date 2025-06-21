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
        contractId: "CBW3HAGIKRUFGINW5JCAGFL53VKMDACLEZNGX7CRM4U7TPHFV5TV4FKY",
    }
};
export const Errors = {
    1: { message: "PropertyNotFound" },
    2: { message: "NotAuthorized" },
    3: { message: "InsufficientShares" },
    4: { message: "PropertyNotListed" },
    5: { message: "SharesStillAvailable" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAACFByb3BlcnR5AAAABgAAAAAAAAAFYXNzZXQAAAAAAAATAAAAAAAAABBhdmFpbGFibGVfc2hhcmVzAAAABAAAAAAAAAAJaXNfbGlzdGVkAAAAAAAAAQAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAVwcmljZQAAAAAAAAsAAAAAAAAADHRvdGFsX3NoYXJlcwAAAAQ=",
            "AAAABAAAAAAAAAAAAAAAEE1hcmtldHBsYWNlRXJyb3IAAAAFAAAAAAAAABBQcm9wZXJ0eU5vdEZvdW5kAAAAAQAAAAAAAAANTm90QXV0aG9yaXplZAAAAAAAAAIAAAAAAAAAEkluc3VmZmljaWVudFNoYXJlcwAAAAAAAwAAAAAAAAARUHJvcGVydHlOb3RMaXN0ZWQAAAAAAAAEAAAAAAAAABRTaGFyZXNTdGlsbEF2YWlsYWJsZQAAAAU=",
            "AAAAAAAAAAAAAAANbGlzdF9wcm9wZXJ0eQAAAAAAAAQAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAAFcHJpY2UAAAAAAAALAAAAAAAAAAx0b3RhbF9zaGFyZXMAAAAEAAAAAAAAAAVhc3NldAAAAAAAABMAAAABAAAD6QAAAAYAAAfQAAAAEE1hcmtldHBsYWNlRXJyb3I=",
            "AAAAAAAAAAAAAAAPcHVyY2hhc2Vfc2hhcmVzAAAAAAMAAAAAAAAAC3Byb3BlcnR5X2lkAAAAAAYAAAAAAAAABWJ1eWVyAAAAAAAAEwAAAAAAAAANc2hhcmVzX3RvX2J1eQAAAAAAAAQAAAABAAAD6QAAA+0AAAAAAAAH0AAAABBNYXJrZXRwbGFjZUVycm9y",
            "AAAAAAAAAAAAAAANZmluYWxpemVfc2FsZQAAAAAAAAEAAAAAAAAAC3Byb3BlcnR5X2lkAAAAAAYAAAABAAAD6QAAA+0AAAAAAAAH0AAAABBNYXJrZXRwbGFjZUVycm9y"]), options);
        this.options = options;
    }
    fromJSON = {
        list_property: (this.txFromJSON),
        purchase_shares: (this.txFromJSON),
        finalize_sale: (this.txFromJSON)
    };
}
