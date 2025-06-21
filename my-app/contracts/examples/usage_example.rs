use stellar_real_estate::utils::{init_logger}; // Assuming utils.rs has a logger initializer
use stellar_real_estate::escrow::{EscrowManager}; // Assuming escrow.rs manages escrow functionalities

// Initialize the EscrowManager
let escrow_manager = EscrowManager::new();
use stellar_real_estate::property::{PropertyManager};
use stellar_real_estate::shares::{SharesManager}; // Assuming shares.rs manages property shares.
use stellar_real_estate::utils::{init_logger};    // Assuming utils.rs has a logger initializer for the example.
use tokio; // For async execution

#[tokio::main]
async fn main() {
    // Initialize logging (assuming utils.rs contains this helper)
    init_logger();

    // Create a Stellar server instance (connecting to the testnet)
    let server_url = "https://horizon-testnet.stellar.org";
    let network = Network::TestNet;

    // Initialize PropertyManager and SharesManager
    let property_manager = PropertyManager::new(server_url, network);
    let shares_manager = SharesManager::new();

    // Generate keypairs for a seller and a buyer
    let seller_keypair = Keypair::random();
    let buyer_keypair = Keypair::random();

    // Create and List a Property for Sale
    let property_id = "property_101".to_string();
    let price_in_lumens = 5000; // 5000 XLM

    // Create a new property (owned by the seller) priced in Lumens (XLM)
    match property_manager.create_property(
        property_id.clone(),
        seller_keypair.public_key(),
        price_in_lumens,
        Asset::native()
    ) {
        Ok(_) => println!("Property {} created successfully by seller.", property_id),
        Err(e) => eprintln!("Error creating property: {}", e),
    }

    // List property for sale
    match property_manager.list_property_for_sale(&property_id) {
        Ok(_) => println!("Property {} is now listed for sale.", property_id),
        Err(e) => eprintln!("Error listing property for sale: {}", e),
    }

    // Simulate buyer purchasing the property
    match property_manager.purchase_property(&property_id, &buyer_keypair).await {
        Ok(_) => println!("Buyer successfully purchased property {}", property_id),
        Err(e) => eprintln!("Error purchasing property: {}", e),
    }

    // Handling Property Shares (using shares_manager)
    let num_shares = 100;
    match shares_manager.create_shares_for_property(&property_id, num_shares, seller_keypair.public_key()) {
        Ok(_) => println!("Created {} shares for property {}", num_shares, property_id),
        Err(e) => eprintln!("Error creating shares: {}", e),
    }

    // Buyer buying a fraction of the property via shares
    let shares_to_buy = 10;
    match shares_manager.buy_shares(&property_id, shares_to_buy, &buyer_keypair).await {
        Ok(_) => println!("Buyer successfully purchased {} shares of property {}", shares_to_buy, property_id),
        Err(e) => eprintln!("Error buying shares: {}", e),
    }

    println!("Transaction completed successfully.");
}
    // Create a new shares manager instance
    let shares_manager = Shares::new(seller_keypair.clone(), "SHARE", server.clone(), network);

    // Create a basket for the property shares
    let initial_shares = 1000;
    match shares_manager.create_basket(property_id.clone(), vec![1, 2, 3], initial_shares).await {
        Ok(_) => println!("Basket created for property {} with {} shares.", property_id, initial_shares),
        Err(e) => eprintln!("Error creating basket: {}", e),
    }

    // Issue shares to the seller
    match shares_manager.issue_shares(property_id.clone(), &seller_keypair.public_key(), num_shares).await {
        Ok(_) => println!("Issued {} shares to seller for property {}", num_shares, property_id),
        Err(e) => eprintln!("Error issuing shares: {}", e),
    }

    // Buyer buying a fraction of the property via shares
    let shares_to_buy = 10;
    match shares_manager.buy_shares(&property_id, shares_to_buy, &buyer_keypair).await {
        Ok(_) => println!("Buyer successfully purchased {} shares of property {}", shares_to_buy, property_id),
        Err(e) => eprintln!("Error buying shares: {}", e),
    }

    // Verify shares ownership after purchase
    match shares_manager.get_shares(&property_id, &buyer_keypair.public_key()).await {
        Ok(shares) => println!("Buyer now owns {} shares of property {}", shares, property_id),
        Err(e) => eprintln!("Error retrieving shares: {}", e),
    }
