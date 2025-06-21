#[cfg(test)]
mod tests {
    use super::*;
    use stellar_sdk::{Keypair, Asset, Network};
    use std::sync::Arc;

    #[tokio::test]
    async fn test_create_property() {
        let server = Server::new("https://horizon-testnet.stellar.org");
        let network = Network::TESTNET;
        let property_manager = PropertyManager::new("https://horizon-testnet.stellar.org", network);

        let owner_keypair = Keypair::random();
        let asset = Asset::native();
        let property_id = "property_1".to_string();
        let price = 1000000;

        let result = property_manager.create_property(property_id.clone(), owner_keypair.public_key(), price, asset.clone());
        assert!(result.is_ok());

        let properties = property_manager.properties.lock().unwrap();
        assert!(properties.contains_key(&property_id));
    }

    #[tokio::test]
    async fn test_purchase_property() {
        let server = Server::new("https://horizon-testnet.stellar.org");
        let network = Network::TESTNET;
        let property_manager = PropertyManager::new("https://horizon-testnet.stellar.org", network);

        let owner_keypair = Keypair::random();
        let buyer_keypair = Keypair::random();
        let asset = Asset::native();
        let property_id = "property_1".to_string();
        let price = 1000000;

        // Create property
        property_manager.create_property(property_id.clone(), owner_keypair.public_key(), price, asset.clone()).unwrap();

        // List property for sale
        property_manager.list_property_for_sale(&property_id).await.unwrap();

        // Attempt to purchase property
        let purchase_result = property_manager.purchase_property(&property_id, &buyer_keypair).await;
        assert!(purchase_result.is_ok());

        // Verify ownership transfer
        let properties = property_manager.properties.lock().unwrap();
        let property = properties.get(&property_id).unwrap();
        assert_eq!(property.owner, buyer_keypair.public_key());
    }

    #[tokio::test]
    async fn test_purchase_property_not_for_sale() {
        let server = Server::new("https://horizon-testnet.stellar.org");
        let network = Network::TESTNET;
        let property_manager = PropertyManager::new("https://horizon-testnet.stellar.org", network);

        let owner_keypair = Keypair::random();
        let buyer_keypair = Keypair::random();
        let asset = Asset::native();
        let property_id = "property_1".to_string();
        let price = 1000000;

        // Create property
        property_manager.create_property(property_id.clone(), owner_keypair.public_key(), price, asset.clone()).unwrap();

        // Attempt to purchase property without listing it for sale
        let purchase_result = property_manager.purchase_property(&property_id, &buyer_keypair).await;
        assert!(purchase_result.is_err());
        assert_eq!(purchase_result.unwrap_err(), PropertyError::Unauthorized);
    }
}
