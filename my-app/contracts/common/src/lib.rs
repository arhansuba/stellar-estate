#![no_std]
use soroban_sdk::{contractimpl, symbol_short, vec, BytesN, Env, Symbol, Vec};
use soroban_sdk::{
    contracttype, Env, String, Vec, Map, symbol_short, ConversionError,
};
use soroban_sdk::bigint::BigInt;

#[contracttype]
pub enum StellarRealEstateError {
    InvalidPropertyValue,
    InvalidShareAmount,
    DateParseError,
    DecimalConversionError,
}

pub type StellarResult<T> = Result<T, StellarRealEstateError>;

#[contracttype]
pub struct CelestialCoordinates {
    pub right_ascension: i128,
    pub declination: i128,
}

pub struct Utils;

#[contractimpl]
impl Utils {
    pub fn calculate_distance(env: Env, coord1: CelestialCoordinates, coord2: CelestialCoordinates) -> i128 {
        // Note: This is a simplified calculation. For accurate astronomical calculations,
        // you might need to use a more sophisticated method or an external library.
        let ra_diff = (coord2.right_ascension - coord1.right_ascension).abs();
        let dec_diff = (coord2.declination - coord1.declination).abs();
        
        // Using Pythagorean theorem for simplification
        let distance_squared = ra_diff * ra_diff + dec_diff * dec_diff;
        env.sqrt(distance_squared)
    }

    pub fn parse_date(env: Env, date_str: String) -> StellarResult<u64> {
        // In Soroban, we'll use Unix timestamp (seconds since epoch) for date representation
        // This function should parse the date string and return the timestamp
        // For simplicity, we're returning the current ledger timestamp
        Ok(env.ledger().timestamp())
    }

    pub fn calculate_current_value(env: Env, initial_value: i128, appreciation_rate: i128, years: u32) -> StellarResult<i128> {
        let rate = BigInt::from_u32(&env, 10000 + (appreciation_rate as u32)) / BigInt::from_u32(&env, 10000);
        let result = BigInt::from_i128(&env, initial_value) * rate.pow(years);
        Ok(result.to_i128())
    }

    pub fn validate_property_value(value: i128) -> StellarResult<()> {
        if value <= 0 {
            Err(StellarRealEstateError::InvalidPropertyValue)
        } else {
            Ok(())
        }
    }

    pub fn validate_shares(shares: u32) -> StellarResult<()> {
        if shares == 0 {
            Err(StellarRealEstateError::InvalidShareAmount)
        } else {
            Ok(())
        }
    }

    pub fn calculate_share_price(env: Env, property_value: i128, total_shares: u32) -> StellarResult<i128> {
        Utils::validate_property_value(property_value)?;
        Utils::validate_shares(total_shares)?;

        let share_price = BigInt::from_i128(&env, property_value) / BigInt::from_u32(&env, total_shares);
        Ok(share_price.to_i128())
    }
}

#[cfg(test)]
mod test {
    use super::*;
    use soroban_sdk::testutils::Ledger;

    #[test]
    fn test_calculate_distance() {
        let env = Env::default();
        let contract_id = env.register_contract(None, Utils);
        let client = UtilsClient::new(&env, &contract_id);

        let coord1 = CelestialCoordinates {
            right_ascension: 100,
            declination: 200,
        };
        let coord2 = CelestialCoordinates {
            right_ascension: 150,
            declination: 250,
        };
        let distance = client.calculate_distance(&coord1, &coord2);
        assert!(distance > 0);
    }

    #[test]
    fn test_calculate_current_value() {
        let env = Env::default();
        let contract_id = env.register_contract(None, Utils);
        let client = UtilsClient::new(&env, &contract_id);

        let initial_value = 1_000_000;
        let appreciation_rate = 500; // 5% as 500 basis points
        let years = 5;
        let current_value = client.calculate_current_value(&initial_value, &appreciation_rate, &years).unwrap();
        assert!(current_value > initial_value);
    }

    #[test]
    fn test_calculate_share_price() {
        let env = Env::default();
        let contract_id = env.register_contract(None, Utils);
        let client = UtilsClient::new(&env, &contract_id);

        let property_value = 1_000_000;
        let total_shares = 1000;
        let share_price = client.calculate_share_price(&property_value, &total_shares).unwrap();
        assert_eq!(share_price, 1000);
    }
}