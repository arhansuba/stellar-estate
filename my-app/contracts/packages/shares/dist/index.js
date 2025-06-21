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
        contractId: "CA2NYIP3WXHW3UGDQMLXEMMJAO7GXDLFGOWICLLU6DOGU64NFBF7FEHX",
    }
};
export const Errors = {
    1: { message: "InsufficientShares" },
    2: { message: "InvalidRecipient" },
    3: { message: "NotEnoughSharesToTransfer" },
    4: { message: "InvalidOwnerAddress" },
    5: { message: "BasketNotFound" },
    6: { message: "PropertyNotFound" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAAC1NoYXJlQmFza2V0AAAAAAMAAAAAAAAACWJhc2tldF9pZAAAAAAAAAYAAAAAAAAADHByb3BlcnR5X2lkcwAAA+oAAAAGAAAAAAAAAAx0b3RhbF9zaGFyZXMAAAAG",
            "AAAAAQAAAAAAAAAAAAAADlByb3BlcnR5U2hhcmVzAAAAAAADAAAAAAAAABBhdmFpbGFibGVfc2hhcmVzAAAABgAAAAAAAAAMc2hhcmVob2xkZXJzAAAD7AAAABMAAAAGAAAAAAAAAAx0b3RhbF9zaGFyZXMAAAAG",
            "AAAABAAAAAAAAAAAAAAAC1NoYXJlc0Vycm9yAAAAAAYAAAAAAAAAEkluc3VmZmljaWVudFNoYXJlcwAAAAAAAQAAAAAAAAAQSW52YWxpZFJlY2lwaWVudAAAAAIAAAAAAAAAGU5vdEVub3VnaFNoYXJlc1RvVHJhbnNmZXIAAAAAAAADAAAAAAAAABNJbnZhbGlkT3duZXJBZGRyZXNzAAAAAAQAAAAAAAAADkJhc2tldE5vdEZvdW5kAAAAAAAFAAAAAAAAABBQcm9wZXJ0eU5vdEZvdW5kAAAABg==",
            "AAAAAAAAAAAAAAANY3JlYXRlX2Jhc2tldAAAAAAAAAIAAAAAAAAADHByb3BlcnR5X2lkcwAAA+oAAAAGAAAAAAAAAAx0b3RhbF9zaGFyZXMAAAAGAAAAAQAAA+kAAAAGAAAH0AAAAAtTaGFyZXNFcnJvcgA=",
            "AAAAAAAAAAAAAAAMaXNzdWVfc2hhcmVzAAAAAwAAAAAAAAAJYmFza2V0X2lkAAAAAAAABgAAAAAAAAACdG8AAAAAABMAAAAAAAAABmFtb3VudAAAAAAABgAAAAEAAAPpAAAD7QAAAAAAAAfQAAAAC1NoYXJlc0Vycm9yAA==",
            "AAAAAAAAAAAAAAASZ2V0X2Jhc2tldF9kZXRhaWxzAAAAAAABAAAAAAAAAAliYXNrZXRfaWQAAAAAAAAGAAAAAQAAA+kAAAfQAAAAC1NoYXJlQmFza2V0AAAAB9AAAAALU2hhcmVzRXJyb3IA",
            "AAAAAAAAAAAAAAAPdHJhbnNmZXJfc2hhcmVzAAAAAAMAAAAAAAAABGZyb20AAAATAAAAAAAAAAJ0bwAAAAAAEwAAAAAAAAAGYW1vdW50AAAAAAAGAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAALU2hhcmVzRXJyb3IA",
            "AAAAAAAAAAAAAAAKZ2V0X3NoYXJlcwAAAAAAAQAAAAAAAAAHYWRkcmVzcwAAAAATAAAAAQAAAAY="]), options);
        this.options = options;
    }
    fromJSON = {
        create_basket: (this.txFromJSON),
        issue_shares: (this.txFromJSON),
        get_basket_details: (this.txFromJSON),
        transfer_shares: (this.txFromJSON),
        get_shares: (this.txFromJSON)
    };
}
