import * as Client from 'increment';
const PUBLIC_STELLAR_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
const PUBLIC_STELLAR_RPC_URL="https://soroban-testnet.stellar.org"


export default new Client.Client({
    contractId: Client.networks.testnet.contractId,
    rpcUrl: PUBLIC_STELLAR_RPC_URL,
    networkPassphrase: PUBLIC_STELLAR_NETWORK_PASSPHRASE,
});

