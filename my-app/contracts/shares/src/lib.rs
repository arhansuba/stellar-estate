#![no_std]
use soroban_sdk::{contractimpl, contract,contracttype, contracterror, symbol_short, Env, Address, Vec, Map};

#[contract]
pub struct Shares;

#[contracttype]
pub struct ShareBasket {
    pub basket_id: u64,
    pub property_ids: Vec<u64>,
    pub total_shares: u64,
}

#[contracttype]
pub struct PropertyShares {
    pub total_shares: u64,
    pub available_shares: u64,
    pub shareholders: Map<Address, u64>,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum SharesError {
    InsufficientShares = 1,
    InvalidRecipient = 2,
    NotEnoughSharesToTransfer = 3,
    InvalidOwnerAddress = 4,
    BasketNotFound = 5,
    PropertyNotFound = 6,
}




#[contractimpl]
impl Shares {
    pub fn create_basket(env: Env, property_ids: Vec<u64>, total_shares: u64) -> Result<u64, SharesError> {
        let basket_id = env.storage().instance().get(&symbol_short!("next_id")).unwrap_or(0);
        env.storage().instance().set(&symbol_short!("next_id"), &(basket_id + 1));

        let basket = ShareBasket {
            basket_id,
            property_ids,
            total_shares,
        };

        env.storage().persistent().set(&basket_id, &basket);
        Ok(basket_id)
    }

    pub fn issue_shares(env: Env, basket_id: u64, to: Address, amount: u64) -> Result<(), SharesError> {
        let mut basket: ShareBasket = env.storage().persistent().get(&basket_id).ok_or(SharesError::BasketNotFound)?;

        if basket.total_shares < amount {
            return Err(SharesError::InsufficientShares);
        }

        basket.total_shares -= amount;
        env.storage().persistent().set(&basket_id, &basket);

        let key = (symbol_short!("shares"), &to);
        let mut shares = env.storage().persistent().get(&key).unwrap_or(0u64);
        shares += amount;
        env.storage().persistent().set(&key, &shares);

        Ok(())
    }

    pub fn get_basket_details(env: Env, basket_id: u64) -> Result<ShareBasket, SharesError> {
        env.storage().persistent().get(&basket_id).ok_or(SharesError::BasketNotFound)
    }

    pub fn transfer_shares(env: Env, from: Address, to: Address, amount: u64) -> Result<(), SharesError> {
        let from_key = (symbol_short!("shares"), &from);
        let mut from_shares = env.storage().persistent().get(&from_key).unwrap_or(0u64);
        if from_shares < amount {
            return Err(SharesError::NotEnoughSharesToTransfer);
        }

        from_shares -= amount;
        env.storage().persistent().set(&from_key, &from_shares);

        let to_key = (symbol_short!("shares"), &to);
        let mut to_shares = env.storage().persistent().get(&to_key).unwrap_or(0u64);
        to_shares += amount;
        env.storage().persistent().set(&to_key, &to_shares);

        Ok(())
    }

    pub fn get_shares(env: Env, address: Address) -> u64 {
        let key = (symbol_short!("shares"), &address);
        env.storage().persistent().get(&key).unwrap_or(0u64)
    }
}