// import { useState, useEffect } from 'react';
// import { fetchProperties } from '../services/propertyService';
// import { Property } from '@/types';
// import { getPropertyContract } from '@/lib/contracts/property/propertyClient';
// //import { getPropertyContract } from '../lib/contracts/property/propertyClient';

// export const usePropertyData = (propertyId: string | null = null) => {
//   const [property, setProperty] = useState<Property | null>(null);
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         if (propertyId) {
//           // Fetch single property data if propertyId is provided
//           const contract = getPropertyContract();
//           const result = await contract.getProperty(propertyId);
//           setProperty(result);
//         } else {
//           // Fetch all properties if no propertyId is provided
//           const fetchedProperties = await fetchProperties();
//           setProperties(fetchedProperties);
//         }
//         setError(null);
//       } catch (err) {
//         setError(propertyId ? 'Failed to fetch property' : 'Failed to fetch properties');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [propertyId]);

//   const refreshProperties = async () => {
//     setLoading(true);
//     try {
//       const fetchedProperties = await fetchProperties();
//       setProperties(fetchedProperties);
//       setError(null);
//     } catch (err) {
//       setError('Failed to refresh properties');
//       console.error('Error refreshing properties:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { property, properties, loading, error, refreshProperties };
// };
