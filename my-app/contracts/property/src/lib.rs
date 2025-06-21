#![no_std]
use soroban_sdk::{
    contract, contracterror, contractimpl, contracttype, Address, Env, String
};

#[contract]
pub struct PropertyContract;

#[contracttype]
pub struct Property {
    pub id: String,
    pub owner: Address,
    pub price: i128,
    pub asset: Address,
    pub is_listed: bool,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum PropertyError {
    InvalidPrice = 1,
    InvalidPaymentAsset = 2,
    Unauthorized = 3,
    PropertyNotFound = 4,
}


#[contractimpl]
impl PropertyContract {
    pub fn create_property(env: Env, id: String, owner: Address, price: i128, asset: Address) -> Result<(), PropertyError> {
        if price <= 0 {
            return Err(PropertyError::InvalidPrice);
        }
        let property = Property { id: id.clone(), owner, price, asset, is_listed: false };
        env.storage().persistent().set(&id, &property);
        Ok(())
    }

    pub fn get_property(env: Env, id: String) -> Result<Property, PropertyError> {
        env.storage().persistent().get(&id).ok_or(PropertyError::PropertyNotFound)  
    }

    pub fn list_property_for_sale(env: Env, id: String) -> Result<(), PropertyError> {
        let mut property: Property = env.storage().persistent().get(&id).ok_or(PropertyError::PropertyNotFound)?;
        property.is_listed = true;
        env.storage().persistent().set(&id, &property);
        Ok(())
    }

    pub fn remove_property_from_sale(env: Env, id: String) -> Result<(), PropertyError> {
        let mut property: Property = env.storage().persistent().get(&id).ok_or(PropertyError::PropertyNotFound)?;
        property.is_listed = false;
        env.storage().persistent().set(&id, &property);
        Ok(())
    }

    pub fn purchase_property(env: Env, property_id: String, buyer: Address) -> Result<(), PropertyError> {
        let mut property: Property = env.storage().persistent().get(&property_id).ok_or(PropertyError::PropertyNotFound)?;

        if !property.is_listed {
            return Err(PropertyError::Unauthorized);
        }

        // Transfer ownership
        property.owner = buyer;
        property.is_listed = false;
        env.storage().persistent().set(&property_id, &property);

        // Note: Actual token transfer should be handled separately using Stellar SDK or custom token contract

        Ok(())
    }
}

