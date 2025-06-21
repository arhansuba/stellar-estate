#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, contracterror, symbol_short,
    Address, Env, token,
};

#[contract]
pub struct Marketplace;

#[contracttype]
pub struct Property {
    owner: Address,
    price: i128,
    total_shares: u32,
    available_shares: u32,
    asset: Address,
    is_listed: bool,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum MarketplaceError {
    PropertyNotFound = 1,
    NotAuthorized = 2,
    InsufficientShares = 3,
    PropertyNotListed = 4,
    SharesStillAvailable = 5,
}


#[contractimpl]
impl Marketplace {
    pub fn list_property(
        env: Env, 
        owner: Address, 
        price: i128, 
        total_shares: u32, 
        asset: Address
    ) -> Result<u64, MarketplaceError> {
        owner.require_auth();

        let property = Property {
            owner: owner.clone(),
            price,
            total_shares,
            available_shares: total_shares,
            asset,
            is_listed: true,
        };

        let id = env.storage().instance().get(&symbol_short!("next_id")).unwrap_or(0);
        env.storage().instance().set(&symbol_short!("next_id"), &(id + 1));
        env.storage().persistent().set(&id, &property);

        Ok(id)
    }
    
    pub fn purchase_shares(
        env: Env,
        property_id: u64,
        buyer: Address,
        shares_to_buy: u32,
    ) -> Result<(), MarketplaceError> {
        buyer.require_auth();

        let mut property: Property = env.storage().persistent().get(&property_id)
            .ok_or(MarketplaceError::PropertyNotFound)?;

        if !property.is_listed {
            return Err(MarketplaceError::PropertyNotListed);
        }
        if property.available_shares < shares_to_buy {
            return Err(MarketplaceError::InsufficientShares);
        }

        let total_price = (property.price * shares_to_buy as i128) / property.total_shares as i128;

        let token_client = token::Client::new(&env, &property.asset);
        token_client.transfer(&buyer, &property.owner, &total_price);

        property.available_shares -= shares_to_buy;
        env.storage().persistent().set(&property_id, &property);

        Ok(())
    }

    pub fn finalize_sale(
        env: Env,
        property_id: u64,
    ) -> Result<(), MarketplaceError> {
        let mut property: Property = env.storage().persistent().get(&property_id)
            .ok_or(MarketplaceError::PropertyNotFound)?;

        if property.available_shares > 0 {
            return Err(MarketplaceError::SharesStillAvailable);
        }

        property.is_listed = false;
        env.storage().persistent().set(&property_id, &property);

        Ok(())
    }
}
