#[tokio::test]
async fn test_issue_and_transfer_shares() {
    let server = Server::new("https://horizon-testnet.stellar.org");
    let network = Network::TESTNET;
    let issuer_keypair = Keypair::random();
    let shares_contract = Shares::new(issuer_keypair.clone(), "SHARE", server.clone(), network);

    let property_id = 1;
    let initial_shares = 1000;

    // Create a basket
    shares_contract.create_basket(property_id, vec![1, 2, 3], initial_shares).await.unwrap();

    // Issue shares to an investor
    let investor_keypair = Keypair::random();
    shares_contract.issue_shares(property_id, &investor_keypair.public_key(), 100).await.unwrap();

    // Verify shares issued
    let shares = shares_contract.get_shares(property_id, &investor_keypair.public_key()).await.unwrap();
    assert_eq!(shares, 100);

    // Transfer shares to a new investor
    let new_investor_keypair = Keypair::random();
    shares_contract.transfer_shares(property_id, &investor_keypair, &new_investor_keypair.public_key(), 50).await.unwrap();

    // Verify shares transferred
    let shares_after_transfer = shares_contract.get_shares(property_id, &new_investor_keypair.public_key()).await.unwrap();
    assert_eq!(shares_after_transfer, 50);

    // Verify remaining shares for the original investor
    let remaining_shares = shares_contract.get_shares(property_id, &investor_keypair.public_key()).await.unwrap();
    assert_eq!(remaining_shares, 50);
}
