#![no_std]

use soroban_sdk::{
    contractimpl, contracttype, contract,contracterror, symbol_short,
    Address, Env, String,
};

#[contract]
pub struct Escrow;


#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum EscrowState {
    Pending,
    Completed,
    Disputed,
    Refunded,
}

#[contracttype]
#[derive(Clone, Debug)]
pub struct OptionalString(Option<String>);


#[contracttype]
#[derive(Clone, Debug)]
pub struct EscrowTransaction {
    buyer: Address,
    seller: Address,
    property_id: String,
    amount: i128,
    state: EscrowState,
    created_at: u64,
    updated_at: u64,
    dispute_reason: OptionalString,
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum EscrowError {
    TransactionNotFound = 1,
    NotAuthorized = 2,
    InvalidState = 3,
}


#[contractimpl]
impl Escrow {
    pub fn create_transaction(env: Env, buyer: Address, seller: Address, property_id: String, amount: i128) -> Result<u64, EscrowError> {
        buyer.require_auth();

        let transaction = EscrowTransaction {
            buyer,
            seller,
            property_id,
            amount,
            state: EscrowState::Pending,
            created_at: env.ledger().timestamp(),
            updated_at: env.ledger().timestamp(),
            dispute_reason: OptionalString(None),
        };

        let id = env.storage().instance().get(&symbol_short!("next_id")).unwrap_or(0);
        env.storage().instance().set(&symbol_short!("next_id"), &(id + 1));
        env.storage().persistent().set(&id, &transaction);

        Ok(id)
    }

    pub fn complete_transaction(env: Env, seller: Address, transaction_id: u64) -> Result<(), EscrowError> {
        seller.require_auth();

        let mut transaction: EscrowTransaction = env.storage().persistent().get(&transaction_id)
            .ok_or(EscrowError::TransactionNotFound)?;

        if transaction.seller != seller {
            return Err(EscrowError::NotAuthorized);
        }

        if transaction.state != EscrowState::Pending {
            return Err(EscrowError::InvalidState);
        }

        // Here you would implement the logic to transfer funds from escrow to seller
        // using Soroban's token interface

        transaction.state = EscrowState::Completed;
        transaction.updated_at = env.ledger().timestamp();
        env.storage().persistent().set(&transaction_id, &transaction);

        Ok(())
    }

    pub fn refund_transaction(env: Env, buyer: Address, transaction_id: u64) -> Result<(), EscrowError> {
        buyer.require_auth();

        let mut transaction: EscrowTransaction = env.storage().persistent().get(&transaction_id)
            .ok_or(EscrowError::TransactionNotFound)?;

        if transaction.buyer != buyer {
            return Err(EscrowError::NotAuthorized);
        }

        if transaction.state != EscrowState::Pending {
            return Err(EscrowError::InvalidState);
        }

        // Here you would implement the logic to refund from escrow to buyer
        // using Soroban's token interface

        transaction.state = EscrowState::Refunded;
        transaction.updated_at = env.ledger().timestamp();
        env.storage().persistent().set(&transaction_id, &transaction);

        Ok(())
    }

    pub fn dispute_transaction(env: Env, buyer: Address, transaction_id: u64, reason: String) -> Result<(), EscrowError> {
        buyer.require_auth();

        let mut transaction: EscrowTransaction = env.storage().persistent().get(&transaction_id)
            .ok_or(EscrowError::TransactionNotFound)?;

        if transaction.buyer != buyer {
            return Err(EscrowError::NotAuthorized);
        }

        if transaction.state != EscrowState::Pending {
            return Err(EscrowError::InvalidState);
        }

        transaction.state = EscrowState::Disputed;
        transaction.dispute_reason = OptionalString(Some(reason));
        transaction.updated_at = env.ledger().timestamp();
        env.storage().persistent().set(&transaction_id, &transaction);

        Ok(())
    }

    pub fn resolve_dispute(env: Env, owner: Address, transaction_id: u64, approve: bool) -> Result<(), EscrowError> {
        owner.require_auth();

        let mut transaction: EscrowTransaction = env.storage().persistent().get(&transaction_id)
            .ok_or(EscrowError::TransactionNotFound)?;

        if transaction.state != EscrowState::Disputed {
            return Err(EscrowError::InvalidState);
        }

        // Here you would implement the logic to transfer funds based on the dispute resolution
        // using Soroban's token interface

        transaction.state = if approve { EscrowState::Completed } else { EscrowState::Refunded };
        transaction.updated_at = env.ledger().timestamp();
        env.storage().persistent().set(&transaction_id, &transaction);

        Ok(())
    }

    pub fn get_transaction(env: Env, transaction_id: u64) -> Result<EscrowTransaction, EscrowError> {
        env.storage().persistent().get(&transaction_id)
            .ok_or(EscrowError::TransactionNotFound)
    }
}