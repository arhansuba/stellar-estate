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
        contractId: "CAEL22JRFVKB3KKQS3DCO2QMLRLXPZNIWZO2ML2V6YJSQWIV77BDF4G3",
    }
};
export const Errors = {
    1: { message: "InvalidPrice" },
    2: { message: "InvalidPaymentAsset" },
    3: { message: "Unauthorized" },
    4: { message: "PropertyNotFound" }
};
export class Client extends ContractClient {
    options;
    constructor(options) {
        super(new ContractSpec(["AAAAAQAAAAAAAAAAAAAACFByb3BlcnR5AAAABQAAAAAAAAAFYXNzZXQAAAAAAAATAAAAAAAAAAJpZAAAAAAAEAAAAAAAAAAJaXNfbGlzdGVkAAAAAAAAAQAAAAAAAAAFb3duZXIAAAAAAAATAAAAAAAAAAVwcmljZQAAAAAAAAs=",
            "AAAABAAAAAAAAAAAAAAADVByb3BlcnR5RXJyb3IAAAAAAAAEAAAAAAAAAAxJbnZhbGlkUHJpY2UAAAABAAAAAAAAABNJbnZhbGlkUGF5bWVudEFzc2V0AAAAAAIAAAAAAAAADFVuYXV0aG9yaXplZAAAAAMAAAAAAAAAEFByb3BlcnR5Tm90Rm91bmQAAAAE",
            "AAAAAAAAAAAAAAAPY3JlYXRlX3Byb3BlcnR5AAAAAAQAAAAAAAAAAmlkAAAAAAAQAAAAAAAAAAVvd25lcgAAAAAAABMAAAAAAAAABXByaWNlAAAAAAAACwAAAAAAAAAFYXNzZXQAAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANUHJvcGVydHlFcnJvcgAAAA==",
            "AAAAAAAAAAAAAAAMZ2V0X3Byb3BlcnR5AAAAAQAAAAAAAAACaWQAAAAAABAAAAABAAAD6QAAB9AAAAAIUHJvcGVydHkAAAfQAAAADVByb3BlcnR5RXJyb3IAAAA=",
            "AAAAAAAAAAAAAAAWbGlzdF9wcm9wZXJ0eV9mb3Jfc2FsZQAAAAAAAQAAAAAAAAACaWQAAAAAABAAAAABAAAD6QAAA+0AAAAAAAAH0AAAAA1Qcm9wZXJ0eUVycm9yAAAA",
            "AAAAAAAAAAAAAAAZcmVtb3ZlX3Byb3BlcnR5X2Zyb21fc2FsZQAAAAAAAAEAAAAAAAAAAmlkAAAAAAAQAAAAAQAAA+kAAAPtAAAAAAAAB9AAAAANUHJvcGVydHlFcnJvcgAAAA==",
            "AAAAAAAAAAAAAAARcHVyY2hhc2VfcHJvcGVydHkAAAAAAAACAAAAAAAAAAtwcm9wZXJ0eV9pZAAAAAAQAAAAAAAAAAVidXllcgAAAAAAABMAAAABAAAD6QAAA+0AAAAAAAAH0AAAAA1Qcm9wZXJ0eUVycm9yAAAA"]), options);
        this.options = options;
    }
    fromJSON = {
        create_property: (this.txFromJSON),
        get_property: (this.txFromJSON),
        list_property_for_sale: (this.txFromJSON),
        remove_property_from_sale: (this.txFromJSON),
        purchase_property: (this.txFromJSON)
    };
}
